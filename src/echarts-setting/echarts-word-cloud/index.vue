<template>
  <fold label="词云系列配置">
    <div slot="content">
      <echarts-position :position="curSeries" />
      <fold-in label="尺寸" :can-open="false">
        <div slot="content">
          <form-row label="宽度">
            <number-input
              :min="0"
              :max="100"
              :parse="parse"
              :formatter="formatter"
              v-model="curSeries.width"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="高度">
            <number-input
              :min="0"
              :max="100"
              :parse="parse"
              :formatter="formatter"
              v-model="curSeries.height"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <form-row label="形状">
        <sv-select v-model="curSeries.shape">
          <sv-select-option
            v-for="(item, index) in shapeTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="单词间距">
        <number-input v-model="curSeries.gridSize" />
      </form-row>
      <fold-in label="文本样式">
        <div slot="content">
          <fold-in label="文本大小范围" :can-open="false">
            <div slot="content">
              <form-row label="最小值">
                <number-input :min="0" v-model="curSeries.sizeRange[0]">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
              <form-row label="最大值">
                <number-input :min="0" v-model="curSeries.sizeRange[1]">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
            </div>
          </fold-in>
          <fold-in label="文本旋转范围" :can-open="false">
            <div slot="content">
              <form-row label="最小值">
                <slider
                  class="slider"
                  v-model="curSeries.rotationRange[0]"
                  :max="360"
                  :min="-360"
                />
              </form-row>
              <form-row label="最大值">
                <slider
                  class="slider"
                  v-model="curSeries.rotationRange[1]"
                  :max="360"
                  :min="-360"
                />
              </form-row>
              <form-row label="步进">
                <slider
                  class="slider"
                  v-model="curSeries.rotationStep"
                  :max="360"
                  :min="0"
                />
              </form-row>
            </div>
          </fold-in>
          <form-row label="文本加粗">
            <div class="center">
              <sv-select v-model="curSeries.textStyle.normal.fontWeight">
                <sv-select-option
                  v-for="(item, index) in fontWeightType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </sv-select-option>
              </sv-select>
            </div>
          </form-row>
          <form-row label="文本颜色函数" />
          <div class="row">
            <function-code
              :fn-name="fnName"
              :fn-params="fnParams"
              :fn-body="fnBody"
              @save="($event) => (this.fnBody = $event)"
            />
          </div>
        </div>
      </fold-in>
      <fold-in label="文本高亮样式">
        <div slot="content">
          <form-row label="阴影颜色">
            <sv-color v-model="curSeries.textStyle.emphasis.shadowColor" />
          </form-row>
          <form-row label="阴影模糊大小">
            <number-input v-model="curSeries.textStyle.emphasis.shadowBlur" />
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import EchartsPosition from '@/echarts-setting/echarts-position/index'
import { EchartsSeriesRespondMixins } from '@/mixins'
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvSelect from '@/setting-component/sv-select/index'
import { FONT_WEIGHT_TYPES } from '@/constants/echarts-constans'
import SvColor from '@/setting-component/sv-color/index'
import FunctionCode from '@/setting-component/function-code/index'
import { getFunctionBodyAndParams } from '@/utils/util'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import Slider from '@/setting-component/slider/index'

export default {
  name: 'EchartsWordCloud',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      shapeTypes: [
        {
          label: '圆形',
          value: 'circle',
        },
        {
          label: '心形',
          value: 'cardioid',
        },
        {
          label: '菱形',
          value: 'diamond',
        },
        {
          label: '三角形',
          value: 'triangle',
        },
      ],
      fontWeightType: FONT_WEIGHT_TYPES,
      fnName: 'formatter',
      fnParams: ['params'],
      fnBody:
        'console.log(params)\n' +
        "let color = ['#27D38A', '#FFCA1C', '#5DD1FA', '#F88E25','#47A0FF','#FD6565']\n" +
        'let num = Math.floor(Math.random() * (5 + 1))\n' +
        'return color[num]',
    }
  },
  watch: {
    fnBody: {
      handler(body) {
        this.curSeries.textStyle.normal &&
          this.$set(
            this.curSeries.textStyle.normal,
            'color',
            new Function(...this.fnParams, body)
          )
      },
    },
  },
  mounted() {
    const { color } = this.curSeries.textStyle.normal
    if (color && color instanceof Function) {
      const { body, params } = getFunctionBodyAndParams(color)
      this.fnParams = params
      this.fnBody = body
    }
  },
  methods: {
    parse: (value) => value.replace('%', ''),
    formatter: (value) => `${value}%`,
  },
  components: {
    Slider,
    SvSelectOption,
    FunctionCode,
    SvColor,
    SvSelect,
    NumberInput,
    FormRow,
    FoldIn,
    EchartsPosition,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
.center
  height 100%
  display flex
  align-items center

.slider
  width 150px
</style>
