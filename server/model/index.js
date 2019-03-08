const _ = require('lodash');
const Sequelize = require('sequelize');
const logger = require('log4js').getLogger('console');
const normalizedPath = require('path').join(__dirname, '.');
const log4js = require('log4js');
const fs = require('fs');

const config = {
  database: 'blog', // 使用哪个数据库
  username: 'root', // 用户名
  password: 'shigaolei', // 口令
  host: '47.97.115.41', // 主机名
  port: 3306, // 端口号，MySQL默认3306
};

function sqlLog (msg) {
  log4js.getLogger('sql').info(msg);
}

const seq = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
  logging: sqlLog,
});

fs.readdirSync(normalizedPath)
  .filter(fileName => {
    return fileName.match(/js/) && !fileName.match(/index\.js/);
  }).forEach(fileName => {
    let t;
    let modelName = _.upperFirst(_.camelCase(fileName.split(/\./)[0]));
    t = exports[modelName] = require('./' + fileName)(seq, Sequelize);

    //  重写sequelize 函数
    // t.prototype.__orig_update = t.prototype.update;
    // t.prototype.update = function (values, options) {
    //   const transaction = checkTransaction(options);
    //   const userId = getSession(transaction, USER_ID);
    //   if (userId && !values.updatedBy) values.updatedBy = userId;
    //   if (this.version != undefined) {
    //     if (values.version != undefined) {
    //       if (values.version != this.version) {
    //         throw new seq.OptimisticLockError({
    //           modelName: this.constructor.name,
    //           values,
    //           where: {
    //             errorMsg: 'entity was modified by others',
    //             where: this.where(true)
    //           }
    //         });
    //       }
    //     } else {
    //       throw new seq.OptimisticLockError({
    //         modelName: this.constructor.name,
    //         values,
    //         where: {
    //           errorMsg: 'version undefined!(please provide version field for update)'
    //         }
    //       });
    //     }
    //   }
    //   return this.__orig_update(values, options);
    // }
    //
    // t.__orig_create = t.create;
    // t.create = function (value, options) {
    //   const transaction = checkTransaction(options);
    //   const userId = getSession(transaction, USER_ID);
    //   if (userId && !value.createdBy) value.createdBy = userId;
    //   return t.__orig_create(value, options);
    // };

    // findById and destroy
    // t.findAndDestroy = async function (value, options) {
    //   if (value === undefined || (value.id === undefined && value.where === undefined)) {
    //     throw new Error("please provide id as primary key to find data!");
    //   }
    //   let data;
    //   if (value.id) {
    //     data = await this.findById(value.id, options);
    //   } else if (value.where) {
    //     data = await this.find({ where: value.where }, options);
    //   }
    //   if (data === undefined || data === null) {
    //     throw new seq.OptimisticLockError({
    //       modelName: this.name,
    //       where: {
    //         errorMsg: 'entity was modified by others'
    //       }
    //     });
    //   }
    //   if (data.version !== undefined) {
    //     if (value.version !== undefined) {
    //       if (value.version !== data.version) {
    //         throw new seq.OptimisticLockError({
    //           modelName: this.name,
    //           where: {
    //             errorMsg: 'entity was modified by others',
    //             where: data.where(true)
    //           }
    //         });
    //       }
    //     } else {
    //       throw new seq.OptimisticLockError({
    //         modelName: this.name,
    //         where: {
    //           errorMsg: 'version undefined!(please provide version field for destroy)'
    //         }
    //       });
    //     }
    //   }
    //   let retVal = data.destroy(options);
    //   if (retVal < 1) {
    //     throw new seq.OptimisticLockError({
    //       modelName: this.name,
    //       where: {
    //         errorMsg: 'entity was modified by others',
    //         where: data.where(true)
    //       }
    //     });
    //   }
    //   return retVal;
    // }
    //
    // t.findAndCheck = async function (id, options) {
    //   let ret;
    //   if (typeof id === 'object') {
    //     ret = await this.find(id, options);
    //   } else {
    //     ret = await this.findById(id, options);
    //   }
    //   if (ret === undefined || ret === null) {
    //     throw new seq.OptimisticLockError({
    //       modelName: this.name,
    //       where: {
    //         errorMsg: 'entity was modified by others'
    //       }
    //     });
    //   }
    //   return ret;
    // };
    t.sync({})
      .then(() => {
        logger.info(modelName + ' Synced Done');
      }).catch((e) => {
        logger.error(`${modelName} Synced Error`);
        logger.error(e);
      });
  });

exports.getConnection = function () {
  return seq;
};
