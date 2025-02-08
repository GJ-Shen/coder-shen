// 关键字：各方法返回this
class Calculator {
    value: number
    constructor (value) {
        this.value = value
    }

    add(num) {
        this.value += num
        return this
    }

    decrease(num) {
        this.value -= num
        return this
    }

    times(num) {
        this.value *= num
        return this
    }

    divide(num) {
        this.value /= num
        return this
    }

    getValue() {
        return this.value
    }
}

function calculator (value: number) {
    return {
        add (num) {
            value += num
            return this
        },
    
        decrease (num) {
            value -= num
            return this
        },
    
        times (num) {
            value *= num
            return this
        },
    
        divide (num) {
            value /= num
            return this
        },
    
        getValue () {
            return value
                    }
    }
}