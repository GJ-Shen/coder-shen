class MyPromise {
    private state: string
    private result: string
    private onFulFilledCb: Function[]
    private onRejectedCb: Function[]
    constructor(executor: Function) {
        this.state = 'pending'
        this.onFulFilledCb = []
        this.onRejectedCb = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value: string) {
        if (this.state !== 'pending') return
        this.state = 'fulfilled'
        this.result = value
        this.onFulFilledCb.forEach((callback) => callback(value))
    }

    reject(reason: string) {
        if (this.state !== 'pending') return
        this.state = 'rejected'
        this.result = reason
        this.onRejectedCb.forEach((callback) => callback(reason))
    }

    then(onFulFilled: any, onRejected?: any) {
        const promise2 = new MyPromise((resolve: Function, reject: Function) => {
            const handleFulFilled = () => setTimeout(() => {
                try {
                    if (typeof onFulFilled === 'function') {
                        const x = onFulFilled(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } else {
                        resolve(this.result)
                    }
                } catch (e) {
                    reject(e)
                }
            })
            const handleRejected = () => setTimeout(() => {
                try {
                    if (typeof onRejected === 'function') {
                        const x = onRejected(this.result)
                        resolvePromise(promise2, x, resolve, reject)
                    } else {
                        reject(this.result)
                    }
                } catch (e) {
                    reject(e)
                }
            })
            if (this.state === 'fulfilled') {
                handleFulFilled()
            } else if (this.state === 'rejected') {
                handleRejected()
            }
            else if (this.state === 'pending') {
                this.onFulFilledCb.push(handleFulFilled)
                this.onRejectedCb.push(handleRejected)
            }
        })
        return promise2
    }

    catch (onRejected: Function) {
        return this.then(null, onRejected)
    }

    finally (callback: Function) {
        return this.then(callback, callback)
    }

    static resolve (value) {
        if (value instanceof MyPromise) {
            return value
        } else if (value && typeof value === 'object' && typeof value?.then === 'function') {
            return new MyPromise((resolve, reject) => value.then(resolve, reject))
        } else {
            return new MyPromise((resolve) => resolve(value))
        }
    }

    static all (promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject (new TypeError('Argument must be an array'))
            }
            if (promises.length) {
                return resolve(promises)
            }
            const results: any[] = []
            let completed = 0
            promises.forEach((promise, index) => {
                    Promise.resolve(promise).then(
                    (value) => {
                        results[index] = value
                        completed++
                        if (promises.length === completed) {
                            resolve(results)
                        }
                    },
                    (reason) => {
                        reject(reason)
                    }
                )
            })
        })
    }

    static race (promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject (new TypeError('Argument must be an array'))
            }
            promises.forEach((promise) => {
                    Promise.resolve(promise).then(resolve, reject)
            })
        })
    }
}

function resolvePromise(promise: MyPromise, x: any, resolve: Function, reject: Function) {
    if (promise === x) {
        throw new TypeError('循环引用')
    } else if (x instanceof MyPromise) {
        x.then((y) => resolvePromise(promise, y, resolve, reject))
    } else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        let then: any
        try {
            then = x.then
        } catch (e) {
            return reject(e)
        }
        if (typeof then === 'function') {
            let called = false
            then.call(
                x,
                (y) => {
                    if (called) return
                    called = true
                    resolvePromise(promise, y, resolve, reject)
                },
                (r) => {
                    if (called) return
                    called = true
                    reject(r)
                })
        }
    } else {
        return resolve(x)
    }
}