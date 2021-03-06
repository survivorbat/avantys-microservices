const rabbit = require("rabbot");
const student = require("../model/student").Student;
const test = require("../model/test").TestModel;

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
        name: "student_portal_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "student_portal_queue",
        keys: ["studentApproved", "studentGraded"]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("student_portal_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("studentApproved", msg => {
  new student(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

rabbit.handle("studentGraded", msg => {
  console.log(msg.body);
  console.log(msg.body._id);
  test.findByIdAndDelete(msg.body._id).catch(err => {
    console.log(err);
  });
  new test(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => {
      console.log(err);
      msg.nack();
    });
});

module.exports = rabbit;
