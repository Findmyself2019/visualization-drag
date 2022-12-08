<template>
  <fold label="散点系列配置">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addSeries"></i>
    </div>
    <div slot="content">
      <fold-in
        :label="`散点【${index1 + 1}】`"
        v-for="(serie, index1) in series"
        :key="index1"
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
          <form-row label="应用x轴">
            <sv-select v-model="serie.xAxisIndex">
              <sv-select-option
                v-for="(item, index) in xAxis"
                :key="index"
                :label="`轴${index + 1}`"
                :value="index"
              >
                轴{{ index + 1 }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="应用y轴">
            <sv-select v-model="serie.yAxisIndex">
              <sv-select-option
                v-for="(item, index) in yAxis"
                :key="index"
                :label="`轴${index + 1}`"
                :value="index"
              >
                轴{{ index + 1 }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <fold-in label="散点样式">
            <div slot="content">
              <form-row label="图形类型">
                <sv-select v-model="serie.symbol">
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
                <radio-group
                  :value="sizeOfNumber(serie)"
                  @input="changeSizeType($event, index1)"
                >
                  <radio :value="true">
                    固定大小
                  </radio>
                  <radio :value="false">
                    随机大小
                  </radio>
                </radio-group>
              </form-row>
              <form-row v-if="sizeOfNumber(serie)">
                <number-input :min="0" v-model="serie.symbolSize" />
              </form-row>
              <function-input v-model="serie.symbolSize" v-else />
              <form-row label="旋转角度">
                <slider
                  class="slider"
                  :min="-360"
                  :max="360"
                  v-model="serie.symbolRotate"
                />
              </form-row>
              <form-row label="图形颜色">
                <sv-color v-model="serie.itemStyle.color" />
              </form-row>
              <form-row label="透明度">
                <slider
                  class="slider"
                  :min="0"
                  :max="1"
                  :step="0.01"
                  v-model="serie.itemStyle.opacity"
                />
              </form-row>
            </div>
          </fold-in>
          <echarts-series-label :series="serie" />
          <echarts-series-mark :series="serie" />
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
import EchartsSeriesMark from '@/echarts-setting/echarts-series-mark/index'
import EchartsSeriesLabel from '@/echarts-setting/echarts-series-label/index'
import NumberInput from '@/setting-component/number-input/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import SvInput from '@/setting-component/sv-input/index'
import SvColor from '@/setting-component/sv-color/index'
import Slider from '@/setting-component/slider/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio'
import FunctionInput from '@/setting-component/function-input'
import { EchartsSeriesRespondMixins } from '@/mixins'
import { SYMBOL_TYPES } from '@/constants/echarts-constans'
import { mapState } from 'vuex'

export default {
  name: 'EchartsScatter',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      symbolTypes: SYMBOL_TYPES,
      symbolSizeArrOfNumber: [], // symbolSize缓存(number)
      symbolSizeArrOfFunction: [], // symbolSize缓存(function)
    }
  },
  computed: {
    ...mapState('echartsSetting', ['xAxis', 'yAxis']),
    sizeOfNumber() {
      return function(serie) {
        return typeof serie.symbolSize === 'number'
      }
    },
  },
  mounted() {
    this.series.forEach(({ symbolSize }) => {
      if (typeof symbolSize === 'number') {
        this.symbolSizeArrOfNumber.push(symbolSize)
        this.symbolSizeArrOfFunction.push(
          new Function('value', 'params', 'return 15;')
        )
      } else {
        this.symbolSizeArrOfNumber.push(15)
        this.symbolSizeArrOfFunction.push(symbolSize)
      }
    })
  },
  methods: {
    changeSizeType(e, index) {
      const { symbolSizeArrOfNumber, symbolSizeArrOfFunction } = this
      // 固定大小
      if (e) {
        this.symbolSizeArrOfFunction[index] = this.series[index].symbolSize
        this.series[index].symbolSize = symbolSizeArrOfNumber[index]
      } else {
        // 随机大小
        this.symbolSizeArrOfNumber[index] = this.series[index].symbolSize
        this.series[index].symbolSize = symbolSizeArrOfFunction[index]
      }
    },
  },
  components: {
    FunctionInput,
    Radio,
    RadioGroup,
    SvColor,
    SvInput,
    SvSelectOption,
    NumberInput,
    EchartsSeriesLabel,
    EchartsSeriesMark,
    SvSelect,
    FormRow,
    FoldIn,
    Fold,
    Slider,
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
</style>
