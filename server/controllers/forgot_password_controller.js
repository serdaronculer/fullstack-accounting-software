const createHttpError = require("http-errors");
const User = require("../models/user_model");
const jwt = require('jsonwebtoken');
const resetPasswordEmail = require('../config/email');
const bcyrpt = require('bcrypt');

const forgotPassword = async (req, res, next) => {
    const userMail = req.body.email;
    const user = await User.findOne({ email: userMail });

    if (user) {
        const jwtPayload = { id: user._id, userName: user.userName, email: user.email };
        const secretKey = process.env.JWT_FORGOT_PASSWORD_SECRET_KEY + user.password;
        const token = jwt.sign(jwtPayload, secretKey);
        const url = process.env.WEB_SITE_URL + "forgot-password/" + user._id + "/" + token;

        const subject = 'Şifremi Unuttum';
        const message = 'Şifrenizi sıfırlamak için linke tıklayınız: ';

        await resetPasswordEmail(user, url, next, subject, message);

        res.json({
            message: 'A password reset link has been sent to your email address.'
        })


    } else {
        next(createHttpError(400, 'User not found'));
    }
}


const resetPassword = async (req, res, next) => {
    const userID = req.params.id;
    const token = req.params.token;


    const user = await User.findById(userID);
    jwt.verify(token, process.env.JWT_FORGOT_PASSWORD_SECRET_KEY + user.password, async (e, decoded) => {
        if (e) {
            next(createHttpError(400, e));
        } else {
            const resetToken = jwt.sign({ id: user._id }, process.env.JWT_RESET_TOKEN_SECRET_KEY + user.password);
            res.cookie('resetToken', resetToken);
            res.cookie('userID', user._id);
            res.status(200).json({
                "message": "Transaction successful"
            })
        }
    });


}

module.exports = {
    forgotPassword,
    resetPassword
}