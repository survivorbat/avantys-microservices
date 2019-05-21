rabbit = require('./rabbot');

rabbit.handle('MyMessage', (msg) => {
    console.log('received msg', msg.body);
    msg.ack();
});
