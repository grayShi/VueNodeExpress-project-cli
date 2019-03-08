const seq = require('../model').getConnection();

module.exports = class BaseService {
  async doTransaction (operations, transaction) {
    if (typeof transaction === 'undefined' || transaction === null) {
      return seq.transaction(transaction => operations(transaction));
    }
    return operations(transaction);
  }
};
