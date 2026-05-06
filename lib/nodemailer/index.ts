import { WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE } from "./templates";
import nodemailer from "nodemailer";

const escapeHtml = (unsafe: string) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

export const transporter=nodemailer.createTransport({
   service:"gmail",
    auth:{
        user:process.env.NODEMAILER_EMAIL,
        pass:process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail=async({email,name,intro}:WelcomeEmailData)=>{

    const htmlTemplate=WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}',escapeHtml(name))
    .replace('{{intro}}',intro);

    const mailOptions={
        from:`"Stock-market <${transporter.options.auth.user}>"`,
        to:email,
        subject:"Welcome to stock Market !",
        text:"Thanks for joining stock market",
        html:htmlTemplate
    }
    await transporter.sendMail(mailOptions)
    

}

export const sendNewsSummaryEmail = async ({ email, date, newsContent }: { email: string; date: string; newsContent: string }) => {

    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', escapeHtml(date))
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Stock-market <${transporter.options.auth.user}>"`,
        to: email,
        subject: "Your Daily Market News Summary",
        text: "Here's your daily market news summary",
        html: htmlTemplate
    }
    await transporter.sendMail(mailOptions)

}