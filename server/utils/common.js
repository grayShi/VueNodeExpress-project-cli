const _ = require('lodash');
const log4js = require('log4js');
const httpLogger = log4js.getLogger('http');
const exceptionLogger = log4js.getLogger('exception');
const moment = require('moment');

// const { BaseError, OptimisticLockError } = require('sequelize/lib/errors');

function logRequestInfo (res, error) {
  if (typeof res.locals.context === 'undefined') {
    return;
  }
  const context = res.locals.context;
  const startTime = context.startTime;
  const url = context.url;
  const ip = context.ip;
  const userID = context.userID;
  const endTime = new moment();
  const durationTime = endTime.diff(startTime);
  const logID = context.logID;
  let errorMessage = null;
  if (error === undefined) {
    httpLogger.info(logID, ip, userID, url, 'end', durationTime, 'ms');
  } else {
    if (error instanceof Error) {
      errorMessage = error.name + ': ' + error.message;
    } else {
      errorMessage = error.toString();
    }

    httpLogger.error(logID, ip, userID, url, 'unexpected end', durationTime, 'ms,', errorMessage);
    exceptionLogger.error(logID, error);
  }
}

exports.success = function (res, data) {
  const ret = { success: true };
  if (typeof data !== 'undefined') ret.data = data;
  if (res.headersSent) {
    res.send(JSON.stringify(ret));
  } else {
    res.json(ret);
  }
  logRequestInfo(res);
};
exports.fail = function (res, error) {
  const ret = { success: false };
  if (!_.isUndefined(error)) {
    // if (error instanceof OptimisticLockError) {
    //   const errorRef = error.modelName;
    //   if (errorRef && errorRef.message) {
    //     return errorRef.message;
    //   }
    // } else if (error instanceof BaseError) {
    //   ret.error = error.name;
    // } else
    if (error instanceof Error && ({}).toString() !== `${error.message}`) {
      ret.error = error.message;
    } else {
      ret.error = error.toString();
    }
  }
  if (res.headersSent) {
    res.send(JSON.stringify(ret));
  } else {
    res.json(ret);
  }
  logRequestInfo(res, error);
};
