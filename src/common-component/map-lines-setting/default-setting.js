export const DEFAULT_BASE_MAP_LINES_SETTING = {
  type: 'lines',
  coordinateSystem: 'geo',
  zlevel: 2,
  effect: {
    show: true,
    period: 4,
    delay: 0,
    symbol: 'arrow',
    symbolSize: 10,
    color: '#fed211',
    trailLength: 0.2,
    loop: true
  },
  symbol: ['none', 'none'],
  symbolSize: [14, 14],
  lineStyle: {
    color: '#fed211',
    width: 1,
    type: 'solid',
    opacity: 1,
    curveness: 0.3,
  },
  label: {
    show: false,
    position: 'middle',
    color: '#fed211',
    fontSize: 12
  },
}

export const DEFAULT_BASE_MAP_LINES_DATA_SETTING = {
  dataSource: [],
  // eslint-disable-next-line no-unused-vars
  handleFunction: function(data) {
    return [
      {
        coords: [
          [117, 36.65],
          [87.63, 43.82]
        ],
        value: 21
      },
      {
        coords: [
          [117, 36.65],
          [110.3893, 18.8516]
        ]
      },
      {
        coords: [
          [117, 36.65],
          [114.3896, 30.6628]
        ]
      },
      {
        coords: [
          [117, 36.65],
          [127.9688, 45.368]
        ]
      },
    ]
  }
}

export const DEFAULT_BASE_MAP_LINES_DATASET_SETTING = {
  dataManager: {
    dataType: 'json',
    dataSource: [
      {
        coords: [
          [117, 36.65],
          [87.63, 43.82]
        ],
        value: 21
      },
      {
        coords: [
          [117, 36.65],
          [110.3893, 18.8516]
        ]
      },
      {
        coords: [
          [117, 36.65],
          [114.3896, 30.6628]
        ]
      },
      {
        coords: [
          [117, 36.65],
          [127.9688, 45.368]
        ]
      },
    ],
    handleFunction: function (data) {
      // data为原始数据
      // console.log(data)
      return data
    }
  }
}
