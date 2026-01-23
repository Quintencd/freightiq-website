/**
 * Public lead capture for FlowIQ marketing website (unauthenticated).
 *
 * This function MUST live under `freightiq-website/netlify/functions/` because
 * the marketing site uses `freightiq-website/` as its Netlify base/publish directory.
 * If this file only exists at repo root (`/netlify/functions`), the marketing site will
 * return 404 at `/.netlify/functions/public-lead`.
 *
 * Behavior:
 * - Stores requests in database (primary method - always works)
 * - Sends an email to SUPPORT_EMAIL_TO via Resend (optional - fails gracefully)
 * - Best-effort submits to Netlify Forms for dashboard visibility.
 * - Redirects user to `/thank-you.html` on success.
 *
 * Required Netlify env vars (set in the *marketing site* on Netlify):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (for database storage)
 * - SUPPORT_EMAIL_TO (optional - for email notifications)
 * - RESEND_API_KEY (optional - for email notifications)
 * - RESEND_FROM (optional - for email notifications)
 */

function isAllowedRequest({ origin = '', referer = '', host = '' }) {
  // Primary allowlist (production + netlify deploy URLs)
  const allowedHost =
    host === 'www.flowiq.info' ||
    host === 'flowiq.info' ||
    host.endsWith('.netlify.app') ||
    host.startsWith('deploy-preview-');

  const allowedRef =
    origin.includes('://www.flowiq.info') ||
    origin.includes('://flowiq.info') ||
    origin.includes('://flowiq-website.netlify.app') ||
    origin.includes('://deploy-preview-') ||
    origin.includes('://localhost') ||
    referer.includes('://www.flowiq.info') ||
    referer.includes('://flowiq.info') ||
    referer.includes('://flowiq-website.netlify.app') ||
    referer.includes('://deploy-preview-') ||
    referer.includes('://localhost');

  // Some browsers/extensions strip referer/origin; host check keeps this robust.
  return allowedHost || allowedRef;
}

