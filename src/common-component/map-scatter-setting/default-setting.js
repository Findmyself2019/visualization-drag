export const DEFAULT_BASE_MAP_SCATTER_SETTING = {
  type: 'scatter',
  coordinateSystem: 'geo',
  symbol: 'pin',
  symbolSize: 18,
  symbolRotate: 0,
  symbolKeepAspect: true,
  symbolOffset: [0, 0],
  itemStyle: {
    color: '#ff3c06',
    opacity: 1,
    shadowBlur: 7,
    shadowColor: '#b7b7b7'
  },
  label: {
    show: true,
    position: 'left',
    rotate: 0,
    offset: [0, 0],
    color: '#ff3c06',
    fontSize: 12,
  },
  datasetIndex: 0,
  encode: {
    lng: 'lng',
    lat: 'lat',
    label: 'name'
  }
}

export const DEFAULT_BASE_MAP_SCATTER_DATA_SETTING = {
  dataSource: [],
  // eslint-disable-next-line no-unused-vars
  handleFunction: function(data) {
    return [
      {
        name: '北京',
        lng: 116.4551,
        lat: 40.2539,
        value: 10
      }
    ]
  }
}

export const DEFAULT_BASE_MAP_SCATTER_DATASET_SETTING = {
  source: [],
  dataManager: {
    dataType: 'json',
    dataSource: [
      {
        name: '北京',
        lng: 116.4551,
        lat: 40.2539,
        value: 10
      }
    ],
    handleFunction: function (data) {
      // data为原始数据
      // console.log(data)
      return data
    }
  }
}
