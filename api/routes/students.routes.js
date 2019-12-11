const express = require('express');

const router = express.Router();

const studentsCtrl = require('../controllers/student.controllers');
const checkAuth = require('../middlewares/checkAuth');

router.route('/api/students/create').post(studentsCtrl.create);

router.route('/api/students/validate').post(studentsCtrl.login);

router.route('/api/students/sendAlert').post(checkAuth, studentsCtrl.sendAlert);

router.route('/api/students/savedUpdate').post(studentsCtrl.savedUpdate);

module.exports = router;
