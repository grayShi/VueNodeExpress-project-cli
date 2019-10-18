# Vue + Node 开发脚手架

项目搭建模板

[vue]
[node]
[express]
[log4j]
[sequelize]


# 项目结构
<pre>
.
├── README.md           
├── package.json        // 构建项目与工具包依赖
├── src                 // 前台目录
│   ├── components      // 组件库
│   │   └── index.js    // 注册为全局组件
│   ├── mixins       	// 公用方法
│   │   └── index.js    // 注册为全局方法
│   └── router        	// vue router 配置
├── server              // 后台node目录
│   ├── config      	// log4js配置
│   ├── exportModels    // sequelize-auto生成model位置
│   ├── mapping      	// sequelize mapping
│   ├── model      		// 项目实际使用model(可以和sequelize-auto相同，但是一般需要稍微修改)
│   │   └── index.js    // 配置数据库连接
│   ├── monitor      	// 中间件配置(发起请求，记录log)
│   ├── router      	// express路由
│   ├── service      	// 后台方法实现
│   ├── utils      		// 配置文件
│   │   └── common.js   // 定义标准的后台返回数据格式
│   ├── index.js      	// 入口文件

</pre>

# 功能
- [x] 前台全局方法，全局组件引入，Vue-cli
- [x] 后台express+node
- [x] 后台log输出，包括请求开始，结束，持续时间，请求接口
- [x] sequelize连接数据库

# 构建项目

 1. 将项目 clone 到本地
    ```
    git clone git@github.com:grayShi/project-cli.git
    ```
 2. 安装依赖的包
    ```
    npm install
    ```
 3. 修改package.json
    ```
    将scripts下的model修改成目标数据库
	npm run model
    ```
 4. 启动
	```
    npm run dev
	npm run server
    ```
