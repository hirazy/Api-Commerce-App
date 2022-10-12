const amqp = require('amqplib/callback_api')

var connection;

async function connect() {
    connection = await amqp.connect('')
}