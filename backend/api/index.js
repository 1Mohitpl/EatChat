const app = require("../src/app");
const { connectDB } = require("../src/config/db");

// Vercel serverless entry: cold-start ensures tables exist, then Express handles routing.
// ponytail: fire-and-forget; connectDB already logs fatally on failure.
connectDB().catch(() => {});

module.exports = app;
