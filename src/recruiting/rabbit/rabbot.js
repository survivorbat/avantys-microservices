const rabbit = require("rabbot");

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
  })
  .catch(error => console.log("Rabbot connect error: " + error));

module.exports = rabbit;
