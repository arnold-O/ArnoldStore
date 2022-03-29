const nodemailer = require('nodemailer')


// const sendmail = option =>{
//     // create transpoter
//     const transpoter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//         // FOR gmail activate less secure app option
//     })

//     // define email options



//     // send mail
// }
const sendEmail = async options =>{
    // create transpoter
    const transpoter = nodemailer.createTransport({
       host: process.env.EMAIL_HOST,
       port:process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
        // FOR gmail activate less secure app option
    })

    // define email options
    const mailOption ={
        from: 'arnold Oghiator<arnoldoghiator@gmail.com>',
        to: options.email,
      subject: options.subject,
        to: options.email,
        text: options.message
        // html
    }



    // send mail
    await transpoter.sendMail(mailOption)
}


module.exports =  sendEmail


