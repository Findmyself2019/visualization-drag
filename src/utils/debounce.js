
/**
 * 防抖函数
 * @param fn
 * @param time
 */
function debounce(fn, time = 50) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}


export default debounce