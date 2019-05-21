const rabbit = require('rabbot');

rabbit.handle('MyMessage', (msg) => {
    console.log('received msg', msg.body);
    msg.ack();
});



rabbit.configure({
    connection: {
        name: 'default',
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASS,
        host: process.env.RABBITMQ_HOST,
        port: 5672,
        vhost: '%2f',

    },
    exchanges: [
        { name: 'ex.1', type: 'direct', autoDelete: true }
    ],
    queues: [
        { name: 'evaluating_student_queue', autoDelete: true, subscribe: true },
    ],
    bindings: [
        { exchange: 'ex.1', target: 'evaluating_students_queue', keys: ["studentRegistered"] }
    ]
}).then(
    () => console.log('connected!')
);

// rabbit.request('ex.1', { type: 'MyRequest' })
//     .then(
//         reply => {
//             console.log('got response:', reply.body);
//             reply.ack();
//         }
//     );

rabbit.publish('ex.1', { type: 'MyMessage', body: 'hello!' });


// setTimeout(() => {
//     rabbit.shutdown(true)
// },5000);

module.exports = rabbit;