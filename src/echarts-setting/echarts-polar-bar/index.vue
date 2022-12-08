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
              <form-row label="radius">
                <sv-input v-model="serie.encode.radius" />
              </form-row>
              <form-row label="angle">
                <sv-input v-model="serie.encode.angle" />
              </form-row>
            </div>
          </fold-in>
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
              <form-row label="两端圆弧">
                <sv-checkbox v-model="serie.roundCap" />
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
          <fold-in label="柱子背景">
            <div slot="pane-right">
              <sv-checkbox v-model="serie.showBackground" />
            </div>
            <div slot="content">
              <form-row label="背景色">
                <sv-color v-model="serie.backgroundStyle.color" />
              </form-row>
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
import { EchartsSeriesRespondMixins } from '@/mixins'
import EchartsSeriesLabel from '@/echarts-setting/echarts-series-label/index'
import Slider from '@/setting-component/slider/index'
import SvInput from '@/setting-component/sv-input/index'
import _ from 'lodash'
import SvCheckbox from '@/setting-component/sv-checkbox/index'

export default {
  name: 'EchartsPolarBar',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      barWidthType: 'auto',
      barWidthOfSetting: 20,
      barWidthSettings: [],
    }
  },
  computed: {
    isCustom() {
      return this.defaultLine === 'custom'
    },
  },
  created() {
    this.series.forEach((item) => {
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
      this.barWidthSettings.push(_.cloneDeep(this.barWidthSettings[0]))
    },
    // 删除系列
    removeSeries(index) {
      this.series.splice(index, 1)
      this.barWidthSettings.splice(index, 1)
    },
  },
  components: {
    SvCheckbox,
    SvInput,
    Slider,
    EchartsSeriesLabel,
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
