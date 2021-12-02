const express = require('express');
const app = express();
const { producer, consumer, admin } = require('./config/kafka');
const { publish } = require('./controller');

const port = process.env.PORT || 5670;

async function initializeKafkaConnection() {
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic: 'test-nodejs-topic' }],
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

async function initConsumer() {
  await consumer.subscribe({ topic: 'test-nodejs-topic' });
  await consumer.run({
    eachMessage: ({ message }) => {
      console.log(`Received value: ${message.value.toString()}`);
    }
  });
}

app.use(express.json());

app.post('/publish', publish(producer));

app.listen(port, () => {
  initializeKafkaConnection().catch(console.error);
  watchProcess().catch(console.error);
  initConsumer().catch(console.error);
  console.log(`App is running on ${port}`);
});
