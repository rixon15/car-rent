import nodemailer from "nodemailer";
import { GMAIL_APP_PASSWORD, GMAIL_USER } from "../constants/env";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

export const sendMail = async ({ to, subject, text, html }: Params) => {
  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  return await transporter.sendMail(mailOptions, (error) => error);
};