import Vue from 'vue'

const components = [
  'Picture',
  'VText',
  'VButton',
  'Group',
  'RectShape',
  'barChart',
]

components.forEach((key) => {
  Vue.component(key, () => import(`@/sample-component/${key}/index.vue`))
})
