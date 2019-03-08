// node 后端服务器

const routerIndex = require('./router/index');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mapping = require('./mapping/index');
const express = require('express');
const log4js = require('log4js');
const app = express();

const logger = log4js.getLogger();
log4js.configure('./server/config/log4js.json');

app.use((req, res, next) => {
  logger.info(req.originalUrl);
  next();
});
app.use('/api/', require('./monitor/access_record'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
// app.use('/api/user', userRouter)
routerIndex(app);

// 监听端口
app.listen(3000, () => {
  logger.info(`Server started at ${3000}`);
});
