let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let contacts = require("../models/contacts");

module.exports.displayContactList = (req, res, next) => {
  contacts.find((err, contacts) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("businesscontact/list", {
        title: "Business Contact",
        ContactList: contacts,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

// GET Route for Add Business Contact page - CREATE
module.exports.displayAddPage = (req, res, next) => {
  res.render("businesscontact/add", {
    title: "Add a Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processAddPage = (req, res, next) => {
  let newContact = contacts({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  contacts.create(newContact, (err, Contacts) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/businesscontact");
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  console.log("edit id: " + id);
  contacts.findById(id, (err, contactToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // show the contact view
      res.render("businesscontact/edit", {
        title: "Edit a Contact",
        contact: contactToEdit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;
  let updatedContact = contacts({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  contacts.updateOne({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/businesscontact");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;
  // console.log("id:::" + id);
  contacts.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/businesscontact");
    }
  });
};
