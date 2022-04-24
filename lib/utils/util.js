const ejs = require("ejs")
const path = require("path")


const fs = require("fs")
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

const compile = (template, data) => {
  // 拼接字符串
  const templatePosition = path.resolve(__dirname, `../template/${template}`)
  return new Promise((resolve, reject) => {
    // 传入ejs文件路径，和要传入的data，第三个参数是回调函数，用于获取结果
    ejs.renderFile(templatePosition, data, (err, res) => {
      if (err) {
        console.log(err)
        return
      }
      resolve(res)
    })
  })
}
module.exports = { compile, writeToFile }
