const modulesFiles = require.context('./configure/', true, /index.js$/)
let modules = {}
modulesFiles.keys().forEach(item => {
  modules = Object.assign({}, modules, modulesFiles(item).default)
})
export default modules
