import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
} from 'echarts/components'
import { MapChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, EffectScatterChart } from 'echarts/charts'
echarts.use([
  GridComponent,
  MapChart,
  CanvasRenderer,
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  UniversalTransition,
  VisualMapComponent,
  GeoComponent,
  EffectScatterChart,
  ScatterChart
])
let defaultMapOption
const getMapOption = (series) => {
  defaultMapOption = {
    visualMap: {
      show: false,
      min: 0, //指定 visualMapContinuous 组件的允许的最小值。
      max: 4, //指定 visualMapContinuous 组件的允许的最大值,
      bottom: '15%',
      right: 20,
      textStyle: {
        color: '#fff',
      },
      inRange: {
        color: ['#013494', '#FF2736'],
      },
      calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
    },
    series
  }
  return defaultMapOption
}

export default {
  getMapOption,
}
