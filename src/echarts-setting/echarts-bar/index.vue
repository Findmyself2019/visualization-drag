<!-- series type=bar 配置 -->
<template>
  <fold label="柱子系列配置">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addSeries"></i>
    </div>
    <div slot="content">
      <form-row label="不同系列柱子间距" v-if="barSeries.length > 1">
        <number-input
          :min="-100"
          :max="100"
          :parse="parse"
          :formatter="formatter"
          v-model="barSeries[barSeries.length - 1].serie.barGap"
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
          v-model="barSeries[barSeries.length - 1].serie.barCategoryGap"
        >
          <span slot="suffix">%</span>
        </number-input>
      </form-row>
      <fold-in
        v-for="({ serie, serieIndex }, index1) in barSeries"
        :key="index1"
        :label="`柱子【${index1 + 1}】`"
      >
        <div slot="pane-right" v-if="barSeries.length > 1">
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
          <form-row v-if="series.length > 1">
            <div slot="label" class="center">
              <span>堆叠标识</span>
              <el-tooltip>
                <div slot="title" style="font-size: 12px">
                  该字段一致方可堆叠柱状图
                </div>
                <i class="explain iconfont sv-Group-"></i>
              </el-tooltip>
            </div>
            <sv-input v-model="serie.stack" />
          </form-row>
          <echarts-series-label :series="serie" />
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
              <fold-in label="柱子圆角" :can-open="false">
                <div slot="content">
                  <form-row label="左上">
                    <number-input
                      v-model="serie.itemStyle.barBorderRadius[0]"
                      :min="0"
                    />
                  </form-row>
                  <form-row label="右上">
                    <number-input
                      v-model="serie.itemStyle.barBorderRadius[1]"
                      :min="0"
                    />
                  </form-row>
                  <form-row label="左下">
                    <number-input
                      v-model="serie.itemStyle.barBorderRadius[2]"
                      :min="0"
                    />
                  </form-row>
                  <form-row label="右下">
                    <number-input
                      v-model="serie.itemStyle.barBorderRadius[3]"
                      :min="0"
                    />
                  </form-row>
                </div>
              </fold-in>
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
          <fold-in label="柱子背景">
            <div slot="pane-right">
              <sv-checkbox v-model="serie.showBackground" />
            </div>
            <div slot="content">
              <form-row label="背景色">
                <sv-color v-model="serie.backgroundStyle.color" />
              </form-row>
              <fold-in label="背景圆角" :can-open="false">
                <div slot="content">
                  <form-row label="左上">
                    <number-input
                      v-model="serie.backgroundStyle.barBorderRadius[0]"
                      :min="0"
                    />
                  </form-row>
                  <form-row label="右上">
                    <number-input
                      v-model="serie.backgroundStyle.barBorderRadius[1]"
                      :min="0"
                    />
                  </form-row>
                  <form-row label="左下">
                    <number-input
                      v-model="serie.backgroundStyle.barBorderRadius[2]"
                      :min="0"
                    />
                  </form-row>
                  <form-row label="右下">
                    <number-input
                      v-model="serie.backgroundStyle.barBorderRadius[3]"
                      :min="0"
                    />
                  </form-row>
                </div>
              </fold-in>
              <form-row label="透明度">
                <slider
                  class="slider"
                  :mim="0"
                  :max="1"
                  :step="0.01"
                  v-model="serie.backgroundStyle.opacity"
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
import FormRow from '@/setting-component/form-row/index'
import FoldIn from '@/setting-component/fold-in/index'
import NumberInput from '@/setting-component/number-input/index'
import SvColor from '@/setting-component/sv-color/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio/index'
import EchartsSeriesMark from '@/echarts-setting/echarts-series-mark/index'
import EchartsSeriesLabel from '@/echarts-setting/echarts-series-label/index'
import Slider from '@/setting-component/slider/index'
import SvInput from '@/setting-component/sv-input/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import SvSelect from '@/setting-component/sv-select'
import { EchartsSeriesRespondMixins } from '@/mixins'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'EchartsBar',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      barWidthType: 'auto',
      barWidthOfSetting: 20,
      barWidthSettings: [],
    }
  },
  computed: {
    ...mapState('echartsSetting', ['xAxis', 'yAxis']),
    isCustom() {
      return this.defaultLine === 'custom'
    },
    // 存在线柱混合图，为了提高组件复用性，使用该计算属性
    barSeries() {
      return this.series.reduce((res, item, index) => {
        if (item.type === 'bar') {
          res.push({
            serie: item,
            serieIndex: index,
          })
        }
        return res
      }, [])
    },
  },
  created() {
    this.barSeries.forEach((item) => {
      if (item.serie.barWidth === 'auto') {
        this.barWidthSettings.push({
          barWidthType: 'auto',
          barWidthOfSetting: 20,
        })
      } else {
        this.barWidthSettings.push({
          barWidthType: 'setting',
          barWidthOfSetting: item.serie.barWidth || 20,
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
            this.barSeries[index].serie.barWidth = 'auto'
          } else if (item.barWidthType === 'setting') {
            this.barSeries[index].serie.barWidth = item.barWidthOfSetting
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
      this.series.push(
        _.cloneDeep(this.barSeries[this.barSeries.length - 1].serie)
      )
      this.barWidthSettings.push(
        _.cloneDeep(this.barWidthSettings[this.barWidthSettings.length - 1])
      )
    },
    // 删除系列
    removeSeries(index) {
      this.series.splice(index, 1)
      this.barWidthSettings.splice(index, 1)
    },
  },
  components: {
    SvSelect,
    SvSelectOption,
    SvCheckbox,
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
