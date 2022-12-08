import {mapGetters} from "vuex"

// 焦点组件信息混合对象
const FocusComInfoMixins = {
  computed: {
    ...mapGetters('pageComList', [
      'focusComInfo'
    ]),
    comName() {
      const {focusComInfo} = this
      if (focusComInfo.length > 0) {
        return focusComInfo[0].com.name
      }
      return ''
    }
  }
}

export default FocusComInfoMixins
