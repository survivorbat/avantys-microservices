const rabbit = require("rabbot");
const event = require("../model/event");

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
        name: "audit_write_queue",
        autoDelete: false,
        durable: true,
        subscribe: true
      }
    ],
    bindings: [
      {
        exchange: "ex.1",
        target: "audit_write_queue",
        keys: ["studentRegistered",
            "studentExamined",
            "studentGraded",
            "moduleCreated",
            "teacherRegistered",
            "testCreated",
            "studentApproved",
        ]
      }
    ]
  })
  .then(() => {
    console.log("Rabbot succesfully connected...");
    rabbit.startSubscription("audit_write_queue");
    console.log("Rabbot subscribed.");
  })
  .catch(error => console.log("Rabbot connect error: " + error));

rabbit.handle("studentRegistered", msg => {
  new event(msg).event
    .save()
    .then(() => msg.ack())
    .catch(err => msg.nack());
});

rabbit.handle("studentExamined", msg => {
    new event(msg).event
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});
rabbit.handle("studentGraded", msg => {
    new event(msg).event
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});
rabbit.handle("moduleCreated", msg => {
    new event(msg).event
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});
rabbit.handle("teacherRegistered", msg => {
    console.log("test");
    new event(msg).event
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});
rabbit.handle("testCreated", msg => {
    new event(msg).event
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});
rabbit.handle("studentApproved", msg => {
    new event(msg).event
        .save()
        .then(() => msg.ack())
        .catch(err => msg.nack());
});

module.exports = rabbit;
