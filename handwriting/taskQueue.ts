/*
实现一个 TaskQueue 类,支持添加任务、设置并发数、执行任务队列等功能。

要求:
1. 构造函数接收一个表示最大并发数的参数
2. 有一个 addTask 方法,用于添加任务(函数)到队列
3. 有一个 run 方法,开始执行任务队列
4. 任务执行时遵循先进先出(FIFO)原则
5. 当有任务执行完毕时,如果还有未执行的任务,应立即开始执行新的任务
6. 所有任务执行完毕后,调用传入的回调函数

示例:
const queue = new TaskQueue(2); // 最大并发数为 2

const taskFactory = (id, delay) => () => new Promise(resolve => {
  console.log(`Task ${id} started`);
  setTimeout(() => {
    console.log(`Task ${id} finished`);
    resolve();
  }, delay);
});

queue.addTask(taskFactory(1, 1000));
queue.addTask(taskFactory(2, 500));
queue.addTask(taskFactory(3, 300));
queue.addTask(taskFactory(4, 400));

queue.run(() => {
  console.log('All tasks finished');
});

// 预期输出:
// Task 1 started
// Task 2 started
// Task 2 finished
// Task 3 started
// Task 3 finished
// Task 4 started
// Task 1 finished
// Task 4 finished
// All tasks finished
*/

class TaskQueue {
    constructor(concurrency) {
      // 实现构造函数
      this.tasks = []
      this.max = concurrency
      this.active = 0
    }
  
    addTask(task) {
      // 实现添加任务的方法
      this.tasks.push(task)
      this.all++
    }
  
    run(callback) {
      // 实现运行任务队列的方法
      while (this.active < this.max && this.tasks.length > 0) {
        const task = this.tasks.shift()
        this.active++
        task().then(() => {
            this.active--
            if (this.tasks.length === 0 && this.active === 0) {
                callback()
            } else {
                this.run(callback)
            }
        })
      }
    }
  }

