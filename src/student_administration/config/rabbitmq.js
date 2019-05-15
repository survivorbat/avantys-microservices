const amqp = require("amqplib/callback_api");

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
      const queue = "hello";
      const msg = "Hello world";

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true
        }
      );
    });
  }
);

module.exports = {
  amqp
};
