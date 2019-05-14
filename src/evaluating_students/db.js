const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`;
mongoose.connect(url);



module.exports = mongoose;