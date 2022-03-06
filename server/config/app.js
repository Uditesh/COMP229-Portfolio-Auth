var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

let session = require("express-session");
let passport = require("passport");
let passportJWT = require("passport-jwt");
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");
// database setup
let mongoose = require("mongoose");
let DB = require("./db");

// point mongoose to db URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error!"));
mongoDB.once("open", () => {
  console.log("Conneced to MongoDB!");
});

var indexRouter = require("../routes/index");
var usersRouter = require("../routes/users");
var contactsRouter = require("../routes/contact");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// create a User Model Instance
let userModel = require("../models/user");
let User = userModel.User;
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err, false);
    });
});

passport.use(strategy);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/businesscontact", contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
