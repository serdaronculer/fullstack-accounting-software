const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
const User = require("../models/user_model");
const bcrypt = require('bcrypt');

const resetPassword = async (req, res, next) => {
    try {
        const jwtToken = req.cookies.resetToken;
        const userID = req.cookies.userID;
        const user = await User.findById(userID)

        if (user) {
            if (jwtToken) {
                jwt.verify(jwtToken, process.env.JWT_RESET_TOKEN_SECRET_KEY + user.password, async (e, decoded) => {
                    if (e) {
                        next(createHttpError(401, 'password reset failed ' + e))
                    } else {
                        res.clearCookie('resetToken');
                        res.clearCookie('userID');

                        if (req.body.password === req.body.rePassword) {
                            const hashPassword = await bcrypt.hash(req.body.password, 8);
                            const newUserInfo = await User.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true, runValidators: true });
                            res.status(200).json(newUserInfo);
                        } else {
                            res.status(400).json({
                                "message": "Passwords do not match"
                            });
                        }
                    }
                });
            } else {
                next(createHttpError(401, 'password reset failed'))
            }
        } else {
            next(createHttpError(401, 'password reset failed'))
        }
    } catch (error) {
        next(createHttpError(500, error));
    }
}


module.exports = resetPassword