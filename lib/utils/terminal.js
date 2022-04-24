/**
 * 封装执行终端命令相关的代码
 */

// swap会开启子进程，是从node内置的库中导出的
// http://nodejs.cn/api/child_process.html#child_processspawncommand-args-options
// 第一个参数是要执行的命令
// 第二个参数是args数组
// 第三个参数是一个对象，其中cwd属性用于指定进程执行在哪个目录下 
const { spawn } = require("child_process")
const commandSpawn = (command, args, options) => {
  return new Promise((resolve, reject) => {
    //开启并且获取这个新建的进程
    //在这个进程中会有很多执行过程中的打印信息
    //我们希望将进程中的这些信息打印到主进程中
    const child_process = spawn(command, args, options)

    //进程有一个stdout输出流，通过pipe函数将子进程的输出流传输到当前进程process（全局的中
    child_process.stdout.pipe(process.stdout)
    child_process.stderr.pipe(process.stderr)
    //监听子进程的结束事件
    child_process.on("close", () => {
      resolve()
    })
  })
}
module.exports = {
  commandSpawn,
}
