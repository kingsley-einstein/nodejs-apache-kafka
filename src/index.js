const express = require('express');
const app = express();
const { producer, consumer, admin } = require('./config/kafka');

const port = process.env.PORT || 5670;

async function initializeKafkaConnection() {
  await admin.connect();
  await admin.createTopics({
    topics: ['test-nodejs-topic'],
    waitForLeaders: true
  });
  await producer.connect();
  await consumer.connect();
}

async function watchProcess() {
  process.on('exit', async () => {
    await producer.disconnect();
    await consumer.disconnect();
  });
}

app.listen(port, () => {
  initializeKafkaConnection().catch(console.error);
  watchProcess().catch(console.error);
  console.log(`App is running on ${port}`);
});
