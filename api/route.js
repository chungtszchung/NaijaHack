const express = require('express');
var router = express.Router();
const controller = require("./controller")



router.post('/create', controller.createUser);

router.post('/getprofile', controller.getProfile);

router.post('/alert', controller.sendSignal);


module.exports = router