const rabbit = require("rabbot");
const student = require("../model/student").Student;
const teacher = require("../model/teacher").TeacherModel;

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
        name: "evaluating_students_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "evaluating_students_queue",
<<<<<<< HEAD
        keys: ["studentRegistered", "teacherRegistered"]
=======
        keys: ["studentRegistered", "studentExamined", "studentGraded"]
>>>>>>> c075984630a459bbad8bf4b922e89e3d384f6c24
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected.");
    rabbit.startSubscription("evaluating_students_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("studentRegistered", msg => {
  console.log(msg.body);

  new student(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

rabbit.handle("studentExamined", msg => {
  console.log(msg.body);

  new student(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

rabbit.handle("studentGraded", msg => {
  console.log(msg.body);

  new student(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});


rabbit.handle("teacherRegistered", msg => {
  console.log(msg.body);

  new teacher(msg.body)
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});
module.exports = rabbit;
