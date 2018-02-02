Math.getArray=function(num){
  var arr=[];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }
  return arr;
}
Math.getArrayObject=function(num,nameFunc,valueFunc){
  var obj={};
  for (var i = 0; i < num; i++) {
    obj[nameFunc(i)]=valueFunc(i);
  }
  return obj;
}
