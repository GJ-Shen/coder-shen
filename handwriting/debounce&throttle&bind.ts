function debounce (func, delay) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    } 
}

function throttle (func, interval) {
    let lastTime = Date.now()
    return function (...args) {
        const now = Date.now()
        if (now - lastTime > interval) {
            func.apply(this, args)
            lastTime = now
        }
    }
}

Function.prototype.myBind = function (context, ...args) {
    const func = this
    return function (...newArgs) {
        return func.apply(context, [...args, ...newArgs])
    }
}