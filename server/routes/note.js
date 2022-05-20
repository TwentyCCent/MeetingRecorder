var express = require('express');
var router = express.Router();

var noteController = require('../controllers/noteController');


router.post('/', noteController.createNote);


module.exports = router;