import {mapState, mapActions} from "vuex"
import _ from 'lodash'

// ehcarts series响应式配置混合对象，作用于echarts-line、echarts-bar等组件
const EchartsSeriesRespondMixins = {
  computed: {
    ...mapState('workbench', [
      'seriesIndex'
    ]),
    ...mapState('echartsSetting', [
      'series'
    ]),
    curSeries() {
      return this.series[this.seriesIndex]
    }
  },
  watch: {
    series: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          key: 'series',
          setting
        })
      }
    }
  },
  methods: {
    ...mapActions('pageComList', [
      'changeComSetting'
    ]),
    // 添加系列
    addSeries() {
      // 此处复制系列中的最后一个系列：barGap、barCategoryGap某些属性是以最后一个系列的值为准的
      this.series.push(_.cloneDeep(this.series[this.series.length - 1]))
    },
    // 删除系列
    removeSeries(index) {
      this.series.splice(index, 1)
    }
  }
}

export default EchartsSeriesRespondMixins
