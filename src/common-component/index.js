import Vue from 'vue'

const components = [
  'Picture',
  'VText',
  'VButton',
  'Group',
  'RectShape',
]
const echartsComponents = [
  'barChart',
  'lineChart',
]
components.forEach((key) => {
  Vue.component(key, () => import(`@/common-component/${key}/index.vue`))
})
echartsComponents.forEach((key) => {
  Vue.component(key, () => import(`@/sample-component/${key}/index.vue`))
})
