function multiRequest (urls, max) {
    const total = urls.length
    const results = new Array(total).fill(null)
    // 正在执行的请求数
    let activeCount = 0
    // 已处理的请求数
    let resolveCount = 0
    return new Promise ((resolve, reject) => {
        const run = () => {
            if (resolveCount >= total && activeCount === 0) {
                return resolve(results)
            }
            while (resolveCount < total && activeCount < max) {
                const current = resolveCount++
                activeCount++

                fetch(urls[current])
                .then((response) => response.json())
                .then((data) => { 
                    results[current] = data
                })
                .catch((err) => {
                    results[current] = err
                })
                .finally(() => {
                    // 递归调用run检查是否可以启动下一个请求
                    activeCount--
                    run()
                })
            }
        }
        run()
    })
}