import { WELCOME_EMAIL_TEMPLATE } from "./templates";

const nodemailer = require("nodemailer");

export const transporter=nodemailer.createTransport({
   service:"gmail",
    auth:{
        user:process.env.NODEMAILER_EMAIL,
        pass:process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail=async({email,name,intro}:WelcomeEmailData)=>{

    const htmlTemplate=WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}',name)
    .replace('{{intro}}',intro);

    const mailOptions={
        from:`"Stock-market <codewithjalal2025@gmail.com>"`,
        to:email,
        subject:"Welcome to stock Market !",
        text:"Thanks for joining stock market",
        html:htmlTemplate
    }
    await transporter.sendMail(mailOptions)
    

}