const nodemailer = require('nodemailer');
let otps;
require('dotenv').config()

const sendContact = (email,names, message, subject) =>{
    

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'khansaif86783@gmail.com',
          pass: process.env.EMAIL_PASS_KEY,
        },
      });
      
        transporter.verify().then(console.log).catch(console.error);
      
        transporter.sendMail({
        from: {
            name: "Jeweallity",
            address: email
        },
        to : "khansaif86783@gmail.com",
        subject: "Jewellity complain",
        text: 'this jeweallity',
        html: `
        <div>this is from ${names}</div>
        <h1>${subject}</h1></br><p>
        ${message}
        </p>`
    }).then((info)=>{
        console.log({info});
    }).catch(console.error);
}



module.exports = {sendContact}