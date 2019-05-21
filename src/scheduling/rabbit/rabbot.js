const rabbit = require("rabbot");
const Module = require("../model/module").Module;
const Test = require("../model/test").TestModel;
const Teacher = require("../model/teacher").Teacher;

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
        keys: ["moduleRegistered", "teacherRegistered", "testCreated"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("scheduling_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("moduleRegistered", msg => {
  console.log(msg.body);
  new Module(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});
rabbit.handle("teacherRegistered", msg => {
  new Teacher(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});
rabbit.handle("testCreated", msg => {
  new Test(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbit;
