const redis = require('redis');
const client = redis.createClient();


client.set('key','value');
client.get('key')