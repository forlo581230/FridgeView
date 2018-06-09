var mongoose = require('mongoose');


exports.init = function (mongoName, callback) {

    var mongoDB = 'mongodb://localhost:27017/' + mongoName;
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDB, {
        useMongoClient: true
    });

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function () {
        callback(true)
    });
}

