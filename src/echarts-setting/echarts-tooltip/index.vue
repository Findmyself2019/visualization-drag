<!-- echarts tooltip设置 -->
<template>
  <fold label="提示框">
    <div slot="pane-right">
      <sv-checkbox v-model="tooltip.show" />
    </div>
    <div slot="content">
      <form-row label="触发类型">
        <sv-select v-model="tooltip.trigger">
          <sv-select-option
            v-for="(item, index) in triggerType"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <fold-in label="浮层样式">
        <div slot="content">
          <form-row label="背景色">
            <sv-color v-model="tooltip.backgroundColor" />
          </form-row>
          <form-row label="字体颜色">
            <sv-color v-model="tooltip.textStyle.color" />
          </form-row>
          <form-row label="字体大小">
            <number-input v-model="tooltip.textStyle.fontSize" :min="0" />
          </form-row>
          <fold-in label="内边距" :can-open="false">
            <div slot="content">
              <form-row label="上">
                <number-input v-model="tooltip.padding[0]" />
              </form-row>
              <form-row label="右">
                <number-input v-model="tooltip.padding[1]" />
              </form-row>
              <form-row label="下">
                <number-input v-model="tooltip.padding[2]" />
              </form-row>
              <form-row label="左">
                <number-input v-model="tooltip.padding[3]" />
              </form-row>
            </div>
          </fold-in>
        </div>
      </fold-in>
      <fold-in label="指示器">
        <div slot="content">
          <form-row label="指示器类型">
            <sv-select v-model="tooltip.axisPointer.type">
              <sv-select-option
                v-for="(item, index) in axisPointerType"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <fold-in label="文本标签" :can-open="false">
            <div slot="pane-right">
              <sv-checkbox v-model="tooltip.axisPointer.label.show" />
            </div>
            <div slot="content">
              <form-row label="字体颜色">
                <sv-color v-model="tooltip.axisPointer.label.color" />
              </form-row>
              <form-row label="字体大小">
                <number-input
                  v-model="tooltip.axisPointer.label.fontSize"
                  :min="0"
                >
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
              <form-row label="背景颜色">
                <sv-color v-model="tooltip.axisPointer.label.backgroundColor" />
              </form-row>
              <form-row label="边框颜色">
                <sv-color v-model="tooltip.axisPointer.label.borderColor" />
              </form-row>
              <form-row label="边框宽度">
                <number-input
                  v-model="tooltip.axisPointer.label.borderWidth"
                  :min="0"
                >
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
            </div>
          </fold-in>
          <fold-in
            label="直线指示器样式"
            :can-open="false"
            v-if="tooltip.axisPointer.type === 'line'"
          >
            <div slot="content">
              <form-row label="直线类型">
                <sv-select v-model="tooltip.axisPointer.lineStyle.type">
                  <sv-select-option
                    v-for="(item, index) in lineStyle"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="直线颜色">
                <sv-color v-model="tooltip.axisPointer.lineStyle.color" />
              </form-row>
              <form-row label="直线宽度">
                <number-input
                  v-model="tooltip.axisPointer.lineStyle.width"
                  :min="0"
                >
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
            </div>
          </fold-in>
          <fold-in
            label="阴影指示器样式"
            :can-open="false"
            v-if="tooltip.axisPointer.type === 'shadow'"
          >
            <div slot="content">
              <form-row label="阴影颜色">
                <sv-color v-model="tooltip.axisPointer.shadowStyle.color" />
              </form-row>
            </div>
          </fold-in>
          <fold-in
            label="十字准星指示器样式"
            :can-open="false"
            v-if="tooltip.axisPointer.type === 'cross'"
          >
            <div slot="content">
              <form-row label="直线类型">
                <sv-select v-model="tooltip.axisPointer.crossStyle.type">
                  <sv-select-option
                    v-for="(item, index) in lineStyle"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="直线颜色">
                <sv-color v-model="tooltip.axisPointer.crossStyle.color" />
              </form-row>
              <form-row label="直线宽度">
                <number-input v-model="tooltip.axisPointer.crossStyle.width">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
            </div>
          </fold-in>
        </div>
      </fold-in>
      <fold-in label="位置" :can-open="false">
        <div slot="pane-right">
          <radio-group v-model="positionType" @change="handleChange">
            <radio value="follow">
              跟随鼠标
            </radio>
            <radio value="fixed">
              固定位置
            </radio>
          </radio-group>
        </div>
        <div slot="content" v-if="positionType === 'fixed'">
          <form-row label="左">
            <number-input
              v-model="tooltip.position[0]"
              @input="handleInput(0, $event)"
            >
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="上">
            <number-input
              v-model="tooltip.position[1]"
              @input="handleInput(1, $event)"
            >
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <form-row label="自定义内容">
        <div class="center">
          <span>启用</span>
          <sv-checkbox v-model="formatter" />
        </div>
      </form-row>
      <div class="row">
        <function-code
          :fn-name="fnName"
          :fn-body="fnBody"
          :fn-params="fnParams"
          @save="($event) => (this.fnBody = $event)"
        />
      </div>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvColor from '@/setting-component/sv-color/index'
