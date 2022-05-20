var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

/* Routes authentification & register listing. */
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update', authController.updateAccount);
router.delete('/delete', authController.deleteAccount);

module.exports = router;