export const basicOption = {
  title: {
    text: '',
    subtext: '',
    textStyle: {
      color: '#000000',
      fontSize: 20,
      textShadowColor: 'rgba(255, 255, 255, 0)',
      textShadowBlur: 5,
    },
    subtextStyle: {
      color: '#cfcfcf',
      fontSize: 14,
      textShadowColor: 'rgba(255, 255, 255, 0)',
      textShadowBlur: 5,
    },
    itemGap: 10,
    top: 5,
    left: 'center',
  },
  
  tooltip: {
  },

  legend: {
    left: 10,
    top: '10px',
    show: true,
    height: '',

    type: 'plain',
    orient: 'horizontal',
    itemGap: 10,
    itemWidth: 10,
    itemHeight: 10,
    icon: 'roundRect',
    // backgroundColor: '#fac858',
    textStyle: {
      color: '#B9C3D2',
      fontSize: 12,
    },
  },
  grid: {
    top: '8%',
    left: '2%',
    right: '6%',
    bottom: '6%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
    show: false,
  },
  series: [
    // {
    //   name: 'Email',
    //   type: 'line',
    //   stack: 'Total',
    //   data: [120, 132, 101, 134, 90, 230, 210],
    // },
    // {
    //   name: 'Union Ads',
    //   type: 'line',
    //   stack: 'Total',
    //   data: [220, 182, 191, 234, 290, 330, 310],
    // },
  ],
}
