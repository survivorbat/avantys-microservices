const rabbit = require("rabbot");
const student = require("../models/potential-student").PotentialStudent;

rabbit
  .configure({
    connection: {
      name: "default",
      user: process.env.RABBITMQ_USER,
      pass: process.env.RABBITMQ_PASS,
      host: process.env.RABBITMQ_HOST,
      port: 5672,
      vhost: "%2f",
      replyQueue: false
    },
    exchanges: [{ name: "ex.1", type: "direct", autoDelete: false }],
    queues: [
      {
        name: "recruiting_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "recruiting_queue",
        keys: ["studentRegistered"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("recruiting_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("studentRegistered", msg => {
  new student(msg).student
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbit;
