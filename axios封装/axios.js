import Axios from "axios";
import baseURL from "./baseUrl";
import { Toast } from 'vant'
import Utils from '@utils/index.js';
let http ={};

//初始化实例
let instance = Axios.create({
  baseURL,
  timeout:30000,
})
let token = "" ;
let _token = Utils.getUrlParam("token");
// _token = '99b25bb5fb3c3c231da08da0f40c1e9a0091fd891177dddb09b613d9deb9b5071e270135dbabbb40632800e052d17ef5acbebab40cef992e';
sessionStorage.setItem('myOTCToken',_token);
token  = _token || sessionStorage.getItem('myOTCToken');
console.log("token",token)
if(token == 'null' || token == ''){
  Toast({
    message:'帐号信息错误',
    duration:5000
  }) 
}

//添加请求拦截器
instance.interceptors.request.use(config => {
  if(token){
    config.headers = {
      'U-BEE-CASHIER-TOKEN': token,
      'Content-Type': 'application/json'
    }
  }else{
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return config;
}, error => {
  return Promise.reject(error)
})

//添加响应拦截器
instance.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.resolve(error)
})

/**
 * get 请求方法
 * @params url 
 * @params data
 */
http.get = function(url,data={}){
  return new Promise((resolve,reject) => {
    instance.get(url,{ params: data})
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
  })
}

/**
 * post 请求方法
 * @params url 
 * @params data
 */
http.post = function(url, data){
  return new Promise((resolve,reject) => {
    instance.post(url, data)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
  })
}

export default http;
