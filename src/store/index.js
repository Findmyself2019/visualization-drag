import Vuex from 'vuex'
import Vue from 'vue'
import compose from './compose'
import contextmenu from './contextmenu' //右键菜单
import snapshot from './snapshot' //快照状态管理
import markline from './markline' //标记线
import echartsSetting from './echarts-setting'
Vue.use(Vuex)
const data = {
  state: {
    ...compose.state,
    ...contextmenu.state,
    ...snapshot.state,
    canvasStyleData: {
      // 页面全局数据
      width: '100%',
      height: 940,
      scale: 100,
    },
    curComponent: null,
    curComponentIndex: 0,
    focusCom:[],
    componentData: [], // 画布组件数据
    isClickComponent: false,
    settingPath: 'common-component/page-setting/index.vue', //当前配置路径
  },
  getters: {
    focusComInfo (state) {
      return state.focusCom.reduce((pre, id) => {
        const com = state.componentData.filter(item => item.id === id)[0]
        pre.push(com)
        return pre
      }, [])
    },
  },
  mutations: {
    ...compose.mutations,
    ...contextmenu.mutations,
    ...snapshot.mutations,
    /**
     * 添加组件
     * @param {Object} state 
     * @param {*} param1 
     */
    addComponent (state, { component, index }) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component)
      } else {
        state.componentData.push(component)
      }
    },
    /**
     * 设置当前激活的组件
     * @param {*} state 
     * @param {*} param1 
     */
    setCurComponent (state, { component, index,id}) {
      state.curComponent = component
      state.curComponentIndex = index
      state.focusCom = [id]
      //设置当前配置路径
      this.commit('setCurrentSettingPath', component.settingPath)
      // //设置echarts配置
      const {
        title,
        grid,
        xAxis,
        yAxis,
        polar,
        radiusAxis,
        angleAxis,
        tooltip,
        series,
        dataset,
        color,
        legend,
        visualMap,
        geo,
        data,
        actions,
      } = component.setting
      // 分发echartsSetting的title action
      title && this.dispatch('echartsSetting/setTitle', title, { root: true })

      // 分发echartsSetting的grid action
      grid && this.dispatch('echartsSetting/setGrid', grid, { root: true })

      // 分发echartsSetting的xAxis action
      xAxis && this.dispatch('echartsSetting/setXAxis', xAxis, { root: true })

      // 分发echartsSetting的yAxis action
      yAxis && this.dispatch('echartsSetting/setYAxis', yAxis, { root: true })

      // 分发echartsSetting的polar action
      polar && this.dispatch('echartsSetting/setPolar', polar, { root: true })

      radiusAxis &&
        this.dispatch('echartsSetting/setRadiusAxis', radiusAxis, { root: true })

      angleAxis &&
        this.dispatch('echartsSetting/setAngleAxis', angleAxis, { root: true })

      // 分发echartsSetting的tooltip action
      tooltip && this.dispatch('echartsSetting/setTooltip', tooltip, { root: true })

      // 分发echartsSetting的series action
      series &&
        Object.keys(series).length > 0 &&
        this.dispatch('echartsSetting/setSeries', { series }, { root: true })

      // 分发echartsSetting的dataset action
      dataset && this.dispatch('echartsSetting/setDataset', dataset, { root: true })

      // 分发echartsSetting的color action
      color && this.dispatch('echartsSetting/setColor', { color }, { root: true })

      // 分发echartsSetting的legend action
      legend && this.dispatch('echartsSetting/setLegend', legend, { root: true })

      // 分发echartsSetting的visualMap action
      visualMap &&
        this.dispatch('echartsSetting/setVisualMap', { visualMap }, { root: true })

      // 分发echartsSetting的geo action
      geo && this.dispatch('echartsSetting/setGeo', geo, { root: true })

      // 分发echartsSetting的actions action
      actions && this.dispatch('echartsSetting/setActions', actions, { root: true })

      data && this.dispatch('comDataSetting/initData', data, { root: true })
    },
    setClickComponentStatus (state, status) {
      state.isClickComponent = status
    },
    setComponentData (state, componentData = []) {
      Vue.set(state, 'componentData', componentData)
    },
    setShapeStyle (state, { top, left, width, height, rotate }) {
      if (top) state.curComponent.style.top = top
      if (left) state.curComponent.style.left = left
      if (width) state.curComponent.style.width = width
      if (height) state.curComponent.style.height = height
      if (rotate) state.curComponent.style.rotate = rotate
    },
    setShapeSingleStyle ({ curComponent }, { key, value }) {
      curComponent.style[key] = value
    },
    setCurrentSettingPath (state, path) {
      state.settingPath = path
    },
    /**
     * 更新组件配置信息
     * @param {*} state 
     * @param {*} param1 
     * @returns 
     */
    updateComSetting (state, { key, setting }) {
      // 有key则更新setting的单个字段
      if (key) {
        for (let i = 0; i < state.componentData.length; i++) {
          const item = state.componentData[i]
          if (item.id === state.curComponent.id) {
            if (item.setting == undefined) {
              item.setting = {}
            }
            if (item.setting[key]) {
              item.setting[key] = setting
            } else {
              Vue.set(item.setting, key, setting)
            }
            return
          }
        }
       
       
      } else { // 无key则更新整个setting
        for (let i = 0; i < state.componentData.length; i++) {
          const item = state.componentData[i]
          if (item.id === state.curComponent.id) {
            item.setting = setting
            return
          }
        }
      }
      //   state.pageCom.forEach(item => {
      //   if (item.id === state.focusCom[0]) {
      //     if (item.setting == undefined) {
      //       item.setting = {}
      //     }
      //     if (item.setting[key]) {
      //       item.setting[key] = setting
      //       // Array.isArray(item.setting[key]) ?
      //       //   (item.setting[key] = [...item.setting[key]]) :
      //       //   (item.setting[key] = Object.assign({}, item.setting[key], setting))
      //     } else {
      //       Vue.set(item.setting, key, setting)
      //     }
      //   }
      // })
    },
    /**
     * 设置组件位置信息
     */
    changeComSizeAndPos (state, {id, sizeAndPos}) {
      state.componentData.forEach(item => {
        if (item.id === id) {
          item.style = sizeAndPos
        }
      })
    },
  },
  modules: {
    markline,
    echartsSetting,
  },
}
export default new Vuex.Store(data)
