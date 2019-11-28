const express = require('express');
const app = express();
let whiteList = ['http://10.0.0.70:4000','http://10.0.0.70:8080'] //设置白名单

let allowCorsDomain = (req,res,next)=>{
  let origin = req.headers.origin
  if(whiteList.includes(origin)){
    //设置那个源可以访问
    res.header('Access-Control-Allow-Origin', origin);
    //设置允许那个方法访问
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //设置携带那个头访问
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //允许携带cookie
    res.header('Access-Control-Allow-Credentials', true);
    //本次预检请求的有效期，单位为秒
    res.header('Access-Control-Max-Age', 6000);
    if(req.method === 'OPTIONS'){
      res.end()
    }
    next();
  }
}
app.use(allowCorsDomain);
app.put('/getInfo',function(req,res){
  console.log(req)
  res.end('你好，世界')
})
app.get('/getInfo',function(req,res){
  res.end({data:'你好，世界'})
})


app.listen(4000,() => {
  console.log('服务启动')
})