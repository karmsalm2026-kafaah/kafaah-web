import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail SMTP (Google Workspace)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,       // e.g. info@kafaahsolutions.com
    pass: process.env.SMTP_APP_PASSWORD, // Google App Password (16-char)
  },
});

interface SendEmailOptions {
  to: string | string[];
  cc?: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  const fromName = process.env.SMTP_FROM_NAME || 'Kafaah Industrial Solutions';
  const fromEmail = process.env.SMTP_USER || 'info@kafaahsolutions.com';

  try {
    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      cc: options.cc ? (Array.isArray(options.cc) ? options.cc.join(', ') : options.cc) : undefined,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[EMAIL] Failed to send:', message);
    return { success: false, error: message };
  }
}
