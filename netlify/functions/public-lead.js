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
 * - Sends an email to SUPPORT_EMAIL_TO via platform SMTP
 * - Best-effort submits to Netlify Forms for dashboard visibility.
 * - Redirects user to `/thank-you.html` on success.
 *
 * Required Netlify env vars (set in the *marketing site* on Netlify):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (for database storage)
 * - SUPPORT_EMAIL_TO (required - for email notifications)
 * - PLATFORM_SMTP_HOST / PLATFORM_SMTP_PORT / PLATFORM_SMTP_USER / PLATFORM_SMTP_PASS
 */

const { sendPlatformEmail } = require('./_platform-smtp');

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

const DEMO_FIT_FIELDS = [
  ['lead_route', 'Lead classification'],
  ['lead_source', 'Lead source'],
  ['plan_interest', 'Plan interest'],
  ['company', 'Business name'],
  ['business_type', 'Business type'],
  ['business_description', 'Business operation'],
  ['team_size', 'Team size'],
  ['current_tools', 'Currently using'],
  ['pain_points', 'Main pain points and current struggles'],
  ['desired_outcomes', 'Desired efficiency and time improvements'],
  ['monthly_software_spend', 'Current monthly software spend (optional)'],
  ['feature_interest', 'FlowIQ module interests'],
  ['timeline', 'Timeline'],
  ['buying_role', 'Decision involvement'],
  ['role_title', 'Role or job title'],
  ['onboarding_readiness', 'Onboarding readiness'],
  ['contact_consent', 'Contact consent'],
];

function cleanField(value, maxLength = 4000) {
  return (value || '').toString().trim().slice(0, maxLength);
}

function isDemoFitSubmission(body) {
  return cleanField(body.qualification_version, 80) === 'demo_fit_v1';
}

function classifyDemoFitLead(answers) {
  const requiredForClassification = [
    'company',
    'business_type',
    'business_description',
    'team_size',
    'current_tools',
    'pain_points',
    'desired_outcomes',
    'feature_interest',
    'timeline',
    'buying_role',
    'role_title',
    'onboarding_readiness',
    'first_name',
    'last_name',
    'email',
    'phone',
    'country',
  ];

  if (requiredForClassification.some((field) => !answers[field]) || answers.contact_consent !== 'yes') {
    return 'nurture_or_incomplete';
  }

  const modules = answers.feature_interest.split(',').map((value) => value.trim()).filter(Boolean);
  const teamScore = ['11-25', '26-50', '51-100', '101+'].includes(answers.team_size) ? 2 : 0;
  const timelineScore = ['Within 30 days', '1-3 months'].includes(answers.timeline) ? 2 : 0;
  const roleScore = answers.buying_role === 'Decision maker' ? 2 : answers.buying_role === 'Part of the decision team' ? 1 : 0;
  const readinessScore = answers.onboarding_readiness === 'Ready to assign an owner and prepare our data'
    ? 2
    : answers.onboarding_readiness === 'Interested, but we need to plan resources first'
      ? 1
      : 0;
  const breadthScore = modules.length >= 2 && !modules.includes('Not sure yet') ? 1 : 0;
  const qualificationScore = teamScore + timelineScore + roleScore + readinessScore + breadthScore;

  if (qualificationScore >= 6) return 'qualified_demo';
  if (
    ['1-5', '6-10'].includes(answers.team_size) &&
    (answers.timeline === 'Exploring for later' || answers.onboarding_readiness === 'Prefer to start with self-guided resources')
  ) {
    return 'self_serve';
  }
  return 'nurture_or_incomplete';
}

function leadRouteLabel(route) {
  if (route === 'qualified_demo') return 'Qualified demo';
  if (route === 'self_serve') return 'Self-serve';
  return 'Nurture / incomplete';
}

function buildDemoFitSummary(answers) {
  return DEMO_FIT_FIELDS.map(([field, label]) => {
    const value = field === 'lead_route' ? leadRouteLabel(answers.lead_route) : answers[field];
    return `${label}: ${value || '(not provided)'}`;
  }).join('\n');
}

