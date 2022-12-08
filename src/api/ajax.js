import axiosObj from 'axios'
import router from '@/router'
import {removeToken} from '@/utils/auth'
let axios = axiosObj.create()

// 请求拦截器
axios.interceptors.request.use(config => {
  if (!config.url.includes('http://at.alicdn.com/')) {
    const token = window.localStorage.getItem('speedy_view_token')
    token && (config.headers.common['Authorization'] = 'Bearer ' + token)
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use( response => {
  // token过期或验证失败,跳转至登录页
  if (response.data.code === 401) {
    removeToken()
    window.localStorage.setItem('tooltip', 401)
    router.push('/login')
  }
  return response
})

class Axios {
  static async post(url, data, options = {}) {
    return (await axios.post(url, data, options)).data
  }
  static async get(url, data, options = {}) {
    if (data) {
      let params = Object.keys(data).reduce((res, key) => `${res}&${key}=${data[key]}`, '')
      if (url.indexOf('?') < 0) {
        params = params.replace(/^&/, '?')
      }
      url = url + params
    }
    return (await axios.get(url, options)).data
  }
  static async put(url, data) {
    return (await axios.put(url, data)).data
  }
  static async delete(url) {
    return (await axios.delete(url)).data
  }
  // jsonp请求
  static async jsonp(url, data) {
    if (data) {
      let params = Object.keys(data).reduce((res, key) => `${res}&${key}=${data[key]}`, '')
      if (url.indexOf('?') < 0) {
        params = params.replace(/^&/, '?')
      }
      url = url + params
    }
    // 回调函数名
    const callbackName = `SpeedyView_${new Date() - 0}`
    url  = `${url}${url.indexOf('?') < 0 ? '?' : '&'}callback=${callbackName}`
    // 3 动态创建script标签
    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
    return new Promise((resolve, reject) => {
      try {
        // 给window添加一个函数，就相当于全局函数
        window[callbackName] = function (data) {
          // 调用resolve获取数据
          resolve(data)
          // 删除掉添加给window的属性
          delete window[callbackName]
          // 移除 script 标签
          document.head.removeChild(script)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  static async download(url, fileName, type = 'get', data) {
    let result
    if (type === 'get') {
      result = await axios.get(url, {responseType: 'blob'})
    } else if(type === 'post') {
      result = await axios.post(url, data, {responseType: 'blob'})
    }
    const res = result.data
    let blob = new Blob([res], {type: res.type})
    let downloadElement = document.createElement('a')
    downloadElement.style.display = 'none'
    //创建下载的链接
    let href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    //下载后文件名
    downloadElement.download = fileName
    document.body.appendChild(downloadElement)
    //点击下载
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
  }
  // 合并请求
  static mergeRequest(reqs) {
    return Promise.all(reqs.map(async item => {
      try {
        const result = await item
        return result
      } catch (e) {
        return { err: 'error', stack: e }
      }
    }))
  }
}

export default Axios
