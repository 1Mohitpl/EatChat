const { Kafka } = require("kafkajs");
const logger = require("../config/logger");
const { sendMail } = require("../utils/email");

const brokers = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const topic = process.env.KAFKA_TOPIC || "order.completed";

async function handleOrderCompleted(payload) {
  logger.info(`Notification: order ${payload.orderId} completed for ${payload.email || payload.userId}`);
  if (!payload.email) return; // nothing to send to, log is the notification
  await sendMail({
    to: payload.email,
    subject: `BeYuumi: order ${payload.orderId} confirmed`,
    html: `<p>Hi ${payload.name || "there"},</p><p>Your order <b>${payload.orderId}</b> is confirmed. Thank you!</p>`,
  });
}

async function run() {
  if (brokers.length === 0) {
    throw new Error("KAFKA_BROKERS is not set (e.g. localhost:9092)");
  }
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "beyuumi-notifier",
    brokers,
  });
  const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID || "beyuumi-notifications",
  });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });
  logger.info(`Notification consumer listening on ${topic}`);
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        await handleOrderCompleted(JSON.parse(message.value.toString()));
      } catch (err) {
        logger.error(`Notification failed: ${err.message}`);
      }
    },
  });
}

if (require.main === module) {
  run().catch((err) => {
    logger.error(err.message);
    process.exit(1);
  });
}

module.exports = { run, handleOrderCompleted };
