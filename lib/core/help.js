const { program } = require("commander")
const help = () => {
  // 增加自己的option
  program.option("-w --wjj", "a wjj cli")

  //指定输入的参数
  program.option("-d --dest <dest>", "for example:wjj -d /src/components")
  program.option("-f --framework <framework>", "your frame work")
}
module.exports = help
