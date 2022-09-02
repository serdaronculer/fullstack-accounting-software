const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

const authControl = async (req, res, next) => {
    try {
        const token = req.cookies['login-authorization'];
        jwt.verify(token, process.env.JWT_LOGIN_SECRET_KEY, async (e, decoded) => {
            if (e) {
                next(createHttpError(401, 'Please login first'));
            } else {
                const user = await User.findById(decoded.id);
                req.user = user;
                next();
            }
        });
    } catch (error) {
        next(createHttpError(500, error));
    }
}





module.exports = authControl