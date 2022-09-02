const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendRegisterEmail(user, url, next, subject, message) {
    await transporter.sendMail({
        from: process.env.EMAIL_ADRESS,
        to: user.email,
        subject,
        text: message + url
    }, (error, info) => {
        if (error) {
            console.log("Email gönderiminde hata oluştu " + error);
            next(createError(400, 'Mail gönderiminde sorun oluştu. İşlem başarısız.'));
            transporter.close();
        }
        else {
            console.log("Email gönderildi");
            transporter.close();
        }
    });


}

module.exports = sendRegisterEmail

