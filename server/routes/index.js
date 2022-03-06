/* File name - index.js 
   Author name - Uditesh Jha 
   Student id - 301224991
   Date - 08/02/2022 */
var express = require("express");
var router = express.Router();

let indexController = require("../controllers/index");
/* GET home page. */
router.get("/", indexController.displayHomePage);
/* GET home page. */
router.get("/home", indexController.displayHomePage);
/* GET aboutme page. */
router.get("/aboutme", indexController.displayAboutMePage);
/* GET projects page. */
router.get("/projects", indexController.displayProjectsPage);
/* GET services page. */
router.get("/services", indexController.displayMyServicesPage);
/* GET contact page. */
router.get("/contactme", indexController.displayContactMePage);

// GET Route for displaying the Login page
router.get("/login", indexController.displayLoginPage);
/* POST Route for processing the Login page */
router.post("/login", indexController.processLoginPage);
/* GET to perform UserLogout */
router.get("/logout", indexController.performLogout);

module.exports = router;
