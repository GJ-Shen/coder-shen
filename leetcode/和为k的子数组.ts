function subarraySum(nums: number[], k: number): number {
    let count = 0
    let prefixSum = 0
    const map = new Map()
    map.set(0, 1)
    for (let num of nums) {
        prefixSum = prefixSum + num
        if (map.has(prefixSum - k)) {
            count = count + map.get(prefixSum - k)
        }
        map.set(prefixSum, (map.get(prefixSum) ?? 0) + 1)
    }
    return count
}