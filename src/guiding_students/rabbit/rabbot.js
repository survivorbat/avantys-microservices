const rabbit = require("rabbot");
const student = require("../model/student").Student;

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
        name: "guiding_students_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "guiding_students_queue",
        keys: ["notesCreated"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("guiding_students_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("notesCreated", msg => {
  new student(msg).student
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

module.exports = rabbit;
