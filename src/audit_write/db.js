const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const options = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0
};

const url = `mongodb://${process.env.MONGODB_HOST}`;

const connect = () =>
  mongoose.connect(url, options, error => {
    if (error) {
      console.log("Error connecting to ", process.env.MONGODB_HOST, error);
    } else {
      console.log("Succesfully connected to ", process.env.MONGODB_HOST);
    }
  });

mongoose.connection.on("error", error => {
  console.log(error.toString());
  mongoose.disconnect();
});

mongoose.connection.on("disconnected", () => {
  console.log("Unable to connect to Mongo, reconnecting...");
  setTimeout(() => connect(), 10000);
});

connect();

module.exports = mongoose;
