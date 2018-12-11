const http = require('http');
// 新引入了 url 模块, 主要用于解析请求参数
const url = require('url');

const PORT = 8888;

// 创建一个 http 服务
const server = http.createServer((request, response) => {
  // 获取前端请求数据
  const queryObj = url.parse(request.url, true).query;
  console.log(queryObj)
  // 这里把前端传来的 callback 字段作为后端返回的回调函数的函数名称
  response.end(`${queryObj.callback}({name: 'quanquan', friend: 'guiling'})`);
});

// 启动服务, 监听端口
server.listen(PORT, () => {
  console.log('服务启动成功, 正在监听: ', PORT);
});