const transition = 'all 0.3s ease-in-out'
const Transition = {
  'before-enter' (el) {
    el.style.transition = transition
    if (!el.dataset) el.dataset = {}
    
    el.style.height = 0
  },
  
  'enter' (el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
    } else {
      el.style.height = ''
    }
    
    el.style.overflow = 'hidden'
  },
  
  'after-enter' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },
  
  'before-leave' (el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldOverflow = el.style.overflow
    
    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },
  
  'leave' (el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = transition
      el.style.height = 0
    }
  },
  
  'after-leave' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  }
}

export default {
  name: 'collapseTransition',
  functional: true,
  render (h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}