/**
 * 节流函数
 * @param fn
 * @param delay
 * @return {Function}
 */

function throttle(fn, delay = 50) {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

export default throttle