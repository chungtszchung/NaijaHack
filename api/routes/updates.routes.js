const express = require('express');

const router = express.Router();

const updatesCtrl = require('../controllers/updates.controllers');

router.route('/api/updates/getUpdates').get(updatesCtrl.getUpdates);

router.route('/api/updates/selectUpdate').post(updatesCtrl.selectUpdate);

module.exports = router;