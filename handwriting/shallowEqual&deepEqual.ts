// 关键字： 递归，类型判断
function shallowEqual(obj1, obj2) {
  // 如果 obj1 或 obj2 是基本类型并且值相同，则直接返回 true
  if (
    (typeof obj1 !== "object" || obj1 === null) &&
    (typeof obj2 !== "object" || obj2 === null)
  ) {
    return obj1 === obj2;
  }

  // 判断对象类型是否一致
  const type1 = Object.prototype.toString.call(obj1);
  const type2 = Object.prototype.toString.call(obj2);
  if (type1 !== type2) return false;

  // 获取对象的所有属性名
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 如果属性数不同，返回 false
  if (keys1.length !== keys2.length) return false;

  // 遍历 keys1 检查每个属性值是否相等
  for (const key of keys1) {
    // 如果 obj2 不包含该属性，或者属性值不同，则返回 false
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function deepEqual(obj1, obj2, seen = new WeakMap()) {
  // 如果 obj1 或 obj2 是基本类型并且值相同，则直接返回 true
  if (
    (typeof obj1 !== "object" || obj1 === null) &&
    (typeof obj2 !== "object" || obj2 === null)
  ) {
    return obj1 === obj2;
  }

  const type1 = Object.prototype.toString.call(obj1);
  const type2 = Object.prototype.toString.call(obj2);
  if (type1 !== type2) return false;

  // 解决循环引用问题
  if (seen.has(obj1)) return seen.get(obj1) === obj2;
  seen.set(obj1, obj2);

  if (type1 === "[object Date]") return obj1.getTime() === obj2.getTime();
  if (type1 === "[object RegExp]") return obj1.toString() === obj2.toString();

  if (type1 === "[object Set]") {
    if (obj1.size !== obj2.size) return false;
    // Set 的直接迭代比较，避免转化为数组
    for (const value of obj1) {
      if (!obj2.has(value)) return false;
    }
    return true;
  }

  if (type1 === "[object Map]") {
    if (obj1.size !== obj2.size) return false;
    // Map的递归比较
    for (const [key, val] of obj1) {
      if (!deepEqual(val, obj2.get(key), seen)) return false;
    }
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key], seen))
      return false;
  }

  return true;
}
