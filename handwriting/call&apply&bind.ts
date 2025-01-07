Function.prototype.call = function (ctx, ...args) {
    // 重写上下文
    ctx = (ctx === null || ctx === undefined) ? window : Object(ctx)
    // 使用 symbol 防止和其他属性重复
    const key = Symbol()
    ctx[key] = this
     // 通过对象属性方式调用函数，使得被调用函数的 this 指向 ctx
    const result = ctx[key](...args)
    delete ctx[key]
    return result
}

Function.prototype.apply = function (ctx, args = []) {
    if (!Array.isArray(args)) {
        throw new Error ('args must be a array')
    }
    ctx = (ctx === null || ctx === undefined) ? window : Object(ctx)
    // 使用 symbol 防止和其他属性重复
    const key = Symbol()
    ctx[key] = this
     // 通过对象属性方式调用函数，使得被调用函数的 this 指向 ctx
    const result = ctx[key](...args)
    delete ctx[key]
    return result
}

Function.prototype.bind = function (ctx, ...args) {
    const fn = this
    return function (...restArgs) {
        const key = Symbol()
        ctx[key] = fn
        const result = ctx[key](...restArgs, ...args)
        delete ctx[key]
        return result
    }
}