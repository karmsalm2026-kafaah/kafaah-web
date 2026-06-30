import { sendEmail } from './email';

interface LeadData {
  name: string;
  phoneOrEmail: string;
  inquiry: string;
}

export async function sendLeadEmail(lead: LeadData): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Cairo' });

  const result = await sendEmail({
    to: ['business@kafaahsolutions.com'],
    cc: ['moustafa@kafaahsolutions.com', 'info@kafaahsolutions.com'],
    subject: `🔔 New Lead from Kafaah Chatbot — ${lead.name}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1a; border: 1px solid #1a2540; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #b8960c 0%, #d4a913 100%); padding: 24px 32px;">
          <h1 style="color: #0a0f1a; margin: 0; font-size: 22px; font-weight: 700;">🏭 Kafaah — New Lead Captured</h1>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 16px; color: #b8960c; font-weight: 600; font-size: 14px; border-bottom: 1px solid #1a2540; width: 140px;">Name</td>
              <td style="padding: 12px 16px; color: #e8e4dc; font-size: 15px; border-bottom: 1px solid #1a2540;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #b8960c; font-weight: 600; font-size: 14px; border-bottom: 1px solid #1a2540;">Contact</td>
              <td style="padding: 12px 16px; color: #e8e4dc; font-size: 15px; border-bottom: 1px solid #1a2540;">${lead.phoneOrEmail}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #b8960c; font-weight: 600; font-size: 14px; border-bottom: 1px solid #1a2540;">Inquiry</td>
              <td style="padding: 12px 16px; color: #e8e4dc; font-size: 15px; border-bottom: 1px solid #1a2540;">${lead.inquiry}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #b8960c; font-weight: 600; font-size: 14px;">Captured At</td>
              <td style="padding: 12px 16px; color: #e8e4dc; font-size: 15px;">${now} (Cairo)</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #111827; border-radius: 6px; border-left: 3px solid #b8960c;">
            <p style="color: #9ca3af; font-size: 13px; margin: 0;">This lead was automatically captured by the Kafaah website chatbot. Please follow up promptly.</p>
          </div>
        </div>
      </div>
    `,
  });

  if (result.success) {
    console.log(`[LEAD EMAIL] Successfully sent lead notification for: ${lead.name}`);
  } else {
    console.warn(`[LEAD EMAIL] Failed to send: ${result.error}`);
  }

  return result;
}
