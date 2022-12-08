<template>
  <div>
    <fold label="数据集配置" :can-open="false">
      <div slot="content">
        <form-row dir="column" label="选取数据源">
          <sv-select v-model="data[seriesIndex].dataSource" multiple>
            <sv-select-option
              v-for="item in dataSource"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
              {{ item.name }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row dir="column">
          <div slot="label">
            <span>数据处理器</span>
            <sv-button style="transform: scale(0.8)" @click="examineRes">
              查看处理结果
            </sv-button>
          </div>
          <function-code
            :fn-name="fnName"
            :fn-params="fnParams"
            :fn-body="fnBody"
            @save="changeFilter($event)"
          />
        </form-row>
      </div>
    </fold>
    <div class="btns">
      <sv-button @click="updateDataset">
        更新数据
      </sv-button>
    </div>
    <sv-dialog
      title="数据处理结果"
      v-model="visible"
      :show-cancel-button="false"
    >
      <div slot="content">
        <code-editor-of-ace
          language="json"
          :height="500"
          :options="{ readOnly: true }"
          :code="formatJson(handleResult)"
        />
      </div>
    </sv-dialog>
  </div>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import SvButton from '@/setting-component/sv-button/index'
import FunctionCode from '@/setting-component/function-code/index'
import { mapState, mapActions } from 'vuex'
import { getFunctionBodyAndParams, formatJson } from '@/utils/util'
import SvDialog from '@/setting-component/sv-dialog/index'
import _ from 'lodash'
// import CodeEditorOfAce from "@/common-components/code-editor-of-ace/index"
export default {
  name: 'DataSourceSelect',
  components: {
    // CodeEditorOfAce,
    SvDialog,
    FunctionCode,
    SvButton,
    SvSelectOption,
    SvSelect,
    FormRow,
    Fold,
  },
  data() {
    return {
      fnName: 'filter',
      visible: false,
      handleResult: [],
      fnParams: ['data'],
      fnBody: 'return data;',
    }
  },
  computed: {
    ...mapState('dataSource', ['dataSource']),
    ...mapState('comDataSetting', ['data']),
    ...mapState('workbench', ['seriesIndex']),
  },
  watch: {
    data: {
      deep: true,
      handler(newValue) {
        this.changeComSetting({
          key: 'data',
          setting: newValue,
        })
      },
    },
  },
  mounted() {
    const { handleFunction } = this.data[this.seriesIndex]
    const { body, params } = getFunctionBodyAndParams(handleFunction)
    this.fnBody = body
    this.fnParams = params
  },
  methods: {
    formatJson,
    ...mapActions('pageComList', ['changeComSetting']),
    changeFilter(body) {
      this.fnBody = body
    },
    examineRes() {
      const { fnBody, fnParams, data, seriesIndex } = this

      const rootData = this.dataSource.reduce((res, item) => {
        res[item._id] = {
          identification: item.identification,
          data: _.cloneDeep(item.data),
        }
        return res
      }, {})

      const arg = data[seriesIndex].dataSource.reduce((res, id) => {
        res[rootData[id].identification] = rootData[id].data
        return res
      }, {})

      this.handleResult = new Function(...fnParams, fnBody).call(null, arg)
      this.visible = true
    },
    updateDataset() {
      const { fnBody, fnParams } = this
      this.data[this.seriesIndex].handleFunction = new Function(
        ...fnParams,
        fnBody
      )
    },
  },
}
</script>

<style scoped lang="stylus">
.btns
  display flex
  align-items center
  justify-content center
</style>
