// const http = require('http');
// let server = http.createServer((req,res) => {
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Headers','Content-type');
//   res.setHeader('Access-Control-Allow-Methods','*');
//   res.setHeader('Content-type','application/json');
//   res.end(JSON.stringify({
//     data:{
//       msg:'I love you'
//     },
//     status:'ok'
//   }))
// })
// server.listen(9000,() => {
//   console.log('服务启动')
// })

//方式二 express cors
const express = require('express');
const cors = require('cors');
let app = express();

// app.use(cors());
// app.get('/products/:id',cors(),function(req,res,nex){
//   res.json(JSON.stringify({msg:'跨域请求的单个路由1'}))
// })

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.get('/products/:id',function(req,res,nex){
  res.json(JSON.stringify({msg:'跨域请求的单个路由2'}))
})

app.listen(9000,() => {
  console.log('Express app server listening on port %d');
})