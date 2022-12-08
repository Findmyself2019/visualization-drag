<!-- 地图飞线设置 echarts series type=lines -->
<template>
  <fold label="飞线配置" :can-open="false">
    <div slot="content">
      <fold-in label="两端标记">
        <div slot="content">
          <form-row label="起始图形">
            <sv-select v-model="curSeries.symbol[0]">
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
          <form-row label="结束图形">
            <sv-select v-model="curSeries.symbol[1]">
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
          <form-row label="起始图形大小">
            <number-input :min="0" v-model="curSeries.symbolSize[0]" />
          </form-row>
          <form-row label="结束图形大小">
            <number-input :min="0" v-model="curSeries.symbolSize[1]" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="特效配置">
        <div slot="pane-right">
          <sv-checkbox v-model="curSeries.effect.show" />
        </div>
        <div slot="content">
          <form-row label="循环动画">
            <div class="center">
              <sv-checkbox v-model="curSeries.effect.loop" />
            </div>
          </form-row>
          <form-row label="动画时间">
            <number-input :min="0" v-model="curSeries.effect.period">
              <span slot="suffix">s</span>
            </number-input>
          </form-row>
          <form-row label="动画延时">
            <number-input :min="0" v-model="curSeries.effect.delay">
              <span slot="suffix">ms</span>
            </number-input>
          </form-row>
          <form-row label="图形类型">
            <sv-select v-model="curSeries.effect.symbol">
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
            <number-input :min="0" v-model="curSeries.effect.symbolSize" />
          </form-row>
          <form-row label="颜色">
            <sv-color v-model="curSeries.effect.color" />
          </form-row>
          <form-row label="特效尾迹长度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="curSeries.effect.trailLength"
            />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="线条样式">
        <div slot="content">
          <form-row label="线条颜色">
            <sv-color v-model="curSeries.lineStyle.color" />
          </form-row>
          <form-row label="线条宽度">
            <number-input :min="0" v-model="curSeries.lineStyle.width" />
          </form-row>
          <form-row label="线条类型">
            <sv-select v-model="curSeries.lineStyle.type">
              <sv-select-option
                v-for="(item, index) in lineTypes"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="curSeries.lineStyle.opacity"
            />
          </form-row>
          <form-row label="线条曲度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="curSeries.lineStyle.curveness"
            />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="文本">
        <div slot="pane-right">
          <sv-checkbox v-model="curSeries.label.show" />
        </div>
        <div slot="content">
          <form-row label="文本位置">
            <sv-select v-model="curSeries.label.position">
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
          <form-row label="文本大小">
            <number-input :min="0" v-model="curSeries.label.fontSize" />
          </form-row>
          <form-row label="文本颜色">
            <sv-color v-model="curSeries.label.color" />
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import { EchartsSeriesRespondMixins } from '@/mixins'
import { mapState } from 'vuex'
import Fold from '@/setting-component/fold/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import { LINE_TYPES, SYMBOL_TYPES } from '@/constants/echarts-constans'
import SvColor from '@/setting-component/sv-color/index'
import Slider from '@/setting-component/slider/index'

export default {
  name: 'EchartsMapLines',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      symbolTypes: SYMBOL_TYPES,
      lineTypes: LINE_TYPES,
      positionTypes: [
        {
          label: '起始点',
          value: 'start',
        },
        {
          label: '中点',
          value: 'middle',
        },
        {
          label: '结束点',
          value: 'end',
        },
      ],
    }
  },
  computed: {
    ...mapState('workbench', ['seriesIndex']),
    curSeries() {
      return this.series[this.seriesIndex]
    },
  },
  components: {
    Slider,
    SvColor,
    SvSelectOption,
    SvSelect,
    NumberInput,
    FormRow,
    SvCheckbox,
    FoldIn,
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
