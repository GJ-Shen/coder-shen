function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0])
    let prev = intervals[0]
    const result = [prev]
    for (let i = 1; i < intervals.length; i++) {
         const curr = intervals[i]
         if (prev[1] >= curr[0]) { // 有重合
             prev[1] = Math.max(prev[1], curr[1])
         } else { // 不重合，推入result，更新prev
             result.push(curr)
             prev = curr
         }
    }
    return result
 };