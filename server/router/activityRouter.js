const activityService = require('../service/activityService');
const express = require('express');
const router = express.Router();
const { success, fail } = require('../utils/common');

router.post('/login', (req, res) => {
  activityService.login(req.body.username, req.body.age).then((v) => {
    success(res, v);
  }).catch(err => fail(res, err));
});

module.exports = router;
