<!-- series type=line 配置 -->
<template>
  <fold label="折线系列配置">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addSeries"></i>
    </div>
    <div slot="content">
      <fold-in
        :label="`折线【${index1 + 1}】`"
        v-for="({ serie, serieIndex }, index1) in lineSeries"
        :key="index1"
      >
        <div slot="pane-right" v-if="lineSeries.length > 1">
          <i
            class="operate-icon iconfont sv-jian"
            @click="removeSeries(serieIndex)"
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
          <form-row label="转为阶梯线图">
            <div class="center">
              <sv-checkbox v-model="serie.step" />
            </div>
          </form-row>
          <form-row label="连接空数据">
            <div class="center">
              <sv-checkbox v-model="serie.connectNulls" />
            </div>
          </form-row>
          <form-row label="开启平滑曲线">
            <div class="center">
              <sv-checkbox v-model="serie.smooth" />
            </div>
          </form-row>
          <fold-in label="拐点图形">
            <div slot="pane-right">
              <sv-checkbox v-model="serie.showSymbol" />
            </div>
            <div slot="content">
              <form-row label="标记图形">
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
                <number-input :min="0" v-model="serie.symbolSize" />
              </form-row>
              <form-row label="图形描边线宽">
                <number-input
                  :min="0"
                  :step="1"
                  v-model="serie.itemStyle.borderWidth"
                />
              </form-row>
              <form-row label="图形描边类型">
                <sv-select v-model="serie.itemStyle.borderType">
                  <sv-select-option
                    v-for="item in lineTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="图形描边颜色">
                <sv-color v-model="serie.itemStyle.borderColor" />
              </form-row>
              <form-row label="旋转角度">
                <number-input
                  :min="-360"
                  :max="360"
                  v-model="serie.symbolRotate"
                >
                  <span slot="suffix">°</span>
                </number-input>
              </form-row>
              <form-row label="显示策略">
                <sv-select v-model="serie.showAllSymbol">
                  <sv-select-option
                    v-for="(item, index) in allStrategy"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="图形颜色">
                <sv-color v-model="serie.itemStyle.color" />
              </form-row>
              <form-row label="透明度">
                <slider
                  class="slider"
                  :mim="0"
                  :max="1"
                  :step="0.01"
                  v-model="serie.itemStyle.opacity"
                />
              </form-row>
            </div>
          </fold-in>
          <echarts-series-label :series="serie" />
          <fold-in label="线条样式">
            <div slot="content">
              <form-row label="线条颜色">
                <sv-color v-model="serie.lineStyle.color" />
              </form-row>
              <form-row label="线条宽度">
                <number-input v-model="serie.lineStyle.width" />
              </form-row>
              <form-row label="线条类型">
                <sv-select v-model="serie.lineStyle.type">
                  <sv-select-option
                    v-for="(item, index) in lineTypes"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="透明度">
                <slider
                  class="slider"
                  :mim="0"
                  :max="1"
                  :step="0.01"
                  v-model="serie.lineStyle.opacity"
                />
              </form-row>
            </div>
          </fold-in>
          <fold-in label="区域填充样式">
            <div slot="content">
              <form-row label="填充颜色">
                <sv-color v-model="serie.areaStyle.color" />
              </form-row>
              <form-row label="透明度">
                <slider
                  class="slider"
                  :mim="0"
                  :max="1"
                  :step="0.01"
                  v-model="serie.areaStyle.opacity"
                />
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
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import NumberInput from '@/setting-component/number-input/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import SvColor from '@/setting-component/sv-color/index'
import EchartsSeriesMark from '@/echarts-setting/echarts-series-mark/index'
import EchartsSeriesLabel from '@/echarts-setting/echarts-series-label/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import Slider from '@/setting-component/slider/index'
import SvInput from '@/setting-component/sv-input/index'
import _ from 'lodash'
import { mapState } from 'vuex'
import { EchartsSeriesRespondMixins } from '@/mixins'
import { LINE_TYPES, SYMBOL_TYPES } from '@/constants/echarts-constans'

export default {
  name: 'EchartsLine',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      symbolTypes: SYMBOL_TYPES,
      allStrategy: [
        {
          label: '自动显示',
          value: 'auto',
        },
        {
          label: '全部显示',
          value: true,
        },
        {
          label: '跟随主轴显示',
          value: false,
        },
      ],
      lineTypes: LINE_TYPES,
    }
  },
  computed: {
    ...mapState('echartsSetting', ['xAxis', 'yAxis']),
    // 存在线柱混合图，为了提高组件复用性，使用该计算属性
    lineSeries() {
      return this.series.reduce((res, item, index) => {
        if (item.type === 'line') {
          res.push({
            serie: item,
            serieIndex: index,
          })
        }
        return res
      }, [])
    },
  },
  methods: {
    addSeries() {
      this.series.push(
        _.cloneDeep(this.lineSeries[this.lineSeries.length - 1].serie)
      )
    },
    // 删除系列
    removeSeries(index) {
      this.series.splice(index, 1)
    },
  },
  components: {
    SvInput,
    Slider,
    SvSelectOption,
    EchartsSeriesLabel,
    EchartsSeriesMark,
    SvColor,
    NumberInput,
    SvSelect,
    FormRow,
    FoldIn,
    Fold,
    SvCheckbox,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.operate-icon
  cursor pointer

  &:hover
    color theme-color

.center
  height 100%
  display flex
  align-items center

.slider
  width 150px
</style>
