/**
 * echarts相关常量
 * @type {{}[]}
 */

// 线条类型
export const LINE_TYPES = [
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点线',
    value: 'dotted'
  },
]

// 标记图形类型
export const SYMBOL_TYPES = [
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '空心圆',
    value: 'emptyCircle'
  },
  {
    label: '方形',
    value: 'rect'
  },
  {
    label: '圆角方形',
    value: 'roundRect'
  },
  {
    label: '三角形',
    value: 'triangle'
  },
  {
    label: '菱形',
    value: 'diamond'
  },
  {
    label: '水滴形',
    value: 'pin'
  },
  {
    label: '箭头形',
    value: 'arrow'
  },
  {
    label: '无',
    value: 'none'
  }
]

// 文本粗细
export const FONT_WEIGHT_TYPES = [
  {
    label: 'normal',
    value: 'normal'
  },
  {
    label: 'bold',
    value: 'bold'
  },
  {
    label: 'bolder',
    value: 'bolder'
  },
  {
    label: 'lighter',
    value: 'lighter'
  },
]

// 视觉映射类型
export const VISUAL_MAP_TYPES = [
  {
    label: '连续型',
    value: 'continuous'
  },
  {
    label: '分段型',
    value: 'piecewise'
  }
]

// visual文本摆放位置
export const VISUAL_TEXT_POSITION = [
  {
    label: '自动决定',
    value: 'auto'
  },
  {
    label: '手柄和文字在右',
    value: 'left'
  },
  {
    label: '手柄和文字在左',
    value: 'right'
  },
  {
    label: '手柄和文字在下',
    value: 'top'
  },
  {
    label: '手柄和文字在上',
    value: 'bottom'
  },
]

// 方向
export const ORIENT_TYPES = [
  {
    label: '水平方向',
    value: 'horizontal'
  },
  {
    label: '竖直方向',
    value: 'vertical'
  }
]

// 图形选中模式
export const SELECTED_MODE = [
  {
    label: '关闭选中',
    value: false,
  },
  {
    label: '多选模式',
    value: 'multiple'
  },
  {
    label: '单选模式',
    value: 'single'
  },
]

// 视图映射选择模式
export const VISUAL_MAP_SELECTED_MODE = [
  {
    label: '多选模式',
    value: 'multiple'
  },
  {
    label: '单选模式',
    value: 'single'
  },
]

// 波纹绘制方式
export const BRUSH_TYPES= [
  {
    label: '填充式',
    value: 'fill'
  },
  {
    label: '描边式',
    value: 'stroke'
  },
]

export const ALIGN_TYPES = [
  {
    label: '居左',
    value: 'left'
  },
  {
    label: '居中',
    value: 'center'
  },
  {
    label: '居右',
    value: 'right'
  }
]

// 轴类型
export const AXIS_TYPES = [
  {
    label: '数值轴',
    value: 'value'
  },
  {
    label:'类目轴',
    value: 'category'
  },
  {
    label:'时间轴',
    value: 'time'
  },
  {
    label:'对数轴',
    value: 'log'
  }
]
