const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');

router.post('/login', adminController.loginAdmin);

module.exports = router;
