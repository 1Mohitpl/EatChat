const path = require("path");
const fs = require("fs");
const winston = require("winston");
require("dotenv").config();

const { combine, timestamp, printf, colorize, json } = winston.format;

const logDir = process.env.LOG_DIR || "logs";

// Vercel's filesystem is read-only except /tmp — file logs are best-effort only.
let fileLogging = false;
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.accessSync(logDir, fs.constants.W_OK);
  fileLogging = process.env.NODE_ENV !== "production";
} catch (e) {
  fileLogging = false;
}

const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  json()
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    ...(fileLogging
      ? [
          new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
            format: fileFormat,
          }),
          new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
            format: fileFormat,
          }),
        ]
      : []),
    new winston.transports.Console({ format: consoleFormat }),
  ],
  exitOnError: false,
});

// Named stream so morgan can write request logs into winston
logger.stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = logger;
