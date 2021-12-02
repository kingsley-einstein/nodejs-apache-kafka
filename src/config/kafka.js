const { Kafka } = require('kafkajs');

const clientId = 'test-nodejs-app';
const brokers = ['localhost:9092'];

const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: clientId });
const admin = kafka.admin();

module.exports = { producer, consumer, admin };
