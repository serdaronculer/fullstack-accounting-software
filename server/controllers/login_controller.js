const User = require("../models/user_model");
const createHttpError = require("http-errors");


const loginPost = async (req, res, next) => {
    try {
        const user = await User.login(req, next);
        const token = user.loginGenerateToken();
        res.cookie('login-authorization', token);
        res.json({ user });

    } catch (error) {
        next(createHttpError(500, error));
    }
}

const loginGet =  (req, res, next) => {
    res.status(200).send("OK");
}

module.exports = {
    loginPost,
    loginGet
}