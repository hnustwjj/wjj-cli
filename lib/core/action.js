/**
 * 本文件夹用于创建指令对应的action回调
 */
const { promisify } = require("util")
const path = require("path")

const download = promisify(require("download-git-repo"))
const open = require("open")
const mkdirp = require("mkdirp")

const { vueRepo } = require("../config/repo-config")
const { commandSpawn } = require("../utils/terminal")
const { compile, writeToFile } = require("../utils/util")

//创建项目的action
const createProjectAction = async project => {
  console.log("indexing...")
  try {
    //1.clone项目（下载download-git-repo）
    await download(vueRepo, project)

    //2.执行npm install
    //  2.1，根据电脑系统选择要执行的命令避免报错
    const command = process.platform === "win32" ? "npm.cmd" : "npm"
    await commandSpawn(command, ["install"], { cwd: `./${project}` })

    //3.运行npm run serve
    commandSpawn(command, ["run dev"], { cwd: `./${project}` })
  } catch (error) {
    console.log(error)
  }
}

// 添加pinia store的action
const addStoreAction = async (name, dest) => {
  const res = await compile("store.vue3.ejs", { name })
  //创建对应的文件夹
  mkdirp.sync(dest)
  //写入文件
  writeToFile(path.resolve(dest, name + ".ts"), res)
}

// 添加vue组件的action
const addCpnAction = async (name, dest) => {
  // 1。事先准备ejs模板

  // 2.使用ejs库编译ejs模板获取resule
  const res = await compile("component.vue3.ejs", { name })
  mkdirp.sync(dest)
  // 3.将result写入到对应目录的.vue文件中
  writeToFile(path.resolve(dest, name + ".vue"), res)
}
module.exports = {
  createProjectAction,
  addCpnAction,
  addStoreAction,
}
