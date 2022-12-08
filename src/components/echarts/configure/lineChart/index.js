import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  UniversalTransition,
])
let seriesInstance = {
  name: '',
  stack: '',
  // data: item.ydata,
  label: {
    normal: {
      show: true,
      position: 'top',
    },
  },
  lineStyle: {
    width: 2,
    type: 'solid',
  },
  itemStyle: {
    normal: {
      color: '',
      barBorderRadius: false,
      label: {
        show: true,
        color: '#fff',
        // position: 'insideRight',
      },
      // borderColor: color, //图形的描边颜色
      // lineStyle: {
      //   color: color,
      //   width: 2
      // }
    },
  },
  encode: {
    y: '',
    x: '',
  },
  step: false,
  smooth: false,
  smoothMonotone: null,
  symbol: '',
  symbolSize: 4,
  symbolRotate: null,
  showSymbol: true,
  showAllSymbol: 'auto',
  connectNulls: false,
  sampling: 'none',
  animationEasing: 'linear',
  progressive: 0,
  hoverLayerThreshold: null,
  type: 'line',
  xAxisIndex: 0,
  yAxisIndex: 0,
}
let defaultLineOption
const getLineOption = (options = {}) => {
  defaultLineOption = {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff', //坐标轴的颜色
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: '#93BAD6',
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      nameLocation: 'end',
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          width: '0',
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          // 使用深浅的间隔色
          color: [],
        },
      },
      axisLabel: {
        color: '#93BAD6',
      },
      axisTick: {
        show: false,
      },
    },
    series: [],
  }
  const dataZoom = {
    dataZoom: [
      {
        yAxisIndex: 0, // 这里是从X轴的0刻度开始
        show: false, // 是否显示滑动条，不影响使用
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        startValue: 0, // 从头开始。
        endValue: 5, // 一次性展示9个。
      },
      {
        type: 'inside',
        start: 0,
        end: 90,
        startValue: 0,
        endValue: 5,
        minValueSpan: 2,
        maxValueSpan: 2,
        yAxisIndex: [0],
        zoomOnMouseWheel: false, // 关闭滚轮缩放
        moveOnMouseWheel: true, // 开启滚轮平移
        moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
      },
      {
        type: 'slider',
        realtime: true,
        start: 0,
        end: 100,
        startValue: 0,
        endValue: 5,
        width: 0,
        height: '80%',
        yAxisIndex: [0], // 控制y轴滚动
        fillerColor: 'rgba(154, 181, 215, 1)', // 滚动条颜色
        borderColor: 'rgba(17, 100, 210, 0.12)',
        backgroundColor: '#cfcfcf', //两边未选中的滑动条区域的颜色
        handleSize: 0, // 两边手柄尺寸
        showDataShadow: false, //是否显示数据阴影 默认auto
        showDetail: false, // 拖拽时是否展示滚动条两侧的文字
        top: '10%',
        right: '5',
      },
    ],
  }
  // if (isDataZoom) defaultLineOption = Object.assign(defaultLineOption, dataZoom)

  return Object.assign(defaultLineOption, options)
}

export default {
  getLineOption,
}
