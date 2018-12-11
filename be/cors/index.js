const http = require('http');

const PORT = 8888;

// 协议名必填, 如果同时存在 http 和 https 就写两条s
const allowOrigin = ['http://127.0.0.1:8080', 'http://localhost:8080', 'https://www.baidu.com'];

// 创建一个 http 服务
const server = http.createServer((request, response) => {
  const { method, headers: { origin, cookie } } = request;
  if (allowOrigin.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  response.setHeader('Access-Control-Allow-Methods', 'PUT');
  // 允许前端请求携带 Cookie
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Headers', 'token');
  if (method === 'OPTIONS') {
    console.log('预检请求');
  } else if (!cookie) {
    //  如果不存在 Cookie 就设置 Cookie
    response.setHeader('Set-Cookie', 'yuanwill=fe');
  }
  // 给前端添加一个token
  response.setHeader('token', 'yuanwill');
  response.setHeader('Access-Control-Expose-Headers', 'token');
  response.end("{name: 'yuanwill', friend: 'shenzhen'}");
});

// 启动服务, 监听端口
server.listen(PORT, () => {
  console.log('服务启动成功, 正在监听: ', PORT);
});