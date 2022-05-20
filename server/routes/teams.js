var express = require('express');
var router = express.Router();

var teamsController = require('../controllers/teamsController');

router.get('/:Id', teamsController.getUsersFromProject);
router.post('/',teamsController.createMember);
// router.get('/members', teamsController.getUsersFromProject);

module.exports = router;