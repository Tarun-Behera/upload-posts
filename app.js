/**
 * # create logIn page. ///
 * # create logOut page. ///
 * # create signUp page or register page. ///
 * # if login page is filled with wrong data,then show error flash message. ///
 * # if signUp page filled with same data then show a Flash  message "User already exists" ///
 * # add flash messages to the error occured so that the user experience could be better. ///
 * # until the logout  button is clicked, keep user logged in even if  browser closed. ///
 * # If not logged in show login page after few sec delay, show login/signup page.
 */


var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const expressSession = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")

var app = express();

// *connect mongoose data setup to mongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/model-1")
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// ! requiring routes files
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var uploadRouter = require("./routes/upload");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//*middleware for flash messages
app.use(flash());

//* middleware setup for user authentication and authoriasation
/**
 *? it is used to manage sessions
 *? server is allowed to hold session
 */
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "don't say to anybody",
    store: new MongoStore({ mongoUrl:'mongodb://127.0.0.1:27017/model-1' }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, //! 7 days
  })
);
//? it initialises the passport for authorisation and authentication
app.use(passport.initialize());
//? it is used to store and manage login session by passport
app.use(passport.session());

/**
 **serializeUser is used to store id of the user in the session,while deserializeUser is used to   retrieve the user details of the user by fetching the id from the session
 */
passport.serializeUser(usersRouter.serializeUser());

passport.deserializeUser(usersRouter.deserializeUser());

//* middleware setups
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//*routes middle-ware setup
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", uploadRouter);

//# catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//* error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
