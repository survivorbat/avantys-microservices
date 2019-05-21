const rabbit = require('rabbot');


rabbit.handle('studentRegistered', (msg) => {
    const firstName = msg.body.firstName;
    const lastName = msg.body.lastName;

    if (!firstName || !lastName) {
        msg.nack();
    }

    const student = new StudentModel({firstName, lastName}, {});
    msg.ack();
    // student
    //     .save()
    //     .then(savedStudent => {
    //         msg.ack();
    //     })
    //     .catch(err => {
    //         msg.nack();
    //     });
    console.log('received msg', msg.body);
});


rabbit.configure({
    connection: {
        name: 'default',
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASS,
        host: process.env.RABBITMQ_HOST,
        port: 5672,
        vhost: '%2f',
        replyQueue: false
    },
    exchanges: [
        { name: 'ex.1', type: 'direct', autoDelete: false }
    ],
    queues: [
        { name: 'evaluating_students_queue', autoDelete: false, durable: true, subscribe: true },
    ],
    bindings: [
        { exchange: 'ex.1', target: 'evaluating_students_queue', keys: ["studentRegistered"] }
    ]
}).then(
    () => {
        console.log('Rabbot succesfully connected.');
        rabbit.startSubscription("evaluating_students_queue");
        console.log('Rabbot subscribed.');
    }
).catch(
    error => console.log('Rabbot connect error: ' + error)
);

// rabbit.publish('ex.1', { routingKey: "studentRegistered", type: 'studentRegistered', body: "savedStudent" });
// rabbit.startSubscription("evaluating_students_queue", false,"default");

// setTimeout(() => {
//     rabbit.shutdown(true)
// },5000);

module.exports = rabbit;