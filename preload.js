let fs = require("fs")

let cache = {
  /**
   * 读取data格式文件
   * @param {string} path 文件路径
   * @return 文件内容
   */
  readFileSync(path) {
    if (!this.isData(path) || !fs.existsSync(path)) return ''
    let data = fs.readFileSync(path).toString()
    return data
  },
  /**
   * 缓存文件
   * @param {string} path 文件路径
   * @param {string} data 文件内容
   */
  writeFileSync(path, data) {
    if (!this.isData(path)) return
    fs.writeFileSync(path, data, function (err) {
      if (err) return alert(err);
    })
  },
  /**
   * 创建文件夹
   * @param {string} path 文件夹路径
   */
  mkdirSync(path) {
    try {
      if (!fs.existsSync(path))
        fs.mkdirSync(path, 0777);
    } catch (e) {
      alert(e)
    }

  },
  /**
   * 返回绝对路径
   * @param {string} name 文件夹名称
   */
  getDirname(name) {
    return __dirname;
  },
  /**
   * 清空文件夹下所有文件
   * @param {string} path 文件夹目录
   */
  clear(path) {
    if (fs.existsSync(path)) {
      let fileArr = fs.readdirSync(path)
      fileArr.forEach(function (item, index) {
        // 只删除data文件
        if (this.isData(path)) {
          let curPath = path + "/" + item;
          fs.unlinkSync(curPath)
        }
      });
    }
  },
  /**
   * 仅操作后缀为data的文件，防止误操作
   * @param {string} path 文件路径
   */
  isData(path) {
    if (!path) return false
    let index = path.lastIndexOf('.data')
    return index > -1
  }
}

window.customCache = cache

