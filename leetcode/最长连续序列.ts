function longestConsecutive (nums: number[]) {
    let longestStreak = 0
    const set = new Set(nums)
    for (const num of set) {
        if (!set.has(num - 1)) {
            let currentNum = num
            let currentStreak = 1
            while (set.has(currentNum + 1)) {
                currentNum = currentNum + 1
                currentStreak++
            }
            longestStreak = Math.max(longestStreak, currentStreak)
        }
    }
    return longestStreak
}