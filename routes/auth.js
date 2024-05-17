const express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(new localStrategy(userModel.authenticate()));

//profile page
router.get("/profile", isloggedIn, async(req, res) => {
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  .populate('posts')
  // ?console.log(user)
  res.render("profile",{user,error:req.flash('error')});
});

//register page
router.get("/register", (req, res, next) => {
  res.render("register", { error: req.flash("error") });
});
router.post("/register", (req, res, next) => {
  /* const userData = new userModel({ 
      username:  req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
    })
  */
  const { username, fullname ,password} = req.body;
  const userData = new userModel({ username, fullname });

  //* user creation and save and validation is done by .register
  userModel.register(userData, password, (err) => {
    if (!req.body.fullname && !req.body.username) {
      console.error("fill the data");
      req.flash("error", "Fill the data");
      return res.redirect("/register");
    } else {
      if (!req.body.fullname) {
        console.error("fullname");
        req.flash("error", "fullname is required");
        return res.redirect("./register");
      } else {
        if (err) {
          console.error(err.message);
          req.flash("error", err.message);
          return res.redirect("/register");
        } else
          passport.authenticate("local")(req, res, () => {
            res.redirect("/login");
          });
      }
    }
  });
});

//login page
router.get("/login", (req, res, next) => {
  res.render("login", { error: req.flash("error") });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//logout page
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/");
      console.log("User has logged out");
    }
  });
});

//*middleware for not to visit any  other pages without logging in
function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else res.redirect("/login");
}


module.exports = router;
