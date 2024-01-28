const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog.model");
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");
const {
  checkForAuthenticationCookie,
} = require("./middleware/authentication.middleware");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

//-1 for sorting in descending order
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.user("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
