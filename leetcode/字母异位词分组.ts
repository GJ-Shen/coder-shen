function groupAnagrams (strs: string[]) {
    const map = new Map()
    const result: string[][] = []
    for (const str of strs) {
        const key = str.split('').sort().join() 
        if (map.has(key)) {
            map.set(key, map.get(key).concat(str))
        } else {
            map.set(key, [str])
        }
    }
    map.forEach((value: string[]) => result.push(value))
    return result
}