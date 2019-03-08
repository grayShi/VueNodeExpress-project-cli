const activityRouter = require('./activityRouter');

module.exports = app => {
  app.use('/api/activity', activityRouter);
};
