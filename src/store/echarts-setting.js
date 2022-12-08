
const echartsSetting = {
  namespaced: true,
  state: {
    color: [],
    title: {},
    grid: {},
    legend: {},
    xAxis: {},
    yAxis: {},
    polar: [],
    radiusAxis: [],
    angleAxis: [],
    tooltip:{},
    visualMap: [],
    geo: {},
    series: [],
    dataset: [],
    actions: {}
  },
  actions: {
    setTitle({commit}, title) {
      commit('setTitle', title)
    },
    setXAxis({commit}, xAxis) {
      commit('setXAxis', xAxis)
    },
    setYAxis({commit}, yAxis) {
      commit('setYAxis', yAxis)
    },
    setGrid({commit}, grid) {
      commit('setGrid', grid)
    },
    setTooltip({commit}, tooltip) {
      commit('setTooltip', tooltip)
    },
    setSeries({commit}, {series}) {
      commit('setSeries', {series})
    },
    setDataset({commit}, dataset) {
      commit('setDataset', dataset)
    },
    setColor({commit}, {color}) {
      commit('setColor', {color})
    },
    addColor({commit}, color) {
      commit('addColor', {color})
    },
    removeColor({commit}, index) {
      commit('removeColor', index)
    },
    updateColor({commit}, {index, color}) {
      commit('updateColor', {index, color})
    },
    setLegend({commit}, legend) {
      commit('setLegend', legend)
    },
    setVisualMap({commit}, {visualMap}) {
      commit('setVisualMap', {visualMap})
    },
    setGeo({commit}, geo) {
      commit('setGeo', geo)
    },
    setActions({commit}, actions) {
      commit('setActions', actions)
    },
    setPolar({commit}, polar) {
      commit('setPolar', polar)
    },
    setRadiusAxis({commit}, radiusAxis) {
      commit('setRadiusAxis', radiusAxis)
    },
    setAngleAxis({commit}, angleAxis) {
      commit('setAngleAxis', angleAxis)
    }
  },
  mutations: {
    setTitle(state, title) {
      state.title = title
    },
    setXAxis(state, xAxis) {
      state.xAxis = xAxis
    },
    setYAxis(state, yAxis) {
      state.yAxis = yAxis
    },
    setGrid(state, grid) {
      state.grid = grid
    },
    setTooltip(state, tooltip) {
      state.tooltip = tooltip
    },
    setSeries(state, {series}) {
      state.series = series
    },
    setDataset(state, dataset) {
      state.dataset = dataset
    },
    setColor(state, {color}) {
      state.color = color
    },
    setLegend(state, legend) {
      state.legend = legend
    },
    addColor(state, {color}) {
      state.color.push(color)
    },
    removeColor(state, index) {
      state.color.splice(index, 1)
    },
    updateColor(state, {index, color}) {
      state.color.splice(index, 1, color)
    },
    setVisualMap(state, {visualMap}) {
      state.visualMap = visualMap
    },
    setGeo(state, geo) {
      state.geo = geo
    },
    setActions(state, actions) {
      state.actions = actions
    },
    setPolar(state, polar) {
      state.polar = polar
    },
    setRadiusAxis(state, radiusAxis) {
      state.radiusAxis = radiusAxis
    },
    setAngleAxis(state, angleAxis) {
      state.angleAxis = angleAxis
    }
  }
}

export default echartsSetting
