import Axios from "@/api/ajax"
import {BASE_API_URL} from "@/api/baseUrl"

const SystemApi = {
  // iconfont远程路径
  getIcons: () => Axios.get('http://at.alicdn.com/t/font_1644243_vl0sgxvt1h8.json'),
  
  // 验证码
  getCaptcha: () => Axios.get(`${BASE_API_URL}/captchas/new?width=130&height=34`),
  sendCodeToEmail: (email, emailType) => Axios.post(`${BASE_API_URL}/captchas/email`, {email, emailType}),
  
  // token
  createToken: data => Axios.post(`${BASE_API_URL}/tokens`, data),
  deleteToken: id => Axios.delete(`${BASE_API_URL}/tokens/${id}`),
  
  // role
  getRoles: data => Axios.get(`${BASE_API_URL}/roles`, data),
  getRolesCount: (data = {roleName: '', roleMark: ''}) => Axios.get(`${BASE_API_URL}/roles/count`, data),
  createRole: role => Axios.post(`${BASE_API_URL}/roles`, role),
  updateRole: (id, role) => Axios.put(`${BASE_API_URL}/roles/${id}`, role),
  deleteRole: id => Axios.delete(`${BASE_API_URL}/roles/${id}`),
  getRoleInfo: id => Axios.get(`${BASE_API_URL}/roles/${id}`),
  
  // menu
  getMenus: data => Axios.get(`${BASE_API_URL}/menus`, data),
  createMenu: menu => Axios.post(`${BASE_API_URL}/menus`, menu),
  getMenusCount: (data = {menuName: ''}) => Axios.get(`${BASE_API_URL}/menus/count`, data),
  getMenuInfo: id => Axios.get(`${BASE_API_URL}/menus/${id}`),
  updateMenu: (id, menu) => Axios.put(`${BASE_API_URL}/menus/${id}`, menu),
  deleteMenu: id => Axios.delete(`${BASE_API_URL}/menus/${id}`),
  
  // user
  getUserInfo: (id) => Axios.get(`${BASE_API_URL}/users/${id}`),
  getUsers: (data = {page: 1, size: 20}) => Axios.get(`${BASE_API_URL}/users`, data),
  createUser: data => Axios.post(`${BASE_API_URL}/users`, data),
  deleteUser: id => Axios.delete(`${BASE_API_URL}/users/${id}`),
  updateUser: (id, user) => Axios.put(`${BASE_API_URL}/users/${id}`, user),
  getUserCount: data => Axios.get(`${BASE_API_URL}/users/count`, data),
  getUserMenu: id => Axios.get(`${BASE_API_URL}/users/${id}/menus`),
  resetPwd: id => Axios.put(`${BASE_API_URL}/users/${id}/password`),
  resetPwdBySelf: (email, data) => Axios.put(`${BASE_API_URL}/users/${email}/selfPassword`, data),
  pwdValidate: (id, data) => Axios.post(`${BASE_API_URL}/users/${id}/pwdValidator`, data),
  searchUser: (keyword, excludeId) => Axios.get(`${BASE_API_URL}/users/search`, {keyword, excludeId}),
  
  // map-json
  createMap: data => Axios.post(`${BASE_API_URL}/maps`, data),
  getMaps: data => Axios.get(`${BASE_API_URL}/maps`, data),
  updateMap: (adcode, data) => Axios.put(`${BASE_API_URL}/maps/${adcode}`, data),
  deleteMap: (adcode) => Axios.delete(`${BASE_API_URL}/maps/${adcode}`),
  downloadMap: adcode => Axios.download(`${BASE_API_URL}/maps/${adcode}/json`, `${adcode}.json`),
  
  // 爬取所有地图数据
  crawlAllMaps: () => Axios.post(`${BASE_API_URL}/maps/all`),
  
  // 爬取某个区域地图数据
  crawlMap: adcode => Axios.post(`${BASE_API_URL}/maps/${adcode}`),
  
  // crawlerLogs
  getCrawlerLogs: (data) => Axios.get(`${BASE_API_URL}/crawlerLogs`, data),
  
  // component-type
  getComponentTypes: (data) => Axios.get(`${BASE_API_URL}/componentTypes`, data),
  getAllComponentTypes: () => Axios.get(`${BASE_API_URL}/componentTypes/all`),
  createComponentType: data => Axios.post(`${BASE_API_URL}/componentTypes`, data),
  deleteComponentType: id => Axios.delete(`${BASE_API_URL}/componentTypes/${id}`),
  getComponentTypeInfo: id => Axios.get(`${BASE_API_URL}/componentTypes/${id}`),
  updateComponentType: (id, data) => Axios.put(`${BASE_API_URL}/componentTypes/${id}`, data),
  
  // components
  createComponent: data => Axios.post(`${BASE_API_URL}/components`, data),
  getAllComponents: data => Axios.get(`${BASE_API_URL}/components/all`, data),
  getComponentsCount: data => Axios.get(`${BASE_API_URL}/components/count`, data),
  getComponents: data => Axios.get(`${BASE_API_URL}/components`, data),
  deleteComponent: id => Axios.delete(`${BASE_API_URL}/components/${id}`),
  updateComponent: (id, data) => Axios.put(`${BASE_API_URL}/components/${id}`, data),
  getComponentInfo: id => Axios.get(`${BASE_API_URL}/components/${id}`),
  downloadSetting: id => Axios.download(`${BASE_API_URL}/components/${id}/setting`, `${id}-setting.json`),
  
  // componentImages
  createComImg: data => Axios.post(`${BASE_API_URL}/componentImages`, data),
  getComImg: data => Axios.get(`${BASE_API_URL}/componentImages`, data),
  updateComImg: (id, data) => Axios.put(`${BASE_API_URL}/componentImages/${id}`, data),
  deleteComImg: id => Axios.delete(`${BASE_API_URL}/componentImages/${id}`),
  getComImgInfo: id => Axios.get(`${BASE_API_URL}/componentImages/${id}`),
  
  // projects
  createProject: data => Axios.post(`${BASE_API_URL}/projects/`, data),
  getProjects: data => Axios.get(`${BASE_API_URL}/projects`, data),
  getProjectInfo: id => Axios.get(`${BASE_API_URL}/projects/${id}`),
  getProjectsCount: ({projectName, excludeId = ''}) => Axios.get(`${BASE_API_URL}/projects/count`, {projectName, excludeId}),
  updateProject: (id, project) => Axios.put(`${BASE_API_URL}/projects/${id}`, project),
  deleteProject: id => Axios.delete(`${BASE_API_URL}/projects/${id}`),
  getAllProjects: data => Axios.get(`${BASE_API_URL}/projects/all`, data),
  
  // pages
  createPage: data => Axios.post(`${BASE_API_URL}/pages`, data),
  getPagesCount: data => Axios.get(`${BASE_API_URL}/pages/count`, data),
  deletePage: id => Axios.delete(`${BASE_API_URL}/pages/${id}`),
  
  // pageTemplates
  createPageTemplate: data => Axios.post(`${BASE_API_URL}/pageTemplates`, data),
  getPageTemplatesCount: data => Axios.get(`${BASE_API_URL}/pageTemplates/count`, data),
  getPageTemplates: data => Axios.get(`${BASE_API_URL}/pageTemplates`, data),
  getAllPageTemplates: () => Axios.get(`${BASE_API_URL}/pageTemplates/all`),
  getPageTemplateInfo: id => Axios.get(`${BASE_API_URL}/pageTemplates/${id}`),
  deletePageTemplate: id => Axios.delete(`${BASE_API_URL}/pageTemplates/${id}`),
  
  // customIframe
  createCustomIframe: data => Axios.post(`${BASE_API_URL}/customIframe`, data),
  updateCustomIframe: (id, data) => Axios.put(`${BASE_API_URL}/customIframe/${id}`, data),
  getCustomIframes: data => Axios.get(`${BASE_API_URL}/customIframe`, data),
  getCustomIframeInfo: (id, data) => Axios.get(`${BASE_API_URL}/customIframe/${id}`, data),
  deleteCustomIframe: id => Axios.delete(`${BASE_API_URL}/customIframe/${id}`),
  
  // catalog
  createCatalog: data => Axios.post(`${BASE_API_URL}/catalogs`, data),
  updateCatalog: (id, data) => Axios.put(`${BASE_API_URL}/catalogs/${id}`, data),
  getCatalogs: data => Axios.get(`${BASE_API_URL}/catalogs`, data),
  getCatalogInfo: id => Axios.get(`${BASE_API_URL}/catalogs/${id}`),
  getCatalogCount: data => Axios.get(`${BASE_API_URL}/catalogs/count`, data),
  deleteCatalog: id => Axios.delete(`${BASE_API_URL}/catalogs/${id}`),
  getTreeCatalogs: () => Axios.get(`${BASE_API_URL}/catalogs/treeCatalogs`),
  
  // doc
  createDocument: data => Axios.post(`${BASE_API_URL}/documents`, data),
  updateDocument: (id, data) => Axios.put(`${BASE_API_URL}/documents/${id}`, data),
  getDocuments: data => Axios.get(`${BASE_API_URL}/documents`, data),
  getDocumentInfo: id => Axios.get(`${BASE_API_URL}/documents/${id}`),
  deleteDocument: id => Axios.delete(`${BASE_API_URL}/documents/${id}`)
}

export default SystemApi
