/* File name - index.js 
   Author name - Uditesh Jha 
   Student id - 301224991
   Date - 08/02/2022 */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
