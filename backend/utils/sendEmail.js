import nodeMailer from "nodemailer"

const sendEmail =async (options)=> {
    const transporter = nodeMailer.createTransport({
       host:"smtp.gmail.com",
       port:465,
        service:"Gmail",
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    })
    const mailoptions= {
        from:"",
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendEmail(mailoptions);

    console.log("Created");

}

export default sendEmail;