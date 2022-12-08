<!-- series type=bar 配置 -->
<template>
  <fold label="柱子系列配置">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addSeries"></i>
    </div>
    <div slot="content">
      <form-row label="不同系列柱子间距" v-if="series.length > 1">
        <number-input
          :min="-100"
          :max="100"
          :parse="parse"
          :formatter="formatter"
          v-model="series[series.length - 1].barGap"
        >
          <span slot="suffix">%</span>
        </number-input>
      </form-row>
      <form-row label="同系列柱子间距">
        <number-input
          :min="-100"
          :max="100"
          :parse="parse"
          :formatter="formatter"
          v-model="series[series.length - 1].barCategoryGap"
        >
          <span slot="suffix">%</span>
        </number-input>
      </form-row>
      <fold-in
        v-for="(serie, index1) in series"
        :key="index1"
        :label="`柱子【${index1 + 1}】`"
      >
        <div slot="pane-right" v-if="series.length > 1">
          <i
            class="operate-icon iconfont sv-jian"
            @click="removeSeries(index1)"
          ></i>
        </div>
        <div slot="content">
          <form-row label="系列名">
            <sv-input v-model="serie.name" />
          </form-row>
          <fold-in label="字段映射" :can-open="false">
            <div slot="content">
              <form-row label="x">
                <sv-input v-model="serie.encode.x" />
              </form-row>
              <form-row label="y">
                <sv-input v-model="serie.encode.y" />
              </form-row>
            </div>
          </fold-in>
          <echarts-series-label :series="serie" />
          <fold-in label="图形设置">
            <div slot="content">
              <form-row label="选择图形">
                <sv-select
                  :value="symbols[index1]"
                  @input="symbolChange($event, index1)"
                >
                  <sv-select-option
                    v-for="item in symbolTypes"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="上传图片" v-if="symbols[index1] === 'image'">
                <upload
                  :value="images[index1]"
                  @input="imageChange($event, index1)"
                />
              </form-row>
              <form-row label="SVG路径" v-else-if="symbols[index1] === 'svg'">
                <sv-textarea
                  :value="svgs[index1]"
                  @input="svgChange($event, index1)"
                />
              </form-row>
              <fold-in label="图形大小" :can-open="false">
                <div slot="content">
                  <form-row label="宽度">
                    <number-input
                      :min="0"
                      :parse="parse"
                      :formatter="formatter"
                      v-model="serie.symbolSize[0]"
                    >
                      <span slot="suffix">%</span>
                    </number-input>
                  </form-row>
                  <form-row label="高度">
                    <number-input
                      :min="0"
                      :parse="parse"
                      :formatter="formatter"
                      v-model="serie.symbolSize[1]"
                    >
                      <span slot="suffix">%</span>
                    </number-input>
                  </form-row>
                </div>
              </fold-in>
              <form-row label="图形位置">
                <sv-select v-model="serie.symbolPosition">
                  <sv-select-option
                    v-for="item in positions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <fold-in label="图形偏移" :can-open="false">
                <div slot="content">
                  <form-row label="水平偏移">
                    <number-input v-model="serie.symbolOffset[0]" />
                  </form-row>
                  <form-row label="竖直偏移">
                    <number-input v-model="serie.symbolOffset[1]" />
                  </form-row>
                </div>
              </fold-in>
              <form-row label="旋转角度">
                <number-input
                  :min="-360"
                  :max="360"
                  v-model="serie.symbolRotate"
                >
                  <span slot="suffix">°</span>
                </number-input>
              </form-row>
              <form-row label="图形重复">
                <sv-checkbox v-model="serie.symbolRepeat" />
              </form-row>
              <form-row label="绘制方向">
                <sv-select v-model="serie.symbolRepeatDirection">
                  <sv-select-option
                    v-for="item in directions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="图形间隔">
                <number-input v-model="serie.symbolMargin" />
              </form-row>
              <form-row label="是否剪切图形">
                <sv-checkbox v-model="serie.symbolClip" />
              </form-row>
            </div>
          </fold-in>
          <fold-in label="柱子样式">
            <div slot="content">
              <form-row label="柱子颜色">
                <sv-color v-model="serie.itemStyle.color" />
              </form-row>
              <form-row label="柱子透明度">
                <slider
                  class="slider"
                  :mim="0"
                  :max="1"
                  :step="0.01"
                  v-model="serie.itemStyle.opacity"
                />
              </form-row>
              <fold-in label="柱子宽度" :can-open="false">
                <div slot="pane-right">
                  <radio-group v-model="barWidthSettings[index1].barWidthType">
                    <radio value="auto">
                      自适应
                    </radio>
                    <radio value="setting">
                      自定义
                    </radio>
                  </radio-group>
                </div>
                <div slot="content">
                  <form-row
                    v-if="barWidthSettings[index1].barWidthType === 'setting'"
                  >
                    <number-input
                      v-model="serie.barWidth"
                      @input="handleInput($event, index1)"
                      :min="0"
                    />
                  </form-row>
                </div>
              </fold-in>
              <form-row label="最小高度">
                <number-input v-model="serie.barMinHeight" :min="0" />
              </form-row>
            </div>
          </fold-in>
          <echarts-series-mark :series="serie" />
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import FormRow from '@/setting-component/form-row/index'
import FoldIn from '@/setting-component/fold-in/index'
import NumberInput from '@/setting-component/number-input/index'
import SvColor from '@/setting-component/sv-color/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio/index'
import EchartsSeriesMark from '@/echarts-setting/echarts-series-mark/index'
import { EchartsSeriesRespondMixins } from '@/mixins'
import EchartsSeriesLabel from '@/echarts-setting/echarts-series-label/index'
import Slider from '@/setting-component/slider/index'
import SvInput from '@/setting-component/sv-input/index'
import _ from 'lodash'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import SvTextarea from '@/setting-component/sv-textarea/index'
import Upload from '@/setting-component/upload'
import SvCheckbox from '@/setting-component/sv-checkbox/index'

