const express = require('express');
let app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({port:9000});
wss.on('connection',ws => {
  console.log('server connection')
  ws.on('message',message =>{
    console.log('message',message)
    ws.send('I dont love you')
  })
})
