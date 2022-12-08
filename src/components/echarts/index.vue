<template>
  <div
    ref="chart"
    class="chart"
    :style="{ height: height, width: width }"
  ></div>
</template>
<script>
import * as echarts from 'echarts/core'
import { basicOption } from './configure/baseOption'
import { merge,throttle} from 'lodash'
export default {
  name: 'ChartView',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350px',
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartOption: {
      type: Object,
      required: true,
    },
    extraOption: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: 'canvas',
    },
    playHighlight: {
      type: Boolean,
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    isClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
      // 动画定时器
      actionTimer: '',
      timer: null,
      currentIndex: -1,
    }
  },
  watch: {
    chartOption: {
      deep: true,
      handler () {
        this.setOptions(this.assembleOption)
        if (this.playHighlight) {
          /**
            * 解决下钻后返回后自动轮播失败的问题
           */
          this.playHighlightAction()
          this.useEvents()
        }
        if (this.autoPlay) {
          clearInterval(this.timer)
          this.playFrames()
        }
      },
    },
  },
  computed: {
    assembleOption() {
      if (
        Object.prototype.toString.call(this.extraOption) ===
          '[object Object]' &&
        JSON.stringify(this.extraOption) !== '{}'
      ) {
        Object.keys(this.chartOption).forEach((chartKey) => {
          if (
            Object.prototype.toString.call(this.chartOption[chartKey]) ===
              '[object Object]' &&
            JSON.stringify(this.chartOption[chartKey]) !== '{}'
          ) {
            Object.keys(this.extraOption).forEach((extraKey) => {
              if (Object.prototype.hasOwnProperty.call(this.chartOption[chartKey],extraKey)) {
                this.chartOption[chartKey][extraKey] =
                  this.extraOption[extraKey]
              }
            })
          }
        })
      }
      const mergeOption = merge(
        {},
        basicOption,
        this.chartOption,
        this.extraOption
      )

      // if (typeArr.indexOf(mergeOption.series[0]['type']) === -1) {
      //   mergeOption.tooltip.trigger = 'item'
      // } else {
      //   mergeOption.tooltip.trigger = 'axis'
      // }
      return mergeOption
    },
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      window.addEventListener('resize', this.resizeHandler)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    this.chart.dispose()
    this.chart = null

    clearInterval(this.actionTimer)
    this.actionTimer = null
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
   
    // resizeHandler: throttle(() => {
    //   this.chart && this.chart.resize()
    // }, 100),
    resizeHandler () {
      this.chart && this.chart.resize()
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, '', {
        renderer: this.type,
      })
    
      //对地图组件单独进行判断 注册组件前先注册地图控件
      // if (this.chartOption?.series[0]?.type === 'map') {
      //   echarts.registerMap(
      //     this.chartOption.series[0].map,
      //     this.chartOption.features
      //   )
      // }
      this.chartOption &&
        JSON.stringify(this.chartOption) !== '{}' &&
        this.chart.setOption(this.assembleOption)
      this.chart.resize()
      this.isClick?this.chart.on('click', this.handleClick):''

      if (this.playHighlight) {
        this.playHighlightAction()
        this.useEvents()
      }
      if (this.autoPlay) {
        this.playFrames()
      }
    },
    handleClick(params) {
      this.$emit('mapClickHandler', params,this.chart)
    },
    setOptions(option) {
      // this.clearChart()
      this.resizeHandler()
      if (this.chart) {
        this.chart.setOption(option,true)
      }
      
    },
    refresh() {
      this.setOptions(this.chartOption)
    },
    clearChart() {
      this.chart && this.chart.clear()
    },
    playHighlightAction () {
      this.$nextTick(() => {
        if (this.chart) {
        // 停止定时器，清除之前的高亮
          clearInterval(this.actionTimer)
          this.actionTimer = null
          this.actionTimer = setInterval(() => {
            const dataLen = this.chartOption.series[0].data.length
        // 取消之前高亮的图形
        this.chart?.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.currentIndex,
        })
        this.currentIndex = (this.currentIndex + 1) % dataLen
        // 高亮当前图形
        this.chart?.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.currentIndex,
        })
        // 显示tooltip
        this.chart?.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.currentIndex,
        })
          }, 3000)
        }
      })
   
     

    },
    playFrames() {
      this.timer = setInterval(() => {
        // 每次向后滚一个，最后一个从头开始
        if (
          this.assembleOption.dataZoom[0].endValue ==
          this.assembleOption.dataset.source.length - 1
        ) {
          this.assembleOption.dataZoom[0].endValue = 5
          this.assembleOption.dataZoom[0].startValue = 0
        } else {
          this.assembleOption.dataZoom[0].endValue =
            this.assembleOption.dataZoom[0].endValue + 1
          this.assembleOption.dataZoom[0].startValue =
            this.assembleOption.dataZoom[0].startValue + 1
        }
        // this.setOptions(this.assembleOption)
        this.chart.setOption(this.assembleOption)
      }, 4000)
    },
    useEvents () {
      // 鼠标划入
      this.chart.off('mousemove').on('mousemove', (e) => {
        // 停止定时器，清除之前的高亮
        throttle(() => {
          clearInterval(this.actionTimer)
          this.actionTimer = null
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.currentIndex,
          })
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            // name:e.name
            dataIndex:e.dataIndex
          })
          this.chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex:e.dataIndex
          // name:e.name
          })},500)

      })
      // 鼠标划出重新定时器开始
      this.chart.on('mouseout', () => {
        clearInterval(this.actionTimer)
        // this.currentIndex = -1
        this.playHighlightAction()
      })
    }
  },
}
</script>
<style lang="less" scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
