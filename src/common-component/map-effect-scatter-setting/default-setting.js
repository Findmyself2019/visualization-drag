export const DEFAULT_BASE_MAP_EFFECT_SCATTER_SETTING = {
  type: 'effectScatter',
  zlevel: 2,
  coordinateSystem: 'geo',
  rippleEffect: {
    color: '#fed211',
    period: 4,
    scale: 4,
    brushType: 'stroke'
  },
  symbol: 'circle',
  symbolSize: 9,
  symbolRotate: 0,
  symbolKeepAspect: true,
  symbolOffset: [0, 0],
  label: {
    show: false,
    position: 'left',
    rotate: 0,
    offset: [0, 0],
    color: '#fed211',
    fontSize: 12,
  },
  itemStyle: {
    color: '#fed211',
    opacity: 1
  },
  datasetIndex: 0,
  encode: {
    lng: 'lng',
    lat: 'lat',
    label: 'name'
  }
  
}

export const DEFAULT_BASE_MAP_EFFECT_SCATTER_DATA_SETTING = {
  dataSource: [],
  // eslint-disable-next-line no-unused-vars
  handleFunction: function(data) {
    return [
      {name: "山东", lng: 117, lat: 36.65},
      {name: "西藏", lng: 87.63, lat: 43.82},
      {name: "海南", lng: 110.3893, lat: 18.8516},
      {name: "湖北", lng: 114.3896, lat: 30.6628},
      {name: "黑龙江", lng: 127.9688, lat: 45.368}
    ]
  }
}

export const DEFAULT_BASE_MAP_EFFECT_SCATTER_DATASET_SETTING = {
  source: [],
  dataManager: {
    dataType: 'json',
    dataSource: [
      {name: "山东", lng: 117, lat: 36.65},
      {name: "西藏", lng: 87.63, lat: 43.82},
      {name: "海南", lng: 110.3893, lat: 18.8516},
      {name: "湖北", lng: 114.3896, lat: 30.6628},
      {name: "黑龙江", lng: 127.9688, lat: 45.368}
    ],
    handleFunction: function (data) {
      // data为原始数据
      // console.log(data)
      return data
    }
  }
}
