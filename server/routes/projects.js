var express = require('express');
var router = express.Router();

var projectsController = require('../controllers/projectsController');

// router.get('/', projectsController.getProjects);
//router.get('/:projectId', projectsController.getProject);
router.post('/',projectsController.createProject);
router.delete('/:projectId', projectsController.deleteProject);
router.put('/:projectId/:label', projectsController.updateProject);
router.get('/:Id', projectsController.getProjectsFromUser);

module.exports = router;