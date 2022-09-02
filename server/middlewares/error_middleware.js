const errorCatcher = (err, req, res, next) => {
    //console.log(err);
console.log("Hata yakalandı == "+err.status);
res.status(err.status).json(err)
}

module.exports = errorCatcher;