export default {
  name: 'EchartsPictorialBar',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      barWidthType: 'auto',
      barWidthOfSetting: 20,
      barWidthSettings: [],
      symbolTypes: [
        {
          label: '圆形',
          value: 'circle',
        },
        {
          label: '方形',
          value: 'rect',
        },
        {
          label: '圆角方形',
          value: 'roundRect',
        },
        {
          label: '三角形',
          value: 'triangle',
        },
        {
          label: '菱形',
          value: 'diamond',
        },
        {
          label: '水滴形',
          value: 'pin',
        },
        {
          label: '箭头形',
          value: 'arrow',
        },
        {
          label: '图片',
          value: 'image',
        },
        {
          label: 'SVG',
          value: 'svg',
        },
        {
          label: '无',
          value: 'none',
        },
      ],
      symbols: [],
      images: [],
      svgs: [],
      positions: [
        {
          label: '从柱子开始处内切',
          value: 'start',
        },
        {
          label: '居中',
          value: 'center',
        },
        {
          label: '从柱子结束处内切',
          value: 'end',
        },
      ],
      directions: [
        {
          label: 'start',
          value: 'start',
        },
        {
          label: 'end',
          value: 'end',
        },
      ],
    }
  },
  computed: {
    isCustom() {
      return this.defaultLine === 'custom'
    },
  },
  created() {
    this.series.forEach((item) => {
      const { symbol } = item
      if (symbol.startsWith('image://')) {
        this.images.push(symbol.replace(/^image:\/\//, ''))
        this.symbols.push('image')
        this.svgs.push('')
      } else if (symbol.startsWith('path://')) {
        this.svgs.push(symbol.replace(/^path:\/\//, ''))
        this.symbols.push('svg')
        this.images.push('')
      } else {
        this.svgs.push('')
        this.images.push('')
        this.symbols.push(symbol)
      }
      if (item.barWidth === 'auto') {
        this.barWidthSettings.push({
          barWidthType: 'auto',
          barWidthOfSetting: 20,
        })
      } else {
        this.barWidthSettings.push({
          barWidthType: 'setting',
          barWidthOfSetting: item.barWidth || 20,
        })
      }
    })
  },
  watch: {
    barWidthSettings: {
      deep: true,
      handler(newValue) {
        newValue.forEach((item, index) => {
          if (item.barWidthType === 'auto') {
            this.series[index].barWidth = 'auto'
          } else if (item.barWidthType === 'setting') {
            this.series[index].barWidth = item.barWidthOfSetting
          }
        })
      },
    },
  },
  methods: {
    parse: (value) => value.replace('%', ''),
    formatter: (value) => `${value}%`,
    handleInput(val, index) {
      this.barWidthSettings[index].barWidthOfSetting = val
    },
    // 添加系列
    addSeries() {
      this.series.push(_.cloneDeep(this.series[0]))
      const { symbol } = this.series[0]
      if (symbol.startsWith('image://')) {
        this.images.push(symbol.replace(/^image:\/\//, ''))
        this.symbols.push('image')
        this.svgs.push('')
      } else if (symbol.startsWith('path://')) {
        this.svgs.push(symbol.replace(/^path:\/\//, ''))
        this.symbols.push('svg')
        this.images.push('')
      } else {
        this.svgs.push('')
        this.images.push('')
        this.symbols.push(symbol)
      }
      this.barWidthSettings.push(_.cloneDeep(this.barWidthSettings[0]))
    },
    // 删除系列
    removeSeries(index) {
      this.series.splice(index, 1)
      this.barWidthSettings.splice(index, 1)
    },
    // 图形切换
    symbolChange(value, index) {
      this.symbols.splice(index, 1, value)
      if (!['image', 'svg'].includes(value)) {
        this.series[index].symbol = value
      }
    },
    imageChange(value, index) {
      this.images.splice(index, 1, value)
      this.series[index].symbol = `image://${value}`
    },
    svgChange(value, index) {
      this.svgs.splice(index, 1, value)
      this.series[index].symbol = `path://${value}`
    },
  },
  components: {
    SvCheckbox,
    SvTextarea,
    SvSelectOption,
    SvSelect,
    SvInput,
    Slider,
    EchartsSeriesLabel,
    EchartsSeriesMark,
    Radio,
    RadioGroup,
    SvColor,
    NumberInput,
    FoldIn,
    FormRow,
    Fold,
    Upload,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.operate-icon
  cursor pointer

  &:hover
    color theme-color

.slider
  width 150px

.center
  display flex
  align-items center

.explain
  margin-left 5px
  color theme-color
</style>
