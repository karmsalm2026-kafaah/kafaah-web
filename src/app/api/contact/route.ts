import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().default("N/A (Quick Form)"),
  company: z.string().min(2),
  service: z.string().min(1),
  message: z.string().min(2),
});

// Map each service to the most relevant email recipient(s)
const SERVICE_EMAIL_MAP: Record<string, string[]> = {
  'owners-engineer':   ['projects@kafaahsolutions.com', 'moustafa@kafaahsolutions.com'],
  'commissioning':     ['projects@kafaahsolutions.com'],
  'readiness':         ['projects@kafaahsolutions.com'],
  'troubleshooting':   ['projects@kafaahsolutions.com'],
  'optimization':      ['projects@kafaahsolutions.com'],
  'training':          ['projects@kafaahsolutions.com'],
  'advisory':          ['business@kafaahsolutions.com', 'moustafa@kafaahsolutions.com'],
};

const DEFAULT_RECIPIENTS = ['info@kafaahsolutions.com', 'business@kafaahsolutions.com'];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const now = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Cairo' });

    // Determine recipients based on the selected service
    const recipients = SERVICE_EMAIL_MAP[data.service] || DEFAULT_RECIPIENTS;
    // Always CC info@ for record-keeping (if not already a primary recipient)
    const ccList = recipients.includes('info@kafaahsolutions.com') ? [] : ['info@kafaahsolutions.com'];

    const serviceLabel = data.service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const result = await sendEmail({
      to: recipients,
      cc: ccList.length > 0 ? ccList : undefined,
      replyTo: data.email,
      subject: `📩 New Inquiry — ${data.name} | ${serviceLabel}`,
      html: `
        <div style="margin: 0 auto; max-width: 520px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #DEE5EE; padding: 12px 10px;">
          <div style="background-color: #1E3045; border: 1px solid rgba(240, 160, 32, 0.2); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
            <!-- Decorative brand gold line -->
            <div style="height: 3px; background: linear-gradient(90deg, #F0A020 0%, #FFB838 100%);"></div>
            
            <!-- Branding Header -->
            <div style="padding: 18px 24px; border-bottom: 1px solid rgba(168, 184, 202, 0.08); background-color: #152232;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <img src="https://kafaahsolutions.com/logo1.webp" alt="Kafaah" style="height: 26px; width: auto; display: block; border: 0;" />
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <span style="font-size: 9px; color: #FFB838; background-color: rgba(240, 160, 32, 0.08); border: 1px solid rgba(240, 160, 32, 0.2); padding: 3px 8px; border-radius: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Content Body -->
            <div style="padding: 24px;">
              <h2 style="font-size: 16px; font-weight: 700; color: #F8FAFC; margin: 0 0 16px 0; letter-spacing: -0.1px;">Contact Form Submission</h2>
              
              <!-- Compressed Info Table -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
                <tr style="border-bottom: 1px solid rgba(168, 184, 202, 0.06);">
                  <td style="padding: 10px 0; color: #A8B8CA; font-weight: 500; width: 110px;">Client Name</td>
                  <td style="padding: 10px 0; color: #F8FAFC; font-weight: 600;">${data.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(168, 184, 202, 0.06);">
                  <td style="padding: 10px 0; color: #A8B8CA; font-weight: 500;">Company</td>
                  <td style="padding: 10px 0; color: #F8FAFC; font-weight: 600;">${data.company}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(168, 184, 202, 0.06);">
                  <td style="padding: 10px 0; color: #A8B8CA; font-weight: 500;">Email Address</td>
                  <td style="padding: 10px 0; color: #F8FAFC; font-weight: 600; word-break: break-all;">
                    <a href="mailto:${data.email}" style="color: #F0A020; text-decoration: none; border-bottom: 1px dashed rgba(240, 160, 32, 0.4); padding-bottom: 1px;">${data.email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(168, 184, 202, 0.06);">
                  <td style="padding: 10px 0; color: #A8B8CA; font-weight: 500;">Service Requested</td>
                  <td style="padding: 10px 0; color: #F8FAFC; font-weight: 600;">${serviceLabel}</td>
                </tr>
              </table>

              <!-- Message section -->
              <div>
                <div style="font-size: 10.5px; font-weight: 700; color: #A8B8CA; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">Message Details</div>
                <div style="background-color: #152232; border-left: 2px solid #F0A020; padding: 14px 16px; border-radius: 0 4px 4px 0; font-size: 13.5px; line-height: 1.6; color: #DEE5EE; white-space: pre-wrap; font-style: italic;">&ldquo;${data.message}&rdquo;</div>
              </div>
            </div>

            <!-- Footer info -->
            <div style="padding: 14px 24px; background-color: #152232; border-top: 1px solid rgba(168, 184, 202, 0.06); text-align: center;">
              <p style="font-size: 11px; color: #A8B8CA; margin: 0; line-height: 1.5; font-weight: 500;">
                Submitted on ${now} (Cairo Time) • Kafaah Website Contact Form
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (!result.success) {
      console.error('[CONTACT FORM] Email error:', result.error);
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    console.log(`[CONTACT FORM] Inquiry sent for: ${data.name} (${data.email}) → ${recipients.join(', ')}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid form data', details: err.issues }, { status: 400 });
    }
    console.error('[CONTACT FORM] Exception:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
