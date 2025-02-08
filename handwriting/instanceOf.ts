function myInstanceOf(obj, constructor) {
  // 获取对象的原型
  let prototype = Object.getPrototypeOf(obj);

  // 一直沿着原型链查找，直到找到构造函数的 prototype 或者 null
  while (prototype !== null) {
    if (prototype === constructor.prototype) {
      return true; // 找到构造函数的 prototype，返回 true
    }
    prototype = Object.getPrototypeOf(prototype); // 继续查找父级原型
  }

  return false; // 没找到，返回 false
}
