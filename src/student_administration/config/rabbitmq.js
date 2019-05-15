const amqp = require("amqplib/callback_api");

const defaultQueue = "avantys_events";

const connectAndSend = (msg, options = {}, queue = defaultQueue, callback) =>
  amqp.connect(
    `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${
      process.env.RABBITMQ_HOST
    }`,
    (error0, connection) => {
      if (error0) {
        throw error0;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(
          queue,
          Buffer.from(JSON.stringify(msg)),
          options,
          callback
        );
      });
    }
  );

// channel.consume(queue, msg => {
//     console.log(" [x] Received %s", msg.content.toString());
// });

module.exports = { connectAndSend };
