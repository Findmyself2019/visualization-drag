// title默认设置
export const DEFAULT_BASE_BAR_TITLE_SETTING = [{
  show: true,
  text: '标题',
  subtext: '副标题',
  textStyle: {
    color: '#ffffff',
    fontSize: 20,
    textShadowColor: 'rgba(255, 255, 255, 0)',
    textShadowBlur: 5
  },
  subtextStyle: {
    color: '#cfcfcf',
    fontSize: 14,
    textShadowColor: 'rgba(255, 255, 255, 0)',
    textShadowBlur: 5
  },
  itemGap: 10,
  top: 10,
  left: 'center'
}]

// grid默认设置
export const DEFAULT_BASE_BAR_GRID_SETTING = {
  show: false,
  left: 50,
  top: 80,
  bottom: 50,
  right: 50
}

// xAxis默认设置
export const DEFAULT_BASE_BAR_X_AXIS_SETTING = [{
  show: true,
  type: 'category',
  name: 'x轴',
  nameTextStyle: {
    color: '#ffffff',
    fontSize: 16,
    align: "center"
  },
  boundaryGap: true,
  nameGap: 20,
  nameRotate: 0,
  axisLine: {
    show: false,
    lineStyle: {
      width: 1,
      color: '#ffffff',
      type: 'solid'
    }
  },
  axisTick: {
    show: false,
    alignWithLabel: true,
    length: 5,
    lineStyle: {
      color: '#ffffff',
      width: 1,
      type: 'solid'
    }
  },
  axisLabel: {
    show: true,
    rotate: 0,
    margin: 5,
    color: '#ffffff',
    fontSize: 16,
    showMinLabel: null,
    showMaxLabel: null
  },
  splitLine: {
    show: false,
    lineStyle: {
      type: 'solid',
      color: '#ffffff',
      width: 1
    }
  },
  axisPointer: {
    show: true,
    type: 'shadow',
    label: {
      show: false,
      color: '#000000',
      fontSize: 16,
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
      borderWidth: 0
    }
  },
}]

// yAxis默认设置
export const DEFAULT_BASE_BAR_Y_AXIS_SETTING = [{
  show: true,
  type: 'value',
  name: 'y轴',
  nameTextStyle: {
    color: '#ffffff',
    fontSize: 16,
    align: 'center'
  },
  boundaryGap: true,
  nameGap: 20,
  nameRotate: 0,
  axisLine: {
    show: false,
    lineStyle: {
      width: 1,
      color: '#ffffff',
      type: 'solid'
    }
  },
  axisTick: {
    show: false,
    alignWithLabel: true,
    length: 5,
    lineStyle: {
      color: '#ffffff',
      width: 1,
      type: 'solid'
    }
  },
  axisLabel: {
    show: true,
    rotate: 0,
    margin: 5,
    color: '#ffffff',
    fontSize: 16,
    showMinLabel: null,
    showMaxLabel: null
  },
  splitLine: {
    show: false,
    lineStyle: {
      type: 'solid',
      color: '#ffffff',
      width: 1
    }
  },
}]

// tooltip默认配置
export const DEFAULT_BASE_BAR_TOOLTIP_SETTING = {
  show: true,
  trigger: 'axis',
  backgroundColor: 'rgba(50, 50, 50, 0.7)',
  padding: [5, 10, 5, 10],
  textStyle: {
    color: '#ffffff',
    fontSize: 14
  },
  axisPointer: {
    type: 'shadow',
    label: {
      show: true,
      color: '#000000',
      fontSize: 16,
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
      borderWidth: 0
    },
    lineStyle: {
      type: 'solid',
      color: '#ffffff',
      width: 1
    },
    shadowStyle: {
      color: 'rgba(150,150,150,0.3)'
    },
    crossStyle: {
      type: 'dashed',
      color: '#555555',
      width: 1
    }
  },
}

// series默认设置
export const DEFAULT_BASE_BAR_SERIES_SETTING = {
  datasetIndex: 0,
  label: {
    show: true,
    fontSize: 16,
    color: "#ffffff",
    position: 'top',
  },
  itemStyle: {
    color: '#F0CC5A',
    opacity: 1,
    barBorderRadius: [0, 0, 0, 0]
  },
  barWidth: 'auto',
  barMinHeight: 0,
  markPoint: {
    data: []
  },
  markLine: {
    data: []
  },
  encode: {
    x: 'product',
    y: 'score',
  },
  type: 'bar'
}

// dataset默认设置
export const DEFAULT_BASE_BAR_DATASET_SETTING = {
  source:  [
      {product: 'Latte', count: 823, score: 95.8},
      {product: 'Tea', count: 235, score: 81.4},
      {product: 'Cocoa', count: 1042, score: 91.2},
      {product: 'Brownie', count: 988, score: 76.9}
    ],
}
