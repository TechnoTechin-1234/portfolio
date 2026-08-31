import { Resend } from 'resend';

export interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  price?: string;
  budgetRange?: string;
  timeframe?: string;
  details?: string;
}

export interface ContactEnv {
  RESEND_API_KEY?: string;
  RESEND_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
}

export interface ContactResult {
  status: number;
  body: Record<string, unknown>;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeEnvValue(value?: string): string | undefined {
  const normalized = value?.trim();
  if (!normalized) return undefined;
  return normalized.replace(/^(['"])(.*)\1$/, '$2').trim();
}

export async function processContactSubmission(
  body: ContactPayload | string | null | undefined,
  env: ContactEnv
): Promise<ContactResult> {
  let payload: ContactPayload;

  try {
    payload =
      typeof body === 'string'
        ? (JSON.parse(body) as ContactPayload)
        : body ?? {};
  } catch {
    return { status: 400, body: { error: 'Invalid request data.' } };
  }

  const apiKey = normalizeEnvValue(env.RESEND_API_KEY);
  if (!apiKey) {
    return { status: 500, body: { error: 'Email service is not configured.' } };
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();
  const company = payload.company?.trim() || 'Not provided';
  const service = payload.service?.trim();
  const price = payload.price?.trim() || payload.budgetRange?.trim();
  const timeframe = payload.timeframe?.trim();
  const details = payload.details?.trim();

  if (!name || !email || !phone || !service || !timeframe || !details) {
    return { status: 400, body: { error: 'Please fill in all required fields.' } };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: 400, body: { error: 'Please enter a valid email address.' } };
  }

  const toEmail = (
    normalizeEnvValue(env.RESEND_TO_EMAIL) || 'technotechin@outlook.com'
  ).toLowerCase();
  const fromEmail =
    normalizeEnvValue(env.RESEND_FROM_EMAIL) ||
    'Techno Techin <onboarding@resend.dev>';

  const resend = new Resend(apiKey);

  const html = `
    <h2>New project inquiry — Techno Techin</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Price:</strong> ${escapeHtml(price || 'Not specified')}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(timeframe)}</p>
    <p><strong>Project details:</strong></p>
    <p>${escapeHtml(details).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New inquiry: ${service} — ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { status: 500, body: { error: error.message || 'Failed to send email.' } };
    }

    return { status: 200, body: { success: true, id: data?.id } };
  } catch (error) {
    console.error('Contact API error:', error);
    return { status: 500, body: { error: 'Failed to send email. Please try again later.' } };
  }
}
