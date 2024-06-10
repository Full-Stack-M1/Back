const express = require("express");
const app = express();
require("dotenv").config();

const router = require("./routes/index.js");
const cors = require("cors");
const axios = require("axios");

const mongoose = require("mongoose");
const { swaggerUi, swaggerDocs } = require("./config/swagger.config.js");

// MongoDB connection URL
const mongoURL = `${process.env.MONGO_START}${process.env.MONGO_END}`;

// Connect to MongoDB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const initApplication = async () => {
  app.use(cors());
  app.options(process.env.FRONTEND_URL, cors());
  app.use(express.json());

  app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://ifconfig.me/ip");
      const ip = response.data.trim();
      res.send(`Public IP address is: ${ip}`);
    } catch (error) {
      console.error("Error fetching IP address:", error);
      res.status(500).send("Error fetching IP address");
    }
  });

  app.use("/api", router);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
};

initApplication();
