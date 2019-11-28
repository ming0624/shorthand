const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.listen(8090,()=>{
  console.log('a服务已启动')
})