import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/common-component' // 注册自定义组件
import '@/assets/iconfont/iconfont.css'
import '@/plugins/index.js'
Vue.config.productionTip = false

// 引入echarts各图表的默认配置
import chartFn from './components/echarts/index'
Vue.prototype.$chartFn = chartFn
//注册全局的echarts组件
import chartView from './components/echarts/index.vue'
Vue.component('chartView', chartView)
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
