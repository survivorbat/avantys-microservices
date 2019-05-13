const amqp = require("amqplib/callback_api");

amqp.connect(
  `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${
    process.env.RABBITMQ_HOST
  }`,
  (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {});
  }
);
