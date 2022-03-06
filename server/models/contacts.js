let mongoose = require("mongoose");

let contactModel = mongoose.Schema(
  {
    name: String,
    number: String,
    email: String,
  },
  {
    collection: "contacts",
  }
);

module.exports = mongoose.model("contacts", contactModel);
