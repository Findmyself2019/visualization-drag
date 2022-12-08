<!-- echarts series label 配置 -->
<template>
  <fold-in label="文本">
    <div slot="pane-right">
      <sv-checkbox v-model="series.label.show" />
    </div>
    <div slot="content">
      <form-row label="字体大小">
        <number-input v-model="series.label.fontSize" :min="0" />
      </form-row>
      <form-row label="字体颜色">
        <sv-color v-model="series.label.color" />
      </form-row>
      <form-row label="文本位置">
        <sv-select v-model="series.label.position">
          <sv-select-option
            v-for="(item, index) in positionTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="自定义文本">
        <div class="center">
          <span>启用</span>
          <sv-checkbox v-model="formatter" />
        </div>
      </form-row>
      <div>
        <function-code
          :fn-name="fnName"
          :fn-params="fnParams"
          :fn-body="fnBody"
          @save="changeFnBody"
        />
      </div>
    </div>
  </fold-in>
</template>

<script>
import FoldIn from '@/setting-component/fold-in/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvColor from '@/setting-component/sv-color/index'
import SvSelect from '@/setting-component/sv-select/index'
import FunctionCode from '@/setting-component/function-code/index'
import { getFunctionBodyAndParams } from '@/utils/util'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'

export default {
  name: 'EchartsSeriesLabel',
  props: {
    series: {
      type: Object,
      default: () => ({}),
    },
    positionTypes: {
      type: Array,
      default: () => [
        {
          label: '顶侧居中',
          value: 'top',
        },
        {
          label: '底部居中',
          value: 'bottom',
        },
        {
          label: '右侧居中',
          value: 'right',
        },
        {
          label: '左侧居中',
          value: 'left',
        },
        {
          label: '图形内居中',
          value: 'inside',
        },
        {
          label: '图形内顶部居中',
          value: 'insideTop',
        },
        {
          label: '图形内底部居中',
          value: 'insideBottom',
        },
        {
          label: '图形内左侧居中',
          value: 'insideLeft',
        },
        {
          label: '图形内右侧居中',
          value: 'insideRight',
        },
      ],
    },
  },
  data() {
    return {
      fnName: 'formatter',
      fnParams: ['params'],
      fnBody:
        '// params中包含所需信息\n// console.log(params)\nreturn params.data.count',
      formatter: false,
    }
  },
  watch: {
    fnBody: {
      handler(body) {
        this.formatter &&
          this.$set(
            this.series.label,
            'formatter',
            new Function(...this.fnParams, body)
          )
      },
    },
    formatter: {
      handler(value) {
        if (value) {
          this.$set(
            this.series.label,
            'formatter',
            new Function(...this.fnParams, this.fnBody)
          )
        } else {
          this.$delete(this.series.label, 'formatter')
        }
      },
    },
  },
  mounted() {
    const { formatter } = this.series.label
    if (formatter && formatter instanceof Function) {
      this.formatter = true
      const { body, params } = getFunctionBodyAndParams(formatter)
      this.fnBody = body
      this.fnParams = params
    }
  },
  methods: {
    changeFnBody(fnBody) {
      this.fnBody = fnBody
    },
  },
  components: {
    SvSelectOption,
    FunctionCode,
    SvSelect,
    SvColor,
    NumberInput,
    FormRow,
    SvCheckbox,
    FoldIn,
  },
}
</script>

<style scoped lang="stylus">
.center
  height 100%
  display flex
  align-items center

  span
    margin-right 8px
</style>
