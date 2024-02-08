import nodeMailer from "nodemailer"

const sendEmail =async (options)=> {
    const transporter = nodeMailer.createTransport({
       host:"smtp.gmail.com",
       port:465,
        service:"Gmail",
        auth:{
            user:"kakalighosal333@gmail.com",
            pass:"Deep2005@",
        },
    })
    const mailoptions= {
        from:"kakalighosal333@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailoptions);

    console.log("Created");

}

export default sendEmail;