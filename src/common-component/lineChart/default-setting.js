// import echarts from 'echarts'

// title默认设置
export const DEFAULT_BASE_LINE_TITLE_SETTING = [{
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
// legend默认设置
export const DEFAULT_BASE_LINE_LEGEND_SETTING = {
  show: true,
  height: 150,
  width: 150,
  type: 'scroll',
  orient: 'vertical',
  itemGap: 10,
  itemWidth: 10,
  itemHeight: 10,
  icon: 'roundRect',
  
  pageButtonItemGap: 5,
  pageButtonGap: 0,
  pageButtonPosition: 'end',
  pageFormatter: '{current}/{total}',
  pageIconColor: '#ffffff',
  pageIconInactiveColor: '#aaaaaa',
  pageIconSize: 9,
  pageTextStyle: {
    color: '#ffffff',
    fontSize: 12
  },
  
  left: 10,
  top: 'center',
  textStyle: {
    color: '#ffffff',
    fontSize: 12
  }
}
// grid默认设置
export const DEFAULT_BASE_LINE_GRID_SETTING = {
  show: false,
  left: 50,
  top: 80,
  bottom: 50,
  right: 50
}

// xAxis默认设置
// TODO 数据问题
export const DEFAULT_BASE_LINE_X_AXIS_SETTING = [{
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
export const DEFAULT_BASE_LINE_Y_AXIS_SETTING = [{
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
export const DEFAULT_BASE_LINE_TOOLTIP_SETTING = {
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
export const DEFAULT_BASE_LINE_SERIES_SETTING = {
  datasetIndex: 0,
  type: 'line',
  symbol: 'circle',
  symbolSize: 12,
  symbolRotate: 0,
  showSymbol: true,
  showAllSymbol: 'auto',
  connectNulls: true,
  step: false,
  smooth: false,
  label: {
    show: true,
    fontSize: 16,
    color: "#ffffff",
    position: 'top'
  },
  itemStyle: {
    color: '#F0CC5A',
    opacity: 1,
  },
  lineStyle: {
    color: '#F0CC5A',
    width: 2,
    type: 'solid',
    opacity: 1
  },
  areaStyle: {
    // color: new echarts.graphic.LinearGradient(
    //   0, 0, 0, 1,
    //   [
    //     {
    //       offset: 0, color: '#F0CC5A'
    //     },
    //     {
    //       offset: 1, color: 'rgba(255, 255, 255, 0)'
    //     }
    //   ]
    // ),
    color: '#F0CC5A',
    opacity: 0 // 为0不进行绘制
  },
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
}

// dataset默认设置
export const DEFAULT_BASE_LINE_DATASET_SETTING = {
  source: [
      {product: 'Latte', count: 823, score: 95.8},
      {product: 'Tea', count: 235, score: 81.4},
      {product: 'Cocoa', count: 1042, score: 91.2},
      {product: 'Brownie', count: 988, score: 76.9}
  ],
    handleFunction: function (data) {
      // data为原始数据
      // console.log(data)
      return data
    }
}