function buildEmailText({ request_type, name, email, phone, country, feature_interest, company, message, first_name, last_name }) {
  const lines = [];
  lines.push(`Type: ${request_type || 'contact'}`);
  if (name) lines.push(`Name: ${name}`);
  if (first_name || last_name) lines.push(`Name: ${(first_name || '').trim()} ${(last_name || '').trim()}`.trim());
  if (email) lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (country) lines.push(`Country: ${country}`);
  if (feature_interest) lines.push(`Feature interest: ${feature_interest}`);
  if (company) lines.push(`Company: ${company}`);
  lines.push('');
  lines.push('Message:');
  lines.push(message || '(no message provided)');
  lines.push('');
  lines.push('---');
  lines.push('Sent from FlowIQ marketing website');
  return lines.join('\n');
}

async function storeInDatabase({ supabaseUrl, serviceRoleKey, request_type, email, first_name, last_name, name, phone, country, feature_interest, company, message }) {
  try {
    const attemptInsert = async (payload) => {
      const response = await fetch(`${supabaseUrl}/rest/v1/demo_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) return { ok: true };

      const errorText = await response.text().catch(() => '');
      return { ok: false, status: response.status, errorText };
    };

    // Use Supabase REST API directly (no imports needed)
    const payloadWithExtras = {
      request_type,
      email,
      first_name: first_name || null,
      last_name: last_name || null,
      name: name || null,
      phone: phone || null,
      country: country || null,
      feature_interest: feature_interest || null,
      company: company || null,
      message: message || null,
    };

    let result = await attemptInsert(payloadWithExtras);
    if (!result.ok) {
      // If table doesn't exist yet, that's okay - migration will create it
      if (result.status === 404 || (result.errorText || '').includes('does not exist')) {
        console.log('demo_requests table not created yet - run migration first');
        return false;
      }

      // Backwards compatible: if the DB schema doesn't have `country` yet, retry without it.
      const errorText = result.errorText || '';
      const isMissingColumn = (col) =>
        errorText.includes(col) &&
        (errorText.includes('column') || errorText.includes('field') || errorText.includes('Could not find')) &&
        (errorText.includes('does not exist') || errorText.includes('not found') || errorText.includes('schema cache'));

      if (isMissingColumn('feature_interest')) {
        const { feature_interest: _omit, ...payloadWithout } = payloadWithExtras;
        result = await attemptInsert(payloadWithout);
        if (result.ok) return true;
      }
      if (isMissingColumn('country')) {
        const { country: _omit, ...payloadWithout } = payloadWithExtras;
        result = await attemptInsert(payloadWithout);
        if (result.ok) return true;
      }

      console.error('Failed to store demo request in database:', result.status, errorText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error storing demo request in database:', err);
    return false;
  }
}

async function sendEmail({ to, replyTo, subject, requestType, firstName, lastName, name, email, phone, country, featureInterest, company, message }) {
  try {
    const text = buildEmailText({ request_type: requestType, name, email, phone, country, feature_interest: featureInterest, company, message, first_name: firstName, last_name: lastName });
    await sendPlatformEmail({
      to,
      replyTo: replyTo || email,
      subject,
      text,
    });
    return { ok: true, method: 'platform-smtp' };
  } catch (error) {
    return { ok: false, error: error && error.message ? error.message : String(error || 'Platform SMTP failed') };
  }
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

    const request_type = cleanField(body.request_type || body['request-type'] || body['form-name'] || 'demo', 80);
    const name = cleanField(body.name, 200);
    const email = cleanField(body.email, 254);
    const phone = cleanField(body.phone, 80);
    const country = cleanField(body.country, 120);
    const feature_interest = cleanField(body.feature_interest, 1200);
    const company = cleanField(body.company, 200);
    const message = cleanField(body.message, 5000);
    const first_name = cleanField(body.first_name, 100);
    const last_name = cleanField(body.last_name, 100);
    const demoFit = isDemoFitSubmission(body);
    const demoFitAnswers = {
      qualification_version: cleanField(body.qualification_version, 80),
      lead_source: cleanField(body.lead_source, 120) || 'website_demo_cta',
      plan_interest: cleanField(body.plan_interest, 120),
      company,
      business_type: cleanField(body.business_type, 240),
      business_description: cleanField(body.business_description, 1600),
      team_size: cleanField(body.team_size, 80),
      current_tools: cleanField(body.current_tools, 1400),
      pain_points: cleanField(body.pain_points, 1800),
      desired_outcomes: cleanField(body.desired_outcomes, 1800),
      monthly_software_spend: cleanField(body.monthly_software_spend, 160),
      feature_interest,
      timeline: cleanField(body.timeline, 100),
      buying_role: cleanField(body.buying_role, 120),
      role_title: cleanField(body.role_title, 160),
      onboarding_readiness: cleanField(body.onboarding_readiness, 180),
      contact_consent: cleanField(body.contact_consent, 20).toLowerCase(),
      first_name,
      last_name,
      email,
      phone,
      country,
    };

    if (demoFit) demoFitAnswers.lead_route = classifyDemoFitLead(demoFitAnswers);
    const lead_route = demoFit ? demoFitAnswers.lead_route : '';
    const messageForStorage = demoFit
      ? [message, 'FlowIQ demo-fit questionnaire', buildDemoFitSummary(demoFitAnswers)].filter(Boolean).join('\n\n')
      : message;

    if (!email) return { statusCode: 400, headers, body: 'Missing required field: email' };
    if (request_type === 'demo' && (!first_name || !last_name)) {
      return { statusCode: 400, headers, body: 'Missing required fields: first_name, last_name' };
    }
    if (request_type === 'demo' && !feature_interest) {
      return { statusCode: 400, headers, body: 'Missing required field: feature_interest' };
    }
    if (demoFit) {
      const requiredDemoFitFields = [
        ['company', company],
        ['business_type', demoFitAnswers.business_type],
        ['business_description', demoFitAnswers.business_description],
        ['team_size', demoFitAnswers.team_size],
        ['current_tools', demoFitAnswers.current_tools],
        ['pain_points', demoFitAnswers.pain_points],
        ['desired_outcomes', demoFitAnswers.desired_outcomes],
        ['timeline', demoFitAnswers.timeline],
        ['buying_role', demoFitAnswers.buying_role],
        ['role_title', demoFitAnswers.role_title],
        ['onboarding_readiness', demoFitAnswers.onboarding_readiness],
        ['phone', phone],
        ['country', country],
      ];
      const missingFields = requiredDemoFitFields.filter(([, value]) => !value).map(([field]) => field);
      if (missingFields.length > 0) {
        return { statusCode: 400, headers, body: `Missing required fields: ${missingFields.join(', ')}` };
      }
      if (demoFitAnswers.contact_consent !== 'yes') {
        return { statusCode: 400, headers, body: 'Missing required field: contact_consent' };
      }
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
        country,
        feature_interest,
        company,
        message: messageForStorage,
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
                country,
                feature_interest,
                company,
                message: messageForStorage,
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

    if (to && process.env.PLATFORM_SMTP_HOST && process.env.PLATFORM_SMTP_USER && process.env.PLATFORM_SMTP_PASS) {
      const baseSubject =
        request_type === 'deck'
          ? 'FlowIQ – Deck request'
          : request_type === 'contact'
            ? 'FlowIQ – Contact request'
            : 'FlowIQ – Demo request';
      const subject = demoFit ? `${baseSubject} [${leadRouteLabel(lead_route)}]` : baseSubject;

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
        country,
        featureInterest: feature_interest,
        company,
        message: messageForStorage,
      });

      if (!emailResult.ok) {
        // Log error but don't fail - Supabase function will send email via database trigger
        console.warn('Netlify email send failed (Supabase function will handle it):', emailResult.error || 'Platform SMTP error');
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
          country,
          feature_interest,
          company,
          message: messageForStorage,
          request_type,
          qualification_version: demoFitAnswers.qualification_version,
          lead_route,
          lead_source: demoFitAnswers.lead_source,
          plan_interest: demoFitAnswers.plan_interest,
          business_type: demoFitAnswers.business_type,
          business_description: demoFitAnswers.business_description,
          team_size: demoFitAnswers.team_size,
          current_tools: demoFitAnswers.current_tools,
          pain_points: demoFitAnswers.pain_points,
          desired_outcomes: demoFitAnswers.desired_outcomes,
          monthly_software_spend: demoFitAnswers.monthly_software_spend,
          timeline: demoFitAnswers.timeline,
          buying_role: demoFitAnswers.buying_role,
          role_title: demoFitAnswers.role_title,
          onboarding_readiness: demoFitAnswers.onboarding_readiness,
          contact_consent: demoFitAnswers.contact_consent,
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
