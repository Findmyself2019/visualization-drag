export default {
  state: {
    contextmenuTop: 0, // 右击菜单数据
    contextmenuLeft: 0,
    contextmenuShow: false,
  },
  mutations: {
      showContextMenu(state, { top, left }) {
          state.contextmenuShow = true
          state.contextmenuTop = top
          state.contextmenuLeft = left
      },

      hideContextMenu(state) {
          state.contextmenuShow = false
      },
  },
}