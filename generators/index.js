const componentGenerrator = require('./component/index.js')
const pageGenerrator = require('./page/index.js')

module.exports = plop => {
  plop.setWelcomeMessage('欢迎使用~ 请选择需要创建的模版：')
  plop.setGenerator('component', componentGenerrator)
  plop.setGenerator('page', pageGenerrator)
}
