import { port, ip } from '../../config'

const redis = require('redis')

const client = redis.createClient({
    url: 'redis://default:redispw@localhost:49153'
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect()

client.set('framework', 'ReactJS', function(err, reply) {
    console.log(reply); // OK
});

client.get('framework', function(err, reply) {
    console.log(reply); // ReactJS
});

client.del('frameworks_list', function(err, reply) {
    console.log(reply); // 1
});


export default client;