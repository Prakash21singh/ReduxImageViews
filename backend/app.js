const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const User = require("./routes/route.config");
const morgan = require("morgan");
const cors = require("cors");
const { MONGODB_URI } = require("./database/database.connection");
const MongoStore = require("connect-mongo");
//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    name: "user_sid",
    secret: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: {
      maxAge: 3600000,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    },
  })
);

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin:
      "https://redux-image-view-kj7a82clo-prakashs-projects-29909feb.vercel.app",
    credentials: true,
  })
);

//Route configuration
User.routeConfig(app);

module.exports = { app };
