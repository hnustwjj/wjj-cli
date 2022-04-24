#!/usr/bin/env node

const { program } = require("commander")
const helpOptions = require("./lib/core/help")
const createCommands = require("./lib/core/create")
// wjj --version ：查看版本号
program.version(require("./package.json").version)

// 帮助和可选options信息
helpOptions()
// 创建指令
createCommands()

//解析命令行后面跟着的参数
program.parse(process.argv)



//获取<>中对应的参数
//console.log(program.opts())
