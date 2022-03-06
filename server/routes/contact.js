let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

let contactController = require("../controllers/contactList");
function requireAuth(req, res, next) {
  // check if an user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Contact List page - READ Operation */
router.get("/", contactController.displayContactList);

/* GET Contact Add page - CREATE Operation */
router.get("/add", requireAuth, contactController.displayAddPage);

/* POST processing the Contact Add page - CREATE Operation */
router.post("/add", requireAuth, contactController.processAddPage);

/* GET Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, contactController.displayEditPage);

/* POST processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, contactController.processEditPage);

/* GET Contact Delete page - DELETE Operation */
router.get("/delete/:id", requireAuth, contactController.performDelete);

module.exports = router;
