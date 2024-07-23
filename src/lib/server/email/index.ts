// import { dev } from "$app/environment";
import { RESEND_API_KEY, APP_EMAIL  } from "$env/static/private";
import { Resend } from 'resend';

export async function sendEmail(email: string, subject: string, body: string): Promise<boolean> {
  
  try {
    const resend = new Resend(RESEND_API_KEY);

    const data = await resend.emails.send({
      from: APP_EMAIL,
      to: [email],
      subject: subject,
      html: body
    });

    console.log(data);
    return true
  } catch (error) {
    console.error(error);
    return false
  }

}
