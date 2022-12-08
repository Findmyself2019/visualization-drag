
// title默认设置
export const DEFAULT_BASE_MAP_TITLE_SETTING = {
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
  left: 'center',
}

// tooltip默认配置
export const DEFAULT_BASE_MAP_TOOLTIP_SETTING = {
  show: true,
  trigger: 'item',
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

// geo默认配置
export const DEFAULT_BASE_MAP_GEO_SETTING = {
  map: 100000,
  roam: false,
  aspectScale: 0.75,
  zoom: 1,
  scaleLimit: {
    max: 5,
    min: 0.5
  },
  selectedMode: 'multiple',
  label: {
    show: false,
    color: '#ffffff',
    fontSize: 12
  },
  itemStyle: {
    areaColor: '#2273d5',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderType: 'solid',
    shadowBlur: 8,
    shadowColor: 'rgba(255, 255, 255, 0)',
    opacity: 1
  },
  emphasis: {
    label: {
      show: true,
      color: '#ffffff',
      fontSize: 12
    },
    itemStyle: {
      areaColor: '#1d5bd5',
      borderColor: '#ffffff',
      borderWidth: 1,
      borderType: 'solid',
      shadowBlur: 8,
      shadowColor: '#333333',
      opacity: 1
    }
  },
  left: 'center',
  top: 'center',
  regions: []
}

// geo -> region默认设置
export const DEFAULT_BASE_MAP_REGION_SETTING = {
  name: '',
  selected: false,
  itemStyle: {
    areaColor: '#d55d07',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderType: 'solid',
    shadowBlur: 8,
    shadowColor: 'rgba(255, 255, 255, 0)',
    opacity: 1
  },
  label: {
    show: true,
    color: '#ffffff',
    fontSize: 12
  },
  emphasis: {
    itemStyle: {
      areaColor: '#1d5bd5',
      borderColor: '#ffffff',
      borderWidth: 1,
      borderType: 'solid',
      shadowBlur: 8,
      shadowColor: '#333333',
      opacity: 1
    },
    label: {
      show: true,
      color: '#ffffff',
      fontSize: 12
    }
  }
}

// 连续映射默认设置
export const DEFAULT_BASE_MAP_VISUAL_MAP_OF_CONTINUOUS_SETTING = {
  show: true,
  seriesIndex: [0], // 应用于series type=map-json
  type: 'continuous',
  min: 0,
  max: 1000,
  range: [0, 1000],
  left: 50,
  top: 270,
  realTime: true,
  inverse: false,
  itemWidth: 20,
  itemHeight: 140,
  align: 'auto',
  text: ['高','低'],
  textGap: 10,
  hoverLink: true,
  textStyle: {
    color:'#fff',
    fontSize: 12
  },
  inRange: {
    color: ['#26c3e0', '#23289d']
  },
  orient: 'vertical',
  calculable: true,
  // 映射维度
  dimension: 'value'
}

// 分段映射默认设置
export const DEFAULT_BASE_MAP_VISUAL_MAP_OF_PIECEWISE_SETTING = {
  show: true,
  seriesIndex: [0], // 应用于series type=map-json
  type: 'piecewise',
  left: 30,
  top: 300,
  pieces: [
    {gt: 1000, color: '#212F97'},
    {gt: 800, lte: 1000, color: '#313f97'},
    {gt: 600, lte: 800, color: '#376DB4'},
    {gt: 400, lte: 600, color: '#458DC4'},
    {gt: 200, lte: 400, color: '#499ab1'},
    {gt: 0, lte: 200, color: '#5BBEDB'},
  ],
  selectedMode: 'multiple',
  inverse: false,
  itemWidth: 20,
  itemHeight: 14,
  align: 'auto',
  itemGap: 10,
  hoverLink: false,
  orient: 'vertical',
  textStyle: {
    color:'#fff',
    fontSize: 12
  },
  // 映射维度
  dimension: 'value'
}

// series默认设置
export const DEFAULT_BASE_MAP_SERIES_SETTING = {
  type: 'map',
  geoIndex: 0,
  datasetIndex: 0,
  encode: {
    itemName: 'name',
    value: 'value'
  }
}

// dataset默认设置
export const DEFAULT_BASE_MAP_DATASET_SETTING = {
  source: [],
  dataManager: {
    dataType: 'json',
    dataSource: [
      {name: '北京', value: 123},
      {name: '山东', value: 342},
      {name: '河南', value: 563},
      {name: '内蒙古', value: 222},
      {name: '海南', value: 623},
      {name: '湖南', value: 982},
    ],
    handleFunction: function (data) {
      // data为原始数据
      // console.log(data)
      return data
    }
  }
}
