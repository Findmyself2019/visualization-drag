import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  UniversalTransition,
])
let defaultBarOption
const getBarOption = (option,isDataZoom = false,direction='x') => {
  defaultBarOption = {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff', //坐标轴的颜色
      },
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#93BAD6',
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      nameLocation: 'end',
    },
    yAxis: {
      type: 'value',
      splitLine: {
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        color: '#93BAD6',
      },
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: '5%',
      top: '10%',
      right: '5%',
      bottom:'5%'
    },
    series: [],
  }
  const dataZoomX = [
    {
      xAxisIndex: 0, // 这里是从X轴的0刻度开始
      show: false, // 是否显示滑动条，不影响使用
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      startValue: 0, // 从头开始。
      endValue: 9, // 一次性展示9个。
    },
    {
      type: 'inside',
      start: 0,
      end: 90,
      startValue: 0,
      endValue: 5,
      minValueSpan: 2,
      maxValueSpan: 2,
      xAxisIndex: [0],
      zoomOnMouseWheel: false, // 关闭滚轮缩放
      moveOnMouseWheel: true, // 开启滚轮平移
      moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
    },
    {
      type: 'slider',
      show:false,
      realtime: true,
      start: 0,
      end: 100,
      startValue: 0,
      endValue: 5,
      width: 0,
      height: '80%',
      xAxisIndex: [0], // 控制y轴滚动
      fillerColor: 'rgba(154, 181, 215, 1)', // 滚动条颜色
      borderColor: 'rgba(17, 100, 210, 0.12)',
      backgroundColor: '#cfcfcf', //两边未选中的滑动条区域的颜色
      handleSize: 0, // 两边手柄尺寸
      showDataShadow: false, //是否显示数据阴影 默认auto
      showDetail: false, // 拖拽时是否展示滚动条两侧的文字
      top: '10%',
      right: '5',
    },
  ]
  const dataZoomY = [
    {
      yAxisIndex: 0, // 这里是从X轴的0刻度开始
      show: false, // 是否显示滑动条，不影响使用
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      startValue: 0, // 从头开始。
      endValue: 6, // 一次性展示9个。
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
      show:false,
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
  ]
  // if (isDataZoom) defaultBarOption = 
  
  // defaultBarOption.series = seriesData.reduce((pre, cur) => {
  //   pre.push(Object.assign(JSON.parse(JSON.stringify(seriesInstance)), cur))
  //   return pre
  // }, [])
  const assginOption = Object.assign(defaultBarOption, option)
  if (isDataZoom) {

    assginOption.dataZoom = direction === 'x'?dataZoomX:dataZoomY
  }
  
  return assginOption
}

export default {
  getBarOption,
}
