function flat (arr) {
    const result: any[] = []
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            return result.push(...flat(item))
        } else {
            return result.push(item)
        }
    })
    return result
}
