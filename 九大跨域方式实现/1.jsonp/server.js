let express = require('express');
let app = express();
app.get('/say',function(req,res){
  let {word,callback} = req.query;
  console.log(req)
  console.log(word);
  console.log(callback);
  res.send(`${callback}('我爱你,中国')`)
})
app.listen(3000,()=>{
  console.log('服务启动成功')
})