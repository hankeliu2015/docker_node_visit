const express = require('express');
const redis = require('redis');
const process = require('process')

const app = express();
const client = redis.createClient({
  host: 'redis-server',     // define redis server location
  port: 6379              // redis defaul port
});
client.set('visits', 0);  // 0 is exist status code

app.get('/', (req, res) => {
  process.exit(0);
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
