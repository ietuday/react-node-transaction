const { getMailConfig } = require("../configs/database");

console.log("getMailConfig",getMailConfig)
const nodemailer = require('nodemailer');
const { MAIL_SETTINGS } = getMailConfig;
console.log("MAIL_SETTINGS",MAIL_SETTINGS)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'udayaditya.singh@gmail.com',
      pass: 'eyelkzjbgqllegkt'
    }
  });

 const sendMail = async function (params){
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: params.subject, // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    return false;
  }
};

module.exports = {sendMail};