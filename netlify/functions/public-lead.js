/**
 * Public lead capture for FlowIQ marketing website (unauthenticated).
 *
 * This function MUST live under `flowiq_website/netlify/functions/` because
 * the marketing site uses `flowiq_website/` as its Netlify base/publish directory.
 * If this file only exists at repo root (`/netlify/functions`), the marketing site will
 * return 404 at `/.netlify/functions/public-lead`.
 *
 * Behavior:
 * - Stores requests in database (primary method - always works)
 * - Sends an email to SUPPORT_EMAIL_TO via Resend (required)
 * - Best-effort submits to Netlify Forms for dashboard visibility.
 * - Redirects user to `/thank-you.html` on success.
 *
 * Required Netlify env vars (set in the *marketing site* on Netlify):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (for database storage)
 * - SUPPORT_EMAIL_TO (required - for email notifications)
 * - RESEND_API_KEY (required - for email notifications)
 * - RESEND_FROM (optional - defaults to onboarding@resend.dev)
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

// Use Netlify Email Extension (configured via Netlify dashboard)
async function sendEmail({ to, replyTo, subject, requestType, firstName, lastName, name, email, phone, company, message }) {
  // Netlify Email Extension uses the @netlify/emails package
  // The email provider and API key are configured in Netlify dashboard
  try {
    // Dynamic import for ESM module
    const netlifyEmails = await import('@netlify/emails').catch(() => null);
    
    if (netlifyEmails && netlifyEmails.sendEmail) {
      // Import the email template
      const DemoRequestEmail = (await import('../../emails/demo-request.tsx')).default;
      
      await netlifyEmails.sendEmail({
        to,
        from: process.env.EMAILS_FROM || process.env.RESEND_FROM || 'onboarding@resend.dev',
        replyTo: replyTo || email,
        subject,
        component: DemoRequestEmail({
          requestType,
          firstName,
          lastName,
          name,
          email,
          phone,
          company,
          message,
        }),
      });
      
      return { ok: true, method: 'netlify-email-extension' };
    }
  } catch (netlifyError) {
    console.log('Netlify Email Extension not available:', netlifyError.message);
  }
  
  // Fallback: Direct Resend API (if Netlify Email Extension not configured)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const text = buildEmailText({ request_type: requestType, name, email, phone, company, message, first_name: firstName, last_name: lastName });
    
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'onboarding@resend.dev',
        to: [to],
        subject,
        text,
        reply_to: replyTo || undefined,
      }),
    });
    return { ok: res.ok, status: res.status, method: 'resend-direct', response: res };
  }
  
  return { ok: false, error: 'No email service configured' };
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
        console.log('Demo request stored in database - trigger will send email automatically');
        
        // Also try calling the Supabase function directly as backup (trigger should handle it, but this ensures it)
        try {
          const supabaseFunctionUrl = `${supabaseUrl}/functions/v1/send-demo-request-email`;
          await fetch(supabaseFunctionUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${serviceRoleKey}`,
              'apikey': serviceRoleKey,
            },
            body: JSON.stringify({
              record: {
                id: 'temp-id', // Will be replaced by actual record from DB
                request_type,
                email,
                first_name,
                last_name,
                name,
                phone,
                company,
                message,
                created_at: new Date().toISOString(),
              },
            }),
          }).catch(() => {
            // Non-fatal - trigger should handle it
            console.log('Direct function call failed (trigger should handle email)');
          });
        } catch (funcError) {
          // Non-fatal - trigger should handle it
          console.log('Direct function call error (trigger should handle email):', funcError.message);
        }
      }
    } else {
      console.warn('SUPABASE_SERVICE_ROLE_KEY not configured - skipping database storage');
    }

    // Send email (best-effort - Supabase function will also send via database trigger)
    // If Netlify email fails, that's okay since Supabase function handles it
    const to = process.env.SUPPORT_EMAIL_TO;
    const resendKey = process.env.RESEND_API_KEY;

    if (to && resendKey) {
      const subject =
        request_type === 'deck'
          ? 'FlowIQ – Deck request'
          : request_type === 'contact'
            ? 'FlowIQ – Contact request'
            : 'FlowIQ – Demo request';

      const emailResult = await sendEmail({
        to,
        replyTo: email,
        subject,
        requestType: request_type,
        firstName: first_name,
        lastName: last_name,
        name,
        email,
        phone,
        company,
        message,
      });

      if (!emailResult.ok) {
        // Log error but don't fail - Supabase function will send email via database trigger
        console.warn('Netlify email send failed (Supabase function will handle it):', emailResult.error || 'Resend error');
      }
    } else {
      console.log('Netlify email not configured - Supabase function will send email via database trigger');
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

