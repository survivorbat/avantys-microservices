const mongoose = require("../db");

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    body: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;