import {
  DEFAULT_BASE_BAR_TITLE_SETTING,
  DEFAULT_BASE_BAR_GRID_SETTING,
  DEFAULT_BASE_BAR_X_AXIS_SETTING,
  DEFAULT_BASE_BAR_Y_AXIS_SETTING,
  DEFAULT_BASE_BAR_TOOLTIP_SETTING,
  DEFAULT_BASE_BAR_SERIES_SETTING,
  DEFAULT_BASE_BAR_DATASET_SETTING,
  DEFAULT_BASE_BAR_LEGEND_SETTING
} from "@/common-component/barChart/default-setting"
import {
  DEFAULT_BASE_LINE_TITLE_SETTING,
  DEFAULT_BASE_LINE_GRID_SETTING,
  DEFAULT_BASE_LINE_X_AXIS_SETTING,
  DEFAULT_BASE_LINE_Y_AXIS_SETTING,
  DEFAULT_BASE_LINE_TOOLTIP_SETTING,
  DEFAULT_BASE_LINE_SERIES_SETTING,
  DEFAULT_BASE_LINE_DATASET_SETTING,
  DEFAULT_BASE_LINE_LEGEND_SETTING
} from "@/common-component/lineChart/default-setting"
// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
}

// 编辑器左侧组件列表
const list = [
  {
    component: 'v-text',
    label: '文字',
    propValue: '双击编辑文字',
    icon: 'wenben',
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
    },
  },
  {
    component: 'v-button',
    label: '按钮',
    propValue: '按钮',
    icon: 'button',
    style: {
      width: 100,
      height: 34,
      borderWidth: 1,
      borderColor: '',
      borderRadius: '',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      backgroundColor: '',
    },
  },
  {
    component: 'Picture',
    label: '图片',
    icon: 'tupian',
    propValue: require('@/assets/title.jpg'),
    style: {
      width: 300,
      height: 200,
      borderRadius: '',
    },
  },
  {
    component: 'rect-shape',
    label: '矩形',
    icon: 'juxing',
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      verticalAlign: 'middle',
    },
  },
  {
    component: 'barChart',
    label: '柱状图',
    icon: 'button',
    style: {
      width: 470,
      height: 270,
      borderRadius: '',
    },
    settingPath: 'common-component/barChart/index.vue',
    setting: {
      title: DEFAULT_BASE_BAR_TITLE_SETTING,
      grid: DEFAULT_BASE_BAR_GRID_SETTING,
      xAxis: DEFAULT_BASE_BAR_X_AXIS_SETTING,
      yAxis: DEFAULT_BASE_BAR_Y_AXIS_SETTING,
      tooltip: DEFAULT_BASE_BAR_TOOLTIP_SETTING,
      series: [DEFAULT_BASE_BAR_SERIES_SETTING],
      dataset: DEFAULT_BASE_BAR_DATASET_SETTING,
      legend:DEFAULT_BASE_BAR_LEGEND_SETTING
    },
    defaultSize: {
      width: 470,
      height: 270
    }
  },
  {
    component: 'lineChart',
    label: '折线图',
    icon: 'button',
    style: {
      width: 300,
      height: 200,
      borderRadius: '',
    },
    settingPath: 'common-component/lineChart/index.vue',
    setting: { 
      title: DEFAULT_BASE_LINE_TITLE_SETTING,
      grid: DEFAULT_BASE_LINE_GRID_SETTING,
      xAxis: DEFAULT_BASE_LINE_X_AXIS_SETTING,
      yAxis: DEFAULT_BASE_LINE_Y_AXIS_SETTING,
      tooltip: DEFAULT_BASE_LINE_TOOLTIP_SETTING,
      series: [DEFAULT_BASE_LINE_SERIES_SETTING],
      dataset: DEFAULT_BASE_LINE_DATASET_SETTING,
      legend:DEFAULT_BASE_LINE_LEGEND_SETTING
    },
    defaultSize: {
      width: 470,
      height: 270
    }
  }
]
for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style }
  list[i] = { ...commonAttr, ...item }
}
export default list
