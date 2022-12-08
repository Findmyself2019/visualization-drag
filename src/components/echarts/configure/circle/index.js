import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
  PolarComponent
} from 'echarts/components'
import { PieChart ,BarChart} from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  PieChart,
  BarChart,
  PolarComponent,
  CanvasRenderer,
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  UniversalTransition,
])

let defaultPieOption
const getCircleOption = (options = []) => {
  defaultPieOption = {
    center: ['50%', '50%'],
    radius: ['0%', '75%'],
    labelLine: {
      show: true,
      length: 10,
      length2: 6,
      smooth: false,
      lineStyle: {
        width: 1,
        type: 'solid',
        opacity: 1,
      },
    },
    label: {
      show: true,
      fontSize: 16,
      position: 'outside',
    },
    data: [
      { value: 40, name: 'rose 1' },
      { value: 38, name: 'rose 2' },
      { value: 32, name: 'rose 3' },
      { value: 30, name: 'rose 4' },
      { value: 28, name: 'rose 5' },
      { value: 26, name: 'rose 6' },
      { value: 22, name: 'rose 7' },
      { value: 18, name: 'rose 8' },
    ],
    // encode: {
    //   itemName: 'name',
    //   value: 'value',
    // },
    type: 'pie',
  }

  return {series:options}
}

export default {
  getCircleOption,
}
