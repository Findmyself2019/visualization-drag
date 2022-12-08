import _ from "lodash"
import {mapState} from "vuex"

// rootData混合对象
const RootDataMixins = {
  computed: {
    ...mapState('dataSource', [
      'dataSource'
    ]),
    rootData() {
      return this.dataSource.reduce((res, item) => {
        res[item._id] = {
          identification: item.identification,
          data: _.cloneDeep(item.data)
        }
        return res
      }, {})
    },
  }
}

export default RootDataMixins
