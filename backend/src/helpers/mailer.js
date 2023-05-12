const nodemailer = require('nodemailer')

const auth1 = {
  user: 'geovanni.jones96@ethereal.email',
  pass: '4akBuyEAeUdKzQfxTJ'
}

const auth2 = {
  user: 'royce.huels@ethereal.email',
  pass: 'VAqesfHpgbvykb5sCA'
}

exports.sendVerificationEmail = async (email, name, url) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: auth1,
    });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <geovanni.jones96@ethereal.email>', // sender address
    to: "ngaythobetrai@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>click link to verify your account: <a href=${url} target="_bank">${url}</a>?</b>`, // html body
  });

}

exports.sendResetPasswordCode = async (email, name, code) => {
 
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: auth1,
    });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <geovanni.jones96@ethereal.email>', // sender address
    to: "ngaythobetrai@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Your reset password code: <a href="" target="_bank">${code}</a>?</b>`, // html body
  });

}
