const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("./middlewares/auth.middleware");

//Route imports
const urlRoute = require("./routes/url.routes");
const staticRoute = require("./routes/staticRouter.routes");
const userRoute = require("./routes/user.routes");
const URL = require("./models/url.models");
const ejs = require("ejs");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", checkAuth, userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
