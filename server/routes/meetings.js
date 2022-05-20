var express = require('express');
var router = express.Router();

var meetingsController = require('../controllers/dailyMeetingsController');

router.get('/:Id', meetingsController.getMeetingsFromProject);
router.get('/file/:Id', meetingsController.getFilePathOfMeeting);
router.post('/', meetingsController.createMeeting);

module.exports = router;