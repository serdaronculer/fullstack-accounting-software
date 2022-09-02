const { body, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../models/user_model');
const bcrypt = require('bcrypt');
//const saltRounds = 8;
const jwt = require('jsonwebtoken');
const registerEmail = require('../config/email');



const register = async function (req, res, next) {

  try {
    const errorList = validationResult(req);


    const result = await userControl(next, req, res);

    console.log(result);
    if (result) {

      const hash = await bcrypt.hash(req.body.password, 8);
      req.body.password = hash;

      console.log(req.body);
      const newUser = new User(req.body);

      const jwtInfo = {
        id: newUser._id,
        email: newUser.email
      }

      const jwtToken = jwt.sign(jwtInfo, process.env.JWT_REGISTER_EMAIL_SECRET_KEY + newUser.isEmailActive);

      const url = process.env.WEB_SITE_URL + "verify/" + newUser._id + "?id=" + jwtToken;

      //! EMAIL
      const message = 'Emailinizi onaylamak için lütfen bu linke tıklayın: ';
      const subject = 'Emailinizi lütfen onaylayın';
      try {
        await newUser.save();
        await registerEmail(newUser, url, next, subject, message);
      } catch (error) {
        next(createError(400, error));
        return;
      }
      res.json({
        user: newUser,
        message: 'Registering user successful. Please check your e-mail box'
      });
    }

  } catch (error) {
    next(createError(500, error))
  }
}

async function userControl(next, req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.isEmailActive === true) {
      next(createError(400, 'Böyle bir kullanıcı sistemde kayıtlı'));
      return false;
    } else if (user && user.isEmailActive === false) {

      await User.findByIdAndRemove(user._id);
      return true;
    } else if (!user) {
      return true;
    }
  } catch (error) {
    next(createError(500, error));
    return false
  }
}



module.exports = {
  register
}