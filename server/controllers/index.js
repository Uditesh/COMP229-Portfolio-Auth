let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let DB = require("../config/db");

let userModel = require("../models/user");
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayAboutMePage = (req, res, next) => {
  res.render("index", {
    title: "About Me",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayProjectsPage = (req, res, next) => {
  res.render("index", {
    title: "Projects",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayMyServicesPage = (req, res, next) => {
  res.render("index", {
    title: "My Services",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayContactMePage = (req, res, next) => {
  res.render("index", {
    title: "Contact Me",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      };

      const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800,
      });
      return res.redirect("/contact-list");
    });
  })(req, res, next);
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
