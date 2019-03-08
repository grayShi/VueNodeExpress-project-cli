const moment = require('moment');
const log4js = require('log4js');
const httpLogger = log4js.getLogger('http');
const uuid = require('uuid/v4');

const USER_ID = 'userId';

module.exports = function (req, res, next) {
  const url = req.path;
  const logID = uuid();
  httpLogger.info(logID, req.ip, 'TestUser' || req.session[USER_ID], url, 'start');
  const startTime = new moment();
  res.locals.context = {
    url: url,
    startTime: startTime,
    userID: 'TestUser' || req.session[USER_ID],
    ip: req.ip,
    logID: logID,
  };
  next();
};
