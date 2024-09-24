import resend from "../config/resend";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendMail = async ({ to, subject, text, html }: Params) =>
  await resend.emails.send({
    from: "ivacsony.szilard@gmail.com",
    to: "delivered@resend.dev",
    subject,
    text,
    html,
  });
