import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

/**
 * Resend client configured via env vars.
 * Required env vars:
 *   RESEND_API_KEY  — from resend.com/api-keys
 *   EMAIL_FROM      — verified sender (e.g. "noreply@skillpar.com")
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends an email via Resend (non-throwing version).
 */
export const sendMail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<EmailResult> => {
  try {
    const { data, error } = await resend.emails.send({
      from: `AKIMANA Platform <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error(`Email sending failed to ${to}: ${error.message}`);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error(`Email sending failed to ${to}: ${error.message}`);
    return { success: false, error: error.message };
  }
};

/**
 * Sends an email and throws on failure (for critical emails like password reset).
 */
export const sendMailOrThrow = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<void> => {
  const result = await sendMail(to, subject, htmlContent);
  if (!result.success) {
    throw new Error("Email sending failed. Please try again later.");
  }
};
