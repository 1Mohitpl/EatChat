const { Kafka } = require("kafkajs");
const logger = require("./logger");

const brokers = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const topic = process.env.KAFKA_TOPIC || "order.completed";

const enabled = brokers.length > 0;
let producerPromise = null;

function getProducer() {
  if (!enabled) return Promise.resolve(null);
  if (!producerPromise) {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || "beyuumi-api",
      brokers,
    });
    const producer = kafka.producer();
    producerPromise = producer.connect().then(() => producer);
    producerPromise.catch((err) => {
      producerPromise = null; // retry next publish
      throw err;
    });
  }
  return producerPromise;
}

// Never throws: orders must succeed even when Kafka is down/not configured.
// ponytail: fire-and-forget, no retry queue; add outbox table if loss matters.
async function publishOrderCompleted(order, user) {
  if (!enabled) return false;
  try {
    const producer = await getProducer();
    if (!producer) return false;
    await producer.send({
      topic,
      messages: [
        {
          key: String(order.id),
          value: JSON.stringify({
            event: "order.completed",
            orderId: order.id,
            userId: order.userId || order.user_id,
            email: user && user.email,
            name: order.name,
            totals: order.totals,
            placedAt: order.placedAt || order.placed_at,
          }),
        },
      ],
    });
    logger.info(`Order ${order.id} published to ${topic}`);
    return true;
  } catch (err) {
    logger.warn(`Kafka publish failed (order ${order && order.id}): ${err.message}`);
    return false;
  }
}

module.exports = { publishOrderCompleted, kafkaTopic: topic, kafkaEnabled: enabled };
