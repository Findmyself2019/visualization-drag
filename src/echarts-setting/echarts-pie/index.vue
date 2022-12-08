<!-- series type=pie 配置 -->
<template>
  <fold label="饼图系列配置">
    <div slot="content">
      <form-row label="选中模式">
        <sv-select v-model="curSeries.selectedMode">
          <sv-select-option
            v-for="(item, index) in selectedModes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <fold-in label="转为南丁格尔图" :can-open="false">
        <div slot="pane-right">
          <sv-checkbox v-model="isRose" />
        </div>
        <div slot="content" v-if="isRose">
          <form-row label="显示模式">
            <sv-select v-model="curSeries.roseType">
              <sv-select-option
                v-for="(item, index) in roseTypes"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
        </div>
      </fold-in>
      <form-row label="防止标签重叠">
        <div class="center">
          <sv-checkbox v-model="curSeries.avoidLabelOverlap" />
        </div>
      </form-row>
      <form-row label="数据和为0显示扇区">
        <div class="center">
          <sv-checkbox v-model="curSeries.stillShowZeroSum" />
        </div>
      </form-row>
      <form-row label="最小角度">
        <slider
          class="slider"
          v-model="curSeries.minAngle"
          :max="360"
          :min="0"
        />
      </form-row>
      <fold-in label="圆心位置" :can-open="false">
        <div slot="content">
          <form-row label="水平方向">
            <number-input
              :min="0"
              :max="100"
              :parse="parse"
              :formatter="formatter"
              v-model="curSeries.center[0]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="竖直方向">
            <number-input
              :min="0"
              :max="100"
              :parse="parse"
              :formatter="formatter"
              v-model="curSeries.center[1]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <fold-in label="饼图半径" :can-open="false">
        <div slot="content">
          <form-row label="内半径">
            <number-input
              :min="0"
              :max="100"
              :parse="parse"
              :formatter="formatter"
              v-model="curSeries.radius[0]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="外半径">
            <number-input
              :min="0"
              :max="100"
              :parse="parse"
              :formatter="formatter"
              v-model="curSeries.radius[1]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <fold-in label="引导线">
        <div slot="pane-right">
          <sv-checkbox v-model="curSeries.labelLine.show" />
        </div>
        <div slot="content">
          <form-row label="第一段长度">
            <number-input v-model="curSeries.labelLine.length" />
          </form-row>
          <form-row label="第二段长度">
            <number-input v-model="curSeries.labelLine.length2" />
          </form-row>
          <form-row label="平滑引导线">
            <div class="center">
              <sv-checkbox v-model="curSeries.labelLine.smooth" />
            </div>
          </form-row>
          <form-row label="引导线宽度">
            <number-input
              :min="0"
              v-model="curSeries.labelLine.lineStyle.width"
            />
          </form-row>
          <form-row label="线条类型">
            <sv-select v-model="curSeries.labelLine.lineStyle.type">
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
              v-model="curSeries.labelLine.lineStyle.opacity"
            />
          </form-row>
        </div>
      </fold-in>
      <echarts-series-label
        :series="curSeries"
        :position-types="positionTypes"
      />
      <fold-in label="扇形样式">
        <div slot="content">
          <fold-in label="边框设置" :can-open="false">
            <div slot="content">
              <form-row label="边框宽度">
                <number-input v-model="curSeries.itemStyle.borderWidth" />
              </form-row>
              <form-row label="边框颜色">
                <sv-color v-model="curSeries.itemStyle.borderColor" />
              </form-row>
              <form-row label="边框类型">
                <sv-select v-model="curSeries.itemStyle.borderType">
                  <sv-select-option
                    v-for="type in lineTypes"
                    :key="type.value"
                    :label="type.label"
                    :value="type.value"
                  >
                    {{ type.label }}
                  </sv-select-option>
                </sv-select>
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
import EchartsSeriesLabel from '@/echarts-setting/echarts-series-label/index'
import { EchartsSeriesRespondMixins } from '@/mixins'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvSelect from '@/setting-component/sv-select/index'
import { LINE_TYPES, SELECTED_MODE } from '@/constants/echarts-constans'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import Slider from '@/setting-component/slider/index'
import SvColor from '@/setting-component/sv-color/index'

export default {
  name: 'EchartsPie',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      positionTypes: [
        {
          label: '饼图外侧',
          value: 'outside',
        },
        {
          label: '饼图内部',
          value: 'inside',
        },
        {
          label: '饼图中心',
          value: 'center',
        },
      ],
      roseTypes: [
        {
          label: 'radius',
          value: 'radius',
        },
        {
          label: 'area',
          value: 'area',
        },
      ],
      selectedModes: SELECTED_MODE,
      lineTypes: LINE_TYPES,
      isRose: false,
    }
  },
  watch: {
    isRose(value) {
      if (value) {
        this.curSeries.roseType === undefined &&
          this.$set(this.curSeries, 'roseType', 'radius')
        this.curSeries.roseType === false &&
          (this.curSeries.roseType = 'radius')
      } else {
        this.curSeries.roseType = false
      }
    },
  },
  mounted() {
    const { roseType } = this.curSeries
    if (roseType === undefined || roseType === false) {
      this.isRose = false
    } else {
      this.isRose = true
    }
  },
  methods: {
    parse: (value) => value.replace('%', ''),
    formatter: (value) => `${value}%`,
  },
  components: {
    SvColor,
    Slider,
    SvSelectOption,
    SvSelect,
    FoldIn,
    SvCheckbox,
    NumberInput,
    FormRow,
    EchartsSeriesLabel,
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
