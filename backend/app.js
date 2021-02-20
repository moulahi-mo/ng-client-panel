//! init config

const http = require("http");
const path = require("path");
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");

//! imports
const ClientsRouter = require("./routes/clients-router");
const authRouter = require("./routes/Auth-router");
// ! using middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");

//! server side

// todo mongo db

mongoose
  .connect(process.env.mongoKey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((connection) => {
    console.log("connected to mongo db");
    server.listen(PORT);
  })
  .catch("connection to mongodb faild !");

// * middlewares
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//! headers

//* config CORS error setheader
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  next();
});
//! routes

app.use("/api/clients", ClientsRouter);

app.use("/api/auth", authRouter);

// ! special midlleware

app.use((req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send("someting bad happned !");
});
