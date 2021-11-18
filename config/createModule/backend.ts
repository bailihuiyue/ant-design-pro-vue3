const express = require('express');
const shelljs = require('shelljs');
const server = express();
const rootPath = process.cwd()

server.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,username,token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

server.get('/createModule/addView', (req, res) => {
  doCopy(`yarn v --moduleName=${req.query.name}`, res)
});

server.get('/createModule/addComponent', (req, res) => {
  doCopy(`yarn c --moduleName=${req.query.name}`, res)
});

function doCopy(cmd, res) {
  shelljs.cd(rootPath);
  shelljs.exec(cmd)
  // 只有创建失败时才会有返回值,因为vite检测到创建文件后会自动刷新页面
  res.status(500).send({ error: 1, msg: '创建失败,具体问题请看控制台' });
}

server.listen(3006);

console.log('commander-ui已启动到3006端口')