import NumberInput from '@/setting-component/number-input/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio/index'
import FunctionCode from '@/setting-component/function-code/index'
import debounce from '@/utils/debounce'
import { getFunctionBodyAndParams } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { LINE_TYPES } from '@/constants/echarts-constans'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'

export default {
  name: 'EchartsTooltip',
  data() {
    return {
      triggerType: [
        {
          label: '数据项触发',
          value: 'item',
        },
        {
          label: '坐标轴触发',
          value: 'axis',
        },
        {
          label: '不触发',
          value: 'none',
        },
      ],
      axisPointerType: [
        {
          label: '直线指示器',
          value: 'line',
        },
        {
          label: '阴影指示器',
          value: 'shadow',
        },
        {
          label: '十字准星指示器',
          value: 'cross',
        },
        {
          label: '无指示器',
          value: 'none',
        },
      ],
      lineStyle: LINE_TYPES,
      positionType: 'follow',
      tempPosition: [100, 10],
      fnName: 'formatter',
      fnParams: ['params'],
      fnBody:
        'console.log(params)\n' +
        'const {marker, value} = params[0]\n' +
        'return `${marker} ${value}`',
      formatter: false,
    }
  },
  computed: {
    ...mapState('echartsSetting', ['tooltip']),
  },
  mounted() {
    const { tooltip } = this
    if (tooltip.position === undefined) {
      this.positionType = 'follow'
    } else {
      this.tempPosition = tooltip.position
      this.positionType = 'fixed'
    }
    if (tooltip.formatter && tooltip.formatter instanceof Function) {
      this.formatter = true
      const { body, params } = getFunctionBodyAndParams(tooltip.formatter)
      this.fnBody = body
      this.fnParams = params
    }
  },
  watch: {
    tooltip: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          setting,
          key: 'tooltip',
        })
        this.setTooltip(setting)
      },
    },
    fnBody: {
      handler(body) {
        this.formatter &&
          this.$set(
            this.tooltip,
            'formatter',
            new Function(...this.fnParams, body)
          )
      },
    },
    formatter: {
      handler(value) {
        if (value) {
          this.$set(
            this.tooltip,
            'formatter',
            new Function(...this.fnParams, this.fnBody)
          )
        } else {
          this.$delete(this.tooltip, 'formatter')
        }
      },
    },
  },
  methods: {
    ...mapActions('echartsSetting', ['setTooltip']),
    ...mapActions('pageComList', ['changeComSetting']),
    handleChange(val) {
      if (val === 'follow') {
        this.tooltip.position = undefined
      } else if (val === 'fixed') {
        // 监听position两个input
        this.$set(this.tooltip, 'position', this.tempPosition)
      }
    },
    handleInput: debounce(function(index, val) {
      this.tempPosition[index] = val
    }),
  },
  components: {
    SvSelectOption,
    FunctionCode,
    Radio,
    RadioGroup,
    NumberInput,
    SvColor,
    FoldIn,
    SvSelect,
    FormRow,
    SvCheckbox,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.row
  padding-left 12px

.axisPointer
  display flex
  align-items center

  .explain
    margin-left 10px
    color theme-color
    cursor pointer

    &:hover
      opacity 0.8

.center
  height 100%
  display flex
  align-items center

  span
    margin-right 8px
</style>
