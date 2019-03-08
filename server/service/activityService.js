const BaseService = require('./baseService');
const { User } = require('../model');

class activityHandle extends BaseService {
  constructor () {
    super();
    this.user = User;
  }
  login (username, age) {
    return new Promise(resolve => {
      resolve('123');
    }, reject => {
      reject('123');
    });
  }
}
module.exports = new activityHandle();
