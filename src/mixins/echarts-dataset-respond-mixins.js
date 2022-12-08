import {mapState} from 'vuex'

const EchartsDatasetRespondMixins = {
  computed: {
    ...mapState('echartsSetting', [
      'dataset'
    ])
  },
  watch: {
    dataset: {
      deep: true,
      immediate: true,
      handler(setting) {
        this.changeComSetting({
          key: 'dataset',
          setting
        })
      }
    },
  },
}

export default EchartsDatasetRespondMixins
