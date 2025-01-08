function lengthOfLongestSubstring(s: string): number {
    const set = new Set()
    let maxLength = 0
    let right = 0
    for (let left = 0; left < s.length; left++) {
        set.delete(s[left - 1])
        while (right < s.length && !set.has(s[right])) {
            set.add(s[right])
            right++
        }
        maxLength = Math.max(maxLength, right - left)
    }
    return maxLength
};