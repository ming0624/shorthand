function A(){
  this.x = 100;
  this.getX = function(){
    console.log(this.x)
  }
}

function B(){
  // A.call(this)

  //冒充继承
  // var temp = new A;
  // for(var key in temp){
  //   this[key] = temp[key]
  // }
  // temp = null;

  //混合继承
  // A.call(this)


  //继承组合式继承
  A.call(this)
   
}
 //混合继承
// B.prototype = new A;
// b.prototype.constructor = B;

//继承组合式继承
B.prototype = ObjectCreate(A.prototype)
B.prototype.constructor = B;
function ObjectCreate(o){
  function fn(){};
  fn.prototype = o;
  return new fn;
}



//1 call 继承的方式 把父类的私有的属性方法完全 克隆 一份给给子类 私有
//2 冒充对象继承 就是把父类的 私有和公有  的属性和方法 都克隆一份 给子类 成为 子类的 私有属性和方法
//3 混合模式继承 就是 原型+call
//4 继承组合式继承 
//5 中间类继承法
var b = new B;
b.getX()