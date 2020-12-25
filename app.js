const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./util/passport-setup");
const isLoggedIn = require("./util/isLoggedIn");
const multer = require("multer");

const app = express();

app.set("view engine", "pug");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Math.random() + file.originalname);
  },
});

const creatorRoutes = require("./routes/creator");
const userrRoutes = require("./routes/user");
const googleRoutes = require("./routes/google");

const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage }).fields([
    { name: "op1img", maxCount: 1 },
    { name: "op2img", maxCount: 1 },
    { name: "op3img", maxCount: 1 },
    { name: "op4img", maxCount: 1 },
  ])
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cookieSession({
    name: "user-session-quiz",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(googleRoutes);
app.use("/creator", isLoggedIn, creatorRoutes);
app.use("/quiz", userrRoutes);

app.get("/", (req, res, next) => {
  res.render("home", { title: "מי אני לעזאזל?", user: req.user });
});

app.use((req, res, next) => {
  res.status(404).render("404", { title: "העמוד לא קיים", user: req.user });
});

app.use((err, req, res, next) => {
  res.status(500).render("500", { title: "שגיאה", user: req.user });
});

const server = http.createServer(app);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    throw new Error(err);
  });