function parseFormBody(event) {
  const contentType = (event.headers['content-type'] || event.headers['Content-Type'] || '').toLowerCase();

  if (contentType.includes('application/json')) {
    return JSON.parse(event.body || '{}');
  }

  // Default for HTML forms: urlencoded
  const params = new URLSearchParams(event.body || '');
  return Object.fromEntries(params.entries());
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function buildEmailText({ request_type, name, email, phone, company, message, first_name, last_name }) {
  const lines = [];
  lines.push(`Type: ${request_type || 'contact'}`);
  if (name) lines.push(`Name: ${name}`);
  if (first_name || last_name) lines.push(`Name: ${(first_name || '').trim()} ${(last_name || '').trim()}`.trim());
  if (email) lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (company) lines.push(`Company: ${company}`);
  lines.push('');
  lines.push('Message:');
  lines.push(message || '(no message provided)');
  lines.push('');
  lines.push('---');
  lines.push('Sent from FlowIQ marketing website');
  return lines.join('\n');
}

async function storeInDatabase({ supabaseUrl, serviceRoleKey, request_type, email, first_name, last_name, name, phone, company, message }) {
  try {
    // Use Supabase REST API directly (no imports needed)
    const response = await fetch(`${supabaseUrl}/rest/v1/demo_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        request_type,
        email,
        first_name: first_name || null,
        last_name: last_name || null,
        name: name || null,
        phone: phone || null,
        company: company || null,
        message: message || null,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      // If table doesn't exist yet, that's okay - migration will create it
      if (response.status === 404 || errorText.includes('does not exist')) {
        console.log('demo_requests table not created yet - run migration first');
        return false;
      }
      console.error('Failed to store demo request in database:', response.status, errorText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error storing demo request in database:', err);
    return false;
  }
}

async function sendViaResend({ apiKey, to, from, replyTo, subject, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: replyTo || undefined,
    }),
  });
  return res;
}

async function submitToNetlifyForms({ netlifySiteUrl, formName, fields }) {
  // Best-effort storage in Netlify Forms. Non-fatal if it fails.
  const formData = new URLSearchParams();
  formData.append('form-name', formName);
  Object.keys(fields).forEach(key => {
    if (fields[key] != null && fields[key] !== '') {
      formData.append(key, fields[key]);
    }
  });
  const res = await fetch(`${netlifySiteUrl}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  });
  return res.ok;
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'text/plain; charset=utf-8',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const origin = event.headers.origin || event.headers.Origin || '';
    const referer = event.headers.referer || event.headers.Referer || '';
    const host = event.headers.host || event.headers.Host || '';

    if (!isAllowedRequest({ origin, referer, host })) {
      return { statusCode: 403, headers, body: 'Forbidden' };
    }

    const body = parseFormBody(event);

    // Honeypot (spam): if filled, pretend success but do nothing.
    if (body['bot-field']) {
      return {
        statusCode: 303,
        headers: { ...headers, Location: '/thank-you.html' },
        body: '',
      };
    }

    const request_type = (body.request_type || body['request-type'] || body['form-name'] || 'demo').toString().trim();
    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const company = (body.company || '').toString().trim();
    const message = (body.message || '').toString().trim();
    const first_name = (body.first_name || '').toString().trim();
    const last_name = (body.last_name || '').toString().trim();

    if (!email) return { statusCode: 400, headers, body: 'Missing required field: email' };
    if (request_type === 'demo' && (!first_name || !last_name)) {
      return { statusCode: 400, headers, body: 'Missing required fields: first_name, last_name' };
    }
    if (request_type === 'contact' && (!name || !message)) {
      return { statusCode: 400, headers, body: 'Missing required fields: name, message' };
    }
    if (request_type === 'deck' && !name) {
      return { statusCode: 400, headers, body: 'Missing required field: name' };
    }

    // Store in database first (primary method - always works)
    const supabaseUrl = process.env.SUPABASE_URL || 'https://yvbhjlmvpipniedwvdji.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    let storedInDb = false;
    if (serviceRoleKey) {
      storedInDb = await storeInDatabase({
        supabaseUrl,
        serviceRoleKey,
        request_type,
        email,
        first_name,
        last_name,
        name,
        phone,
        company,
        message,
      });
      if (storedInDb) {
        console.log('Demo request stored in database');
      }
    } else {
      console.warn('SUPABASE_SERVICE_ROLE_KEY not configured - skipping database storage');
    }

    // Try to send email (optional - don't fail if it doesn't work)
    const to = process.env.SUPPORT_EMAIL_TO;
    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || 'onboarding@resend.dev';

    console.log('Email config check:', { 
      hasResendKey: !!resendKey, 
      hasTo: !!to, 
      from: from,
      to: to 
    });

    if (resendKey && to) {
      try {
        const subject =
          request_type === 'deck'
            ? 'FlowIQ – Deck request'
            : request_type === 'contact'
              ? 'FlowIQ – Contact request'
              : 'FlowIQ – Demo request';

        const text = buildEmailText({ request_type, name, email, phone, company, message, first_name, last_name });

        const resendRes = await sendViaResend({
          apiKey: resendKey,
          to,
          from,
          replyTo: email,
          subject,
          text,
        });

        if (resendRes.ok) {
          console.log('Demo request email sent successfully');
        } else {
          let errorData = {};
          try {
            errorData = await resendRes.json();
          } catch {
            try {
              const errorText = await resendRes.text();
              errorData = { message: errorText };
            } catch {
              errorData = { message: '' };
            }
          }
          // Don't fail if domain not verified - request is already in database
          if (resendRes.status === 403 && errorData.message && errorData.message.includes('domain is not verified')) {
            console.log('Email sending skipped - Resend domain not verified (request stored in database)');
            console.log('Full error:', JSON.stringify(errorData));
          } else {
            console.warn('Email sending failed (request stored in database):', resendRes.status, errorData.message || errorData);
            console.warn('Full error response:', JSON.stringify(errorData));
          }
        }
      } catch (emailError) {
        // Don't fail the request if email fails - it's already in database
        console.log('Email sending error (request stored in database):', emailError.message || emailError);
      }
    } else {
      console.log('Email not configured - request stored in database only');
      console.log('Missing:', { 
        resendKey: !resendKey ? 'RESEND_API_KEY' : null,
        to: !to ? 'SUPPORT_EMAIL_TO' : null
      });
    }

    // If database storage failed and email is not configured, return error
    if (!storedInDb && (!resendKey || !to)) {
      return { statusCode: 500, headers, body: 'Failed to store request and email not configured' };
    }

    // Store in Netlify Forms too (best-effort)
    const netlifySiteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://www.flowiq.info';
    const formName = request_type === 'deck' ? 'deck' : request_type === 'contact' ? 'contact' : 'demo';
    try {
      await submitToNetlifyForms({
        netlifySiteUrl,
        formName,
        fields: {
          name: name || `${first_name} ${last_name}`.trim(),
          email,
          phone,
          company,
          message,
          request_type,
        },
      });
    } catch {
      // non-fatal
    }

    return {
      statusCode: 303,
      headers: { ...headers, Location: '/thank-you.html' },
      body: '',
    };
  } catch (err) {
    return { statusCode: 500, headers, body: (err && err.message) || 'Unknown error' };
  }
};

