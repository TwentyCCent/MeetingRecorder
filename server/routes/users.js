var express = require('express');
var router = express.Router();

var teamsController = require('../controllers/teamsController');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:Id', teamsController.getUsers);

module.exports = router;
