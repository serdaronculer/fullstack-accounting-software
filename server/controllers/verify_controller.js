const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

const verify = async (req, res, next) => {
    const token = req.query.id;     //!  ?id=asdkasds
    const userID = req.params.id;    //! localhost:3000/verify/askfajksfaskjf
    const user = await User.findById(userID);
    if (user) {
        jwt.verify(token, process.env.JWT_REGISTER_EMAIL_SECRET_KEY + user.isEmailActive, async (e, decoded) => {
            if (e) {
                next(createHttpError(400, "this user has already been confirmed"));
            } else {
                await User.findByIdAndUpdate(user._id, { isEmailActive: true }, { new: true, runValidators: true });
                res.json({
                    user: user,
                    message: 'user confirmed successfully'
                })
            }
        });
    }

}

module.exports = verify;