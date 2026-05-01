const net = require('node:net');
const tls = require('node:tls');

function getPlatformSmtpConfig() {
  const host = (process.env.PLATFORM_SMTP_HOST || process.env.SMTP_HOST || '').toString().trim();
  const port = Number(process.env.PLATFORM_SMTP_PORT || process.env.SMTP_PORT || 0);
  const user = (process.env.PLATFORM_SMTP_USER || process.env.SMTP_USER || '').toString().trim();
  const pass = (process.env.PLATFORM_SMTP_PASS || process.env.SMTP_PASS || '').toString();
  const secureRaw = (process.env.PLATFORM_SMTP_SECURE || '').toString().trim().toLowerCase();
  const secure = secureRaw ? secureRaw === 'true' : port === 465;
  const fromEmail = (
    process.env.PLATFORM_EMAIL_FROM ||
    process.env.SUPPORT_EMAIL_FROM ||
    process.env.OUTBOUND_FROM ||
    'support@flowiq.info'
  ).toString().trim();
  const fromName = (process.env.PLATFORM_EMAIL_FROM_NAME || 'FlowIQ').toString().trim();

  if (!host || !port || !user || !pass || !fromEmail) {
    throw new Error('Missing platform SMTP env vars');
  }

  return { host, port, user, pass, secure, fromEmail, fromName };
}

function encodeBase64(value) {
  return Buffer.from(String(value), 'utf8').toString('base64');
}

function escapeHeader(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

function createClient(config) {
  const socket = config.secure
    ? tls.connect({ host: config.host, port: config.port, servername: config.host })
    : net.connect({ host: config.host, port: config.port });
  socket.setEncoding('utf8');
  socket.setTimeout(12000);

  let buffer = '';
  const readReply = () => new Promise((resolve, reject) => {
    const cleanup = () => {
      socket.off('data', onData);
      socket.off('error', onError);
      socket.off('timeout', onTimeout);
    };
    const onError = (error) => {
      cleanup();
      reject(error);
    };
    const onTimeout = () => {
      cleanup();
      reject(new Error('SMTP timeout'));
    };
    const onData = (chunk) => {
      buffer += chunk;
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1] || '';
      if (/^\d{3} /.test(last)) {
        const reply = buffer;
        buffer = '';
        cleanup();
        resolve(reply);
      }
    };
    socket.on('data', onData);
    socket.on('error', onError);
    socket.on('timeout', onTimeout);
  });

  const writeLine = (line) => new Promise((resolve, reject) => {
    socket.write(`${line}\r\n`, (error) => (error ? reject(error) : resolve()));
  });

  return { socket, readReply, writeLine };
}

async function sendPlatformEmail({ to, replyTo, subject, text, html }) {
  const config = getPlatformSmtpConfig();
  const toList = Array.isArray(to)
    ? to.map((entry) => String(entry || '').trim()).filter(Boolean)
    : String(to || '').split(/[;,]+/).map((entry) => entry.trim()).filter(Boolean);
  if (!toList.length) throw new Error('Missing recipient email');

  const client = createClient(config);
  const { socket, readReply, writeLine } = client;
  const bodyText = String(text || '').trim() || String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  try {
    await readReply();
    await writeLine('EHLO flowiq.info');
    await readReply();
    await writeLine('AUTH LOGIN');
    await readReply();
    await writeLine(encodeBase64(config.user));
    await readReply();
    await writeLine(encodeBase64(config.pass));
    const authReply = String(await readReply());
    if (!authReply.startsWith('235')) {
      throw new Error(`SMTP auth failed: ${authReply.replace(/\s+/g, ' ').trim()}`);
    }
    await writeLine(`MAIL FROM:<${config.fromEmail}>`);
    await readReply();
    for (const recipient of toList) {
      await writeLine(`RCPT TO:<${recipient}>`);
      await readReply();
    }
    await writeLine('DATA');
    await readReply();

    let msg = `From: ${escapeHeader(config.fromName)} <${config.fromEmail}>\r\n`;
    msg += `To: ${toList.join(', ')}\r\n`;
    if (replyTo) msg += `Reply-To: ${escapeHeader(replyTo)}\r\n`;
    msg += `Subject: ${escapeHeader(subject)}\r\n`;
    msg += 'MIME-Version: 1.0\r\n';
    msg += 'Content-Type: text/plain; charset=UTF-8\r\n\r\n';
    msg += `${bodyText}\r\n.\r\n`;
    await new Promise((resolve, reject) => socket.write(msg, (error) => (error ? reject(error) : resolve())));
    const dataReply = String(await readReply());
    if (!dataReply.startsWith('250')) {
      throw new Error(`SMTP DATA failed: ${dataReply.replace(/\s+/g, ' ').trim()}`);
    }
    await writeLine('QUIT').catch(() => {});
  } finally {
    socket.end();
  }
}

module.exports = { sendPlatformEmail };
