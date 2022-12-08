const js_beautify = require('js-beautify').js

/**
 * 十六进制色值判断
 * @param {string} color 判断对象
 * @return {boolean} 返回boolean
 */
export function isHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

/**
 * RGBA 色值判断
 * @param {string} color 判断对象
 * @return {boolean} 返回boolean
 */
export function isRgbaColor(color) {
  return /^(rgba|rgb)\(\s?\d{1,3},\s?\d{1,3},\s?\d{1,3}(,\s?(\d|\d\.\d+))?\s?\)$/.test(color)
}

/**
 * 十六进制转rgb
 * @param hex
 * @return {[]}
 */
export function hexToRgb(hex) {
  let color = [], rgb = []
  hex = hex.replace(/#/,"")
  if (hex.length == 3) { // 处理 "#abc" 成 "#aabbcc"
    let tmp = []
    for (let i = 0; i < 3; i++) {
      tmp.push(hex.charAt(i) + hex.charAt(i))
    }
    hex = tmp.join("")
  }
  for (let i = 0; i < 3; i++) {
    color[i] = "0x" + hex.substr(i * 2, 2)
    rgb.push(parseInt(Number(color[i])))
  }
  return rgb
}

/**
 * rgb转16进制
 * @param r
 * @param g
 * @param b
 * @return {string}
 */
export function rgbToHex([r, g, b]) {
  return `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase()
}

/**
 * rgb转hsv
 * @param rgb
 * @return {[number, number, number]}
 */
export function rgbToHsv([r, g, b]) {
  
  let max = Math.max(r, g, b), min = Math.min(r, g, b),
    d = max - min,
    h,
    s = (max === 0 ? 0 : d / max),
    v = max / 255

  switch (max) {
  case min:
    h = 0
    break
  case r:
    h = (g - b) + d * (g < b ? 6: 0)
    h /= 6 * d
    break
  case g:
    h = (b - r) + d * 2
    h /= 6 * d
    break
  case b:
    h = (r - g) + d * 4
    h /= 6 * d
    break
  }

  return [h * 360, s, v]
}

/**
 * hsv转RGB
 * @param h
 * @param s
 * @param v
 * @return {[number, number, number]}
 */
export function hsvToRgb([h, s, v]) {
  h = h === 360 ? 0 : h
  let h1 = Math.floor(h / 60) % 6
  let f = h / 60 - h1
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1 - f) * s)
  let r, g, b
  switch (h1) {
  case 0:
    r = v
    g = t
    b = p
    break
  case 1:
    r = q
    g = v
    b = p
    break
  case 2:
    r = p
    g = v
    b = t
    break
  case 3:
    r = p
    g = q
    b = v
    break
  case 4:
    r = t
    g = p
    b = v
    break
  case 5:
    r = v
    g = p
    b = q
    break
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

/**
 * 判断是否为Number
 * @param obj
 * @return {boolean}
 */
export function isNumber(obj) {
  return typeof obj=== 'number' && !isNaN(obj)
}

/**
 * 判断是否为String
 * @param obj
 * @return {boolean}
 */
export function isString(obj) {
  return obj === obj + ''
}

/**
 * 获取函数体与函数参数
 * @param fn
 * @return {{body: String, params: Array}}
 */
export function getFunctionBodyAndParams(fn) {
  const fnStr = fn.toString()
  
  // 注释
  let COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
  let code = fn.toString().replace(COMMENTS, '')
  
  let result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g)
  let body = fnStr.match(/\)\s*\{([\s\S]*)\}$/)[1]
  // const resArr = []
  // // 去除空白行
  // body.split('\n').forEach(item => {
  //   if (/\S/.test(item)) {
  //     resArr.push(item)
  //   }
  // })
  // // 与第一行对齐
  // const spaceLen = resArr[0].match(/^\s{0,}/)[0].length
  // const reg = new RegExp(`^\\s{${spaceLen}}`)
  return {
    body: js_beautify(body),
    params: result === null ? [] : result
  }
}

/**
 * 格式化json字符串
 * @param json
 * @return {string}
 */
export function formatJson(json) {
  // let formatted = '',     //转换后的json字符串
  //   padIdx = 0,         //换行后是否增减PADDING的标识
  //   PADDING = '    '   //4个空格符
  //
  // if (typeof json !== 'string') {
  //   json = JSON.stringify(json)
  // }
  // // eslint-disable-next-line no-useless-escape
  // json = json.replace(/([\{\}])/g, '\r\n$1\r\n')
  // // eslint-disable-next-line no-useless-escape
  //   .replace(/([\[\]])/g, '\r\n$1\r\n')
  //   // eslint-disable-next-line no-useless-escape
  //   .replace(/(\,)/g, '$1\r\n')
  //   .replace(/(\r\n\r\n)/g, '\r\n')
  //   // eslint-disable-next-line no-useless-escape
  //   .replace(/\r\n\,/g, ',')
  //
  // json.split('\r\n').forEach(function (node) {
  //   let indent = 0,
  //     padding = ''
  //   if (node.match(/\{$/) || node.match(/\[$/)) indent = 1
  //   else if (node.match(/\}/) || node.match(/\]/))  padIdx = padIdx !== 0 ? --padIdx : padIdx
  //   else    indent = 0
  //   for (let i = 0; i < padIdx; i++)    padding += PADDING
  //   formatted += padding + node + '\r\n'
  //   padIdx += indent
  // })
  // console.log(formatted)
  // return  formatted
  return JSON.stringify(json, '\n', 2)
}

/**
 * 根据字符串获取属性值
 * @param obj { a: { b: { c: 1 } } }
 * @param str 'a.b.c'
 * @return {*}
 */
export function getField(obj, str) {
  return str.split('.').reduce((res, cur) => res[cur], obj)
}

/**
 * 格式化为json，Function -> String
 * @param json
 * @return {any}
 */
export function toJson(json) {
  return JSON.parse(JSON.stringify(json,  function(key, val) {
    if (typeof val === 'function') {
      return val + ''
    }
    return val
  }))
}
