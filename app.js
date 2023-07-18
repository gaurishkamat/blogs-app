const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;
mongoose
  .connect(url)
  .then(() => {
    logger.info(`Successfully connected to MongoDB`);
  })
  .catch(() => {
    logger.error(error);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
