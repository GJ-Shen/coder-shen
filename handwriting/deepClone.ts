// 关键字： 递归，类型判断
function deepClone (value, cache = new WeakMap()) {
    if (value === null || typeof value !== 'object') {
        return value
    }
    if (value instanceof Date) {
        return new Date(value)
    }
    if (value instanceof RegExp) {
        return new RegExp(value)
    }
    if (cache.has(value)) {
        return cache.get(value)
    }
    const copy = Array.isArray(value) ? []: {}
    cache.set(value, copy)
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            copy[key] = deepClone(value[key], cache)
        }
    }
    return copy
}