<template>
  <fold label="散点配置">
    <div slot="content">
      <fold-in label="图形设置">
        <div slot="content">
          <form-row label="图形类型">
            <sv-select v-model="curSeries.symbol">
              <sv-select-option
                v-for="(item, index) in symbolTypes"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="图形大小">
            <number-input :min="0" v-model="curSeries.symbolSize" />
          </form-row>
          <form-row label="旋转角度">
            <slider
              class="slider"
              :min="-360"
              :max="360"
              v-model="curSeries.symbolRotate"
            />
          </form-row>
          <form-row label="保持图形缩放比">
            <sv-checkbox v-model="curSeries.symbolKeepAspect" />
          </form-row>
          <fold-in label="图形偏移" :can-open="false">
            <div slot="content">
              <form-row label="水平偏移量">
                <number-input v-model="curSeries.symbolOffset[0]" />
              </form-row>
              <form-row label="竖直偏移量">
                <number-input v-model="curSeries.symbolOffset[1]" />
              </form-row>
            </div>
          </fold-in>
          <form-row label="图形颜色">
            <sv-color v-model="curSeries.itemStyle.color" />
          </form-row>
          <form-row label="透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="curSeries.itemStyle.opacity"
            />
          </form-row>
          <form-row label="阴影长度">
            <number-input v-model="curSeries.itemStyle.shadowBlur" />
          </form-row>
          <form-row label="阴影颜色">
            <sv-color v-model="curSeries.itemStyle.shadowColor" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="文本设置">
        <div slot="pane-right">
          <sv-checkbox v-model="curSeries.label.show" />
        </div>
        <div slot="content">
          <form-row label="文本位置">
            <sv-select v-model="curSeries.label.position">
              <sv-select-option
                v-for="(item, index) in positionTypes"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="旋转角度">
            <slider
              class="slider"
              :min="-90"
              :max="90"
              v-model="curSeries.label.rotate"
            />
          </form-row>
          <fold-in label="文本偏移" :can-open="false">
            <div slot="content">
              <form-row label="水平偏移">
                <number-input v-model="curSeries.label.offset[0]" />
              </form-row>
              <form-row label="竖直偏移">
                <number-input v-model="curSeries.label.offset[1]" />
              </form-row>
            </div>
          </fold-in>
          <form-row label="文本颜色">
            <sv-color v-model="curSeries.label.color" />
          </form-row>
          <form-row label="文本大小">
            <number-input :min="0" v-model="curSeries.label.fontSize" />
          </form-row>
          <form-row label="自定义文本内容">
            <div class="center">
              <span>启用</span>
              <sv-checkbox v-model="formatter" />
            </div>
          </form-row>
          <div>
            <function-code
              :fn-name="fnName"
              :fn-body="fnBody"
              :fn-params="fnParams"
              @save="($event) => (this.fnBody = $event)"
            />
          </div>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import { EchartsSeriesRespondMixins } from '@/mixins'
import { mapState } from 'vuex'
import { SYMBOL_TYPES } from '@/constants/echarts-constans'
import NumberInput from '@/setting-component/number-input/index'
import Slider from '@/setting-component/slider/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import SvColor from '@/setting-component/sv-color/index'
import FunctionCode from '@/setting-component/function-code/index'
import { getFunctionBodyAndParams } from '@/utils/util'

export default {
  name: 'EchartsMapScatter',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      symbolTypes: SYMBOL_TYPES,
      positionTypes: [
        {
          label: '居上',
          value: 'top',
        },
        {
          label: '居左',
          value: 'left',
        },
        {
          label: '居右',
          value: 'right',
        },
        {
          label: '居下',
          value: 'bottom',
        },
        {
          label: '内部局中',
          value: 'inside',
        },
      ],
      fnName: 'formatter',
      fnParams: ['params'],
      fnBody: 'console.log(params)\n' + 'return params.data.name',
      formatter: false,
    }
  },
  computed: {
    ...mapState('workbench', ['seriesIndex']),
    curSeries() {
      return this.series[this.seriesIndex]
    },
  },
  watch: {
    fnBody: {
      handler(body) {
        this.curSeries.label.formatter = new Function(...this.fnParams, body)
      },
    },
    formatter(value) {
      if (value) {
        this.$set(
          this.series[this.seriesIndex].label,
          'formatter',
          new Function(...this.fnParams, this.fnBody)
        )
      } else {
        this.$delete(this.series[this.seriesIndex].label, 'formatter')
      }
    },
  },
  mounted() {
    const { formatter } = this.curSeries.label
    if (formatter) {
      const { body, params } = getFunctionBodyAndParams(formatter)
      this.fnBody = body
      this.fnParams = params
      this.formatter = true
    }
  },
  components: {
    FunctionCode,
    SvColor,
    SvCheckbox,
    Slider,
    NumberInput,
    SvSelectOption,
    SvSelect,
    FormRow,
    FoldIn,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
.slider
  width 150px

.center
  height 100%
  display flex
  align-items center

  span
    margin-right 8px
</style>
