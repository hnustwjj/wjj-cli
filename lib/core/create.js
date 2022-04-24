/**
 * 本文件夹用于创建指令
 */
const { program } = require("commander")
const {
  createProjectAction,
  addCpnAction,
  addStoreAction,
} = require("./action")
const createCommands = () => {
  program
    .command("test <project> [a...]") //参数：(nameAndArgs: string, opts?: CommandOptions)
    .description("test")
    //回调函数，会获取到command指令中传入的数据
    .action((project, others) => {
      // project：<>内部指定的内容
      // others：[...]的内容,...是多个可选参数
      console.log(project, others)
    })

  program
    .command("create <project>")
    .description("clone repo into a folder")
    .action(createProjectAction)
  // TODO:addcpn
  program
    .command("addcpn <name>")
    .description("add vue components，例如wjj addcpn demo [-d src/demo] ")
    .action(name => {
      addCpnAction(name, program.opts().dest || "src/components")
    })
  // TODO:addpage
  program
    .command("addstore <name>")
    .description("add pinia stores,例如 addstore demo [-d src/demo] ")
    .action(name => {
      addStoreAction(name, program.opts().dest || "src/stores")
    })
}
module.exports = createCommands
