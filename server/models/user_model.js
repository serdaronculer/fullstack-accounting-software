const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const createHttpError = require("http-errors");
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    isEmailActive: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        trim: true,
    },
},
    { collection: "Users", timestamps: true }
);


UserSchema.methods.loginGenerateToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_LOGIN_SECRET_KEY);
    return token;
}

UserSchema.statics.login = async function (req, next) {
    const userInfo = req.body;
    console.log(userInfo);
    const user = await User.findOne({ email: userInfo.email });
    if (user) {
        const isTrue = await bcrypt.compare(userInfo.password, user.password);
        if (isTrue) {
            return user;
        } else {
            next(createHttpError(401, 'Email veya şifre hatalı'));
        }
    } else {
        next(createHttpError(401, 'Email veya şifre hatalı'));
    }
}



const User = mongoose.model("users", UserSchema);


module.exports = User;