import Axios from "@/api/ajax"
import Axios2 from "@/api/data-ajax"
import {BASE_API_URL} from "@/api/baseUrl"


const WorkbenchApi = {
  // 上传
  upload: data => Axios.post(`${BASE_API_URL}/files`, data),
  // 地图json接口（含子区域）
  getMapJsonOfAll: code => Axios.get(`${BASE_API_URL}/maps/${code}`),
  // 区域列表接口
  getAllAreaInfo: () => Axios.get(`${BASE_API_URL}/maps/areas`),
  // 获取echarts数据接口
  getData: (data) => Axios2.post(`${BASE_API_URL}/apiResult`, data),
  // 左侧菜单
  getComponentTypeIncludeComponent: () => Axios.get(`${BASE_API_URL}/componentTypes/components`),
  // 图片类型组件中图片列表
  getImagesOfImageCom: type => Axios.get(`${BASE_API_URL}/componentImages/all`, {type}),
  // 页面配置详情
  getPageInfo: id => Axios.get(`${BASE_API_URL}/pages/${id}`),
  // 页面配置详情（需要分享码）
  getPageInfoByShareCode: (id, data) => Axios.get(`${BASE_API_URL}/pages/${id}/shareCode`, data),
  // 保存页面配置相关信息
  savePageSetting: (id, data) => Axios.put(`${BASE_API_URL}/pages/${id}`, data),
  // 保存模板页面配置
  saveTemplateSetting: (id, data) => Axios.put(`${BASE_API_URL}/pageTemplates/${id}`, data),
  // 导出页面
  exportPage: id => Axios.download(`${BASE_API_URL}/pages/export/${id}`, 'page.zip'),
  // 导出模板页面
  exportPageTemplate: id => Axios.download(`${BASE_API_URL}/pageTemplates/export/${id}`, 'pageTemplate.zip'),
  // 页面状态
  getPageStatus: id => Axios.get(`${BASE_API_URL}/pages/${id}/status`),
  // 分享码验证
  validateShareCode: (id, shareCode) => Axios.get(`${BASE_API_URL}/pages/${id}/validate`, {shareCode}),
  // 获取页面数据源信息
  getPageDataSource: id => Axios.get(`${BASE_API_URL}/pages/${id}/dataSource`),
  // 添加数据源
  addDataSource: data => Axios.post(`${BASE_API_URL}/dataSource`, data),
  // 数据源数量
  getDataSourceCount: data => Axios.get(`${BASE_API_URL}/dataSource/count`, data),
  // 数据源详情
  getDataSourceInfo: id => Axios.get(`${BASE_API_URL}/dataSource/${id}`),
  // 删除数据源
  deleteDataSource: id => Axios.delete(`${BASE_API_URL}/dataSource/${id}`),
  // 修改数据源
  updateDataSource: (id, data) => Axios.put(`${BASE_API_URL}/dataSource/${id}`, data),
  // 导出页面中组件配置
  exportPageComponentSetting: (pageId, comId, setting) => Axios.download(`${BASE_API_URL}/pages/${pageId}/components/${comId}/setting`, `${comId}.json`, 'post', {setting}),
  // 导出模板页面中组件配置
  exportPageTemplateComponentSetting: (pageId, comId, setting) => Axios.download(`${BASE_API_URL}/pageTemplates/${pageId}/components/${comId}/setting`, `${comId}.json`, 'post', {setting})
}

export default WorkbenchApi
