const rabbit = require("rabbot");
const module = require("../model/module").Module;
const test = require("../model/test").TestModel;
const teacher = require("../model/teacher").Teacher;

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
        name: "scheduling_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "scheduling_queue",
        keys: ["moduleCreated", "teacherRegistered", "testCreated"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("scheduling_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("moduleCreated", msg => {
  new module(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});
rabbit.handle("teacherRegistered", msg => {
  new test(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});
rabbit.handle("testCreated", msg => {
  new teacher(msg)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbit;
