const mongoose = require('mongoose');
Admin = mongoose.mongo.Admin;
const User = require('../models/user_model');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then( () => console.log("Veritabanına bağlanıldı"))
.catch(err => console.log("Veritabanı hatası "+err));


/* async function createOrConnectDatabase(databaseName, callback) {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING + "/" + databaseName)
        console.log("connected to database")
        await callback();
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}

function databaseList(callback) {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => console.log("Veritabanına bağlanıldı"))
        .catch((err) => console.log("Veritabanı bağlantısında sorun meydana geldi : " + err));

    mongoose.connection.on('open', async function () {
        new Admin(mongoose.connection.db).listDatabases(function (err, result) {

            if (err) {
                console.log(err);
            }
            else {
                console.log('listDatabases succeeded');
                var allDatabases = result.databases;
                console.log(allDatabases);
                if (callback) {
                    callback();
                }
                mongoose.disconnect();
                return allDatabases;
            }
        });
    });
}

function closeConnection() {
    mongoose.disconnect();
}

databaseList();

module.exports = {
    createOrConnectDatabase,
    databaseList,
    closeConnection
}

 */





















































/* mongoose.connection.on('disconnected', err => {
    console.log("disconnected");
});
mongoose.connection.on('error', err => {
    console.log(err);
    mongoose.disconnect();
    throw new Error(err);
});
 */