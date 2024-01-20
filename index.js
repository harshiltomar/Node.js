const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index.middleware");

const userRouter = require("./routes/user.route");

const app = express();
const PORT = 8000;

//Connection
connectMongoDb("mongodb://localhost:27017/node-learn-1");

// Middleware- Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes Define
app.use("api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
