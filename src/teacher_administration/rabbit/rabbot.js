const rabbit = require("rabbot");
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
        name: "teacher_administration_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "teacher_administration_queue",
        keys: ["teacherRegistered"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("teacher_administration_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("teacherRegistered", msg => {
  console.log(msg.body);

  new Teacher(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbit;