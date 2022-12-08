// 数据源ajax,避免访问数据源接口时，本系统的拦截器对其拦截
import axiosObj from "axios"
let axios = axiosObj.create()

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
