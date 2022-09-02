const express = require('express');
const app = express();
require('dotenv').config();
require('./config/database');

const registerRouter = require('./routes/register_router');
const verifyRouter = require('./routes/verify_router');
const loginRouter = require('./routes/login_router');
const forgotPasswordRouter = require('./routes/forgot_password_router');
const resetPasswordRouter = require('./routes/reset_password_router');
const personRouter = require('./routes/person_router');
const stocksRouter = require('./routes/stock_router');


const authToken = require('./middlewares/auth_middleware');
const errorCatcher = require('./middlewares/error_middleware');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/register", registerRouter);
app.use("/verify", verifyRouter);
app.use("/login", loginRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use("/reset-password", resetPasswordRouter);

app.use("/", authToken);


app.use('/persons', personRouter);
app.use("/stocks", stocksRouter);


//! ERROR CATCHER
app.use(errorCatcher);





app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT + " port");
});

