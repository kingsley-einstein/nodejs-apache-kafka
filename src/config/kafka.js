const { Kafka } = require('kafkajs');

const clientId = 'test-app';
const brokers = ['localhost:9092'];

const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();
const consumer = kafka.consumer();
const admin = kafka.admin();

module.exports = { producer, consumer, admin };
