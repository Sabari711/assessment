const express = require('express');
const usersController = require('../controllers/usersControllers')
const router = express.Router();

router.post('/userSignUp',usersController.userRegister)
router.post('/userLogin',usersController.userLogin)
router.get('/getAllUsers',usersController.getUsers)



module.exports = router;