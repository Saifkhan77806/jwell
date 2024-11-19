const nodemailer = require('nodemailer');
let otps;
require('dotenv').config()

const sendSubscription = (email, subscription, Date, credits) =>{
    

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
            address: "khansaif86783@gmail.com"
        },
        to : email,
        subject: "Loyal customer from Jeweallti",
        text: 'this jeweallity',
        html: `<h1>${subscription} you had purchased subscription</h1></br><p>
        with ${credits} </br>
        which will be expire after ${Date} 
        Thank you!
        </p>`
    }).then((info)=>{
        console.log({info});
    }).catch(console.error);
}



module.exports = {sendSubscription}