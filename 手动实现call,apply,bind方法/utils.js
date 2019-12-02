/**
 * 防抖函数
 * @params fn 回调函数
 * @params dealy 延迟执行时间
 */
function debounce(fn, dealy){
  let timer = null;
  return function(){
    var self = this, args = arguments;
    //清除时间
    clearTimeout(timer);
    //在时间段内只调用一次时间处理函数
    timer = setTimeout(function(){
      fn.apply(self,args)
    },dealy)
  }
}


/***************************************************
 * 节流函数
 * @params fn 回调函数
 * @parmas wait 等待时间
 */
 function throttle(fn, wait, mustRunDelay){
    let timer = null;let startTime = null;
    return function(){
      var self = this,args = arguments,currentTime = new Date();
      clearTimeout(timer);
      if(!startTime){
        startTime = currentTime;
      }
      if(currentTime - startTime >= mustRunDelay){
        fn.apply(self,args);
        startTime = currentTime;
      }else{
        setTimeout(function(){
          fn.apply(self,args);
        },wait)
      }
    }
 }

 _throttle = function(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true; 
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

 /***************************************************
  * 对象深拷贝
  * @params origin 拷贝的对象
  * 
  */
 function deepClone(origin){
    let newObj = {};
    for(let key in origin){
      if(typeof origin[key] == 'object'){
        newObj[key] = deepClone(origin[key])
      }else{
        newObj[key] = origin[key];
      }
    }
    return newObj;
 }

 /***************************************************
  * call实现
  * 改变this的指向
  * 传入参数
  */
 Function.prototype.myCall = function(obj,...arg){
    obj._fn_ = this;
    obj._fn_(...arg);
    delete obj._fn_;
 }

 /***************************************************
  * apply实现
  * 改变this的指向
  * 传入参数
  */
 Function.prototype.myApply = function(obj, arr){
   if(obj === null || obj === undefined){
    obj = window;
   }else{
     obj = Object(obj)
   }
  let args = [];
  let val ;
  for(let i = 0; i < arr.length; i++){
    args.push('arr[' + i + ']');
  }
  obj._fn_ = this;
  val = eval('obj._fn_(' + args + ')');
  delete obj._fn_;
  return val;

}

/***************************************************
  * bind实现
  * 改变this的指向
  * 传入参数
  */
 Function.prototype.myBind = function(obj){
  if(obj === null || obj === undefined){
    obj = window;
   }else{
     obj = Object(obj)
   }
   let _this = this;
  let argsArr = [];
  // let arg1 = [];
  // for(let i = 1; i < arguments.length; i++){
  //   arg1.push(arguments[i]);
  //   argsArr.push('arg1[' +( i - 1 )+ ']');
  // }
  return function(){
    let val ;
    for(let i = 1; i < arguments.length; i++){
      argsArr.push('arguments[' + i + ']');
    }
    obj._fn_ = _this;
    val = eval('obj._fn_(' + argsArr + ')');
    delete obj._fn_;
    return val;
  }
}
//柯里化: 就是把接受多个参数的函数变成接受一个单一参数的函数，并且返回接受余下的参数而返回结果的新函数的技术；
//柯里化
Function.prototype.myBind = function (context) {
  let self = this; //此时this指向 test
  let arg = Array.prototype.slice.call(arguments, 1);// 去掉第一个，转换成数组
  return function () {
      let innerArg = Array.prototype.slice.call(arguments);// 此时arguments为传进来的参数，转换成数组
      let totalArg = arg.concat(innerArg); // 拼接bind进来的参数与bind之后调用的参数 作为test的参数
      return self.apply(context, totalArg);
  }
}


/***************************************************
 * 数组扁平化：就是把多维数组变成一维数组
 *  @params arr 数组
 */
function flatten(arr){
  var res = [];
  arr.map(function(item){
    if(Array.isArray(item)){
      res = res.concat(flatten(item))
    }else{
      res.push(item)
    }
  })
  return res;
}

function flatten2 (arr){
  return arr.reduce(function(per, item){
    return per.concat(Array.isArray(item) ? flatten2(item) : item)
  },[])
}

/***************************************************
 * 数组去重
 * @parmas arr 数组
 * 
 */
function only(arr){
  let res = [];
  arr.forEach(function(item){
    if(res.indexOf(item) == -1){
      res.push(item)
    }
  })
  return res;
}

function only2(arr){
  var res = [];
  res = arr.filter(function(item, index, self){
    if(self.indexOf(item) == index){
      return item;
    }
  })
  return res;
}

/*****************************************************
 * 数组的最值
 */

 function extremeValue(arr){
   //1
  //  return Math.max.apply(null,arr);

   //2
  return Math.max.call(null,...arr);
 }

 Array.prototype.Max = function(){
   var max = this[0];
   var len = this.length;
   for(var i = 1; i < len ; i++){
    if(this[i] > max){
      max = this[i];
    }
   }
   return max;
 }