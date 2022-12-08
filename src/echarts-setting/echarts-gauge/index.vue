<template>
  <fold label="仪表盘设置">
    <div slot="content">
      <fold-in label="位置" :can-open="false">
        <div slot="content">
          <form-row label="水平方向">
            <number-input
              :min="0"
              :max="100"
              :parse="parsePercent"
              :formatter="formatterPercent"
              v-model="series[0].center[0]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="竖直方向">
            <number-input
              :min="0"
              :max="100"
              :parse="parsePercent"
              :formatter="formatterPercent"
              v-model="series[0].center[1]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <form-row label="仪表盘半径">
        <number-input
          :min="0"
          :max="100"
          :parse="parsePercent"
          :formatter="formatterPercent"
          v-model="series[0].radius"
        >
          <span slot="suffix">%</span>
        </number-input>
      </form-row>
      <form-row>
        <div slot="label" class="label">
          <span>起始角度</span>
          <el-tooltip placement="top">
            <i class="explain iconfont sv-Group-"></i>
            <template slot="title">
              <span>圆心 正右手侧为0度，正上方为90度，正左手侧为180度。</span>
            </template>
          </el-tooltip>
        </div>
        <number-input v-model="series[0].startAngle" />
      </form-row>
      <form-row>
        <div slot="label" class="label">
          <span>结束角度</span>
          <el-tooltip placement="top">
            <i class="explain iconfont sv-Group-"></i>
            <template slot="title">
              <span>圆心 正右手侧为0度，正上方为90度，正左手侧为180度。</span>
            </template>
          </el-tooltip>
        </div>
        <number-input v-model="series[0].endAngle" />
      </form-row>
      <form-row label="刻度顺时针增长">
        <sv-checkbox v-model="series[0].clockwise" />
      </form-row>
      <form-row label="最大值">
        <number-input v-model="series[0].max" />
      </form-row>
      <form-row label="最小值">
        <number-input v-model="series[0].min" />
      </form-row>
      <form-row label="刻度分割段数">
        <number-input v-model="series[0].splitNumber" />
      </form-row>
      <fold-in label="轴线配置">
        <sv-checkbox slot="pane-right" v-model="series[0].axisLine.show" />
        <div slot="content">
          <form-row label="轴线宽度">
            <number-input v-model="series[0].axisLine.lineStyle.width" />
          </form-row>
          <form-row label="轴线透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="series[0].axisLine.lineStyle.opacity"
            />
          </form-row>
          <fold-in>
            <div slot="label" class="label">
              <span>轴线颜色</span>
              <el-tooltip>
                <i class="explain iconfont sv-Group-"></i>
                <template slot="title">
                  <span>结束位置取值范围在0-1</span>
                </template>
              </el-tooltip>
            </div>
            <i
              slot="pane-right"
              class="operate-icon iconfont sv-tianjia1"
              @click="addColor"
            ></i>
            <div slot="content">
              <fold-in
                v-for="(item, index) in series[0].axisLine.lineStyle.color"
                :key="index"
                :label="`分段【${index + 1}】`"
                :can-open="false"
              >
                <i
                  slot="pane-right"
                  class="operate-icon iconfont sv-jian"
                  @click="removeColor(index)"
                ></i>
                <div slot="content">
                  <form-row label="结束位置">
                    <number-input
                      :min="0"
                      :max="1"
                      v-model="series[0].axisLine.lineStyle.color[index][0]"
                    />
                  </form-row>
                  <form-row label="分段颜色">
                    <sv-color
                      v-model="series[0].axisLine.lineStyle.color[index][1]"
                    />
                  </form-row>
                </div>
              </fold-in>
            </div>
          </fold-in>
        </div>
      </fold-in>
      <fold-in label="分割线样式">
        <sv-checkbox slot="pane-right" v-model="series[0].splitLine.show" />
        <div slot="content">
          <form-row label="分割线长度">
            <number-input :min="0" v-model="series[0].splitLine.length" />
          </form-row>
          <form-row label="分割线宽度">
            <number-input
              :min="0"
              v-model="series[0].splitLine.lineStyle.width"
            />
          </form-row>
          <form-row label="分割线类型">
            <sv-select v-model="series[0].splitLine.lineStyle.type">
              <sv-select-option
                v-for="item in lineTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="分割线颜色">
            <sv-color v-model="series[0].splitLine.lineStyle.color" />
          </form-row>
          <form-row label="分割线透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="series[0].splitLine.lineStyle.opacity"
            />
          </form-row>
        </div>
      </fold-in>
      <fold-in>
        <div slot="label" class="label">
          <span>刻度设置</span>
          <el-tooltip placement="top">
            <i class="explain iconfont sv-Group-"></i>
            <template slot="title">
              <span>分割线之间的刻度</span>
            </template>
          </el-tooltip>
        </div>
        <sv-checkbox slot="pane-right" v-model="series[0].axisTick.show" />
        <div slot="content">
          <form-row label="分割线之间的刻度数">
            <number-input v-model="series[0].axisTick.splitNumber" />
          </form-row>
          <form-row label="刻度线长度">
            <number-input v-model="series[0].axisTick.length" />
          </form-row>
          <form-row label="刻度线宽度">
            <number-input v-model="series[0].axisTick.lineStyle.width" />
          </form-row>
          <form-row label="刻度线类型">
            <sv-select v-model="series[0].axisTick.lineStyle.type">
              <sv-select-option
                v-for="item in lineTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="刻度线颜色">
            <sv-color v-model="series[0].axisTick.lineStyle.color" />
          </form-row>
          <form-row label="分割线透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="series[0].axisTick.lineStyle.opacity"
            />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="刻度标签">
        <sv-checkbox slot="pane-right" v-model="series[0].axisLabel.show" />
        <div slot="content">
          <form-row label="标签与刻度线距离">
            <number-input v-model="series[0].axisLabel.distance" />
          </form-row>
          <form-row label="内容格式器" dir="column">
            <function-input v-model="series[0].axisLabel.formatter" />
          </form-row>
          <form-row label="文字大小">
            <number-input v-model="series[0].axisLabel.fontSize" />
          </form-row>
          <form-row label="文字粗细">
            <sv-select v-model="series[0].axisLabel.fontWeight">
              <sv-select-option
                v-for="item in fontWeightTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="文字颜色">
            <sv-color v-model="series[0].axisLabel.color" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="仪表盘指针">
        <sv-checkbox slot="pane-right" v-model="series[0].pointer.show" />
        <div slot="content">
          <form-row label="指针长度">
            <number-input
              :min="0"
              :max="100"
              :formatter="formatterPercent"
              :parse="parsePercent"
              v-model="series[0].pointer.length"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="指针宽度">
            <number-input v-model="series[0].pointer.width" />
          </form-row>
          <fold-in label="指针颜色" :can-open="false">
            <div slot="pane-right">
              <radio-group
                v-model="pointerColorType"
                @change="pointerColorTypeChange"
              >
                <radio value="auto">
                  跟随轴区间颜色
                </radio>
                <radio value="custom">
                  自定义
                </radio>
              </radio-group>
            </div>
            <div slot="content" v-if="pointerColorType === 'custom'">
              <form-row label="自定义颜色">
                <sv-color v-model="series[0].itemStyle.color" />
              </form-row>
            </div>
          </fold-in>
          <form-row label="指针描边颜色">
            <sv-color v-model="series[0].itemStyle.borderColor" />
          </form-row>
          <form-row label="指针描边宽度">
            <number-input :min="0" v-model="series[0].itemStyle.borderWidth" />
          </form-row>
          <form-row label="描边类型">
            <sv-select v-model="series[0].itemStyle.borderType">
              <sv-select-option
                v-for="item in lineTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="指针透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="series[0].itemStyle.opacity"
            />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="标题">
        <sv-checkbox slot="pane-right" v-model="series[0].title.show" />
        <div slot="content">
          <form-row label="水平偏移量">
            <number-input v-model="series[0].title.offsetCenter[0]" />
          </form-row>
          <form-row label="竖直偏移量">
            <number-input v-model="series[0].title.offsetCenter[1]" />
          </form-row>
          <form-row label="文字大小">
            <number-input v-model="series[0].title.fontSize" />
          </form-row>
          <form-row label="文字粗细">
            <sv-select v-model="series[0].title.fontWeight">
              <sv-select-option
                v-for="item in fontWeightTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="文字颜色">
            <sv-color v-model="series[0].title.color" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="仪表盘详情">
        <sv-checkbox slot="pane-right" v-model="series[0].detail.show" />
        <div slot="content">
          <form-row label="内容格式器" dir="column">
            <function-input v-model="series[0].detail.formatter" />
          </form-row>
          <form-row label="水平偏移量">
            <number-input v-model="series[0].detail.offsetCenter[0]" />
          </form-row>
          <form-row label="竖直偏移量">
            <number-input v-model="series[0].detail.offsetCenter[1]" />
          </form-row>
          <form-row label="文字大小">
            <number-input v-model="series[0].detail.fontSize" />
          </form-row>
          <form-row label="文字粗细">
            <sv-select v-model="series[0].detail.fontWeight">
              <sv-select-option
                v-for="item in fontWeightTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="文字颜色">
            <sv-color v-model="series[0].detail.color" />
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import { EchartsSeriesRespondMixins } from '@/mixins'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvColor from '@/setting-component/sv-color/index'
import Slider from '@/setting-component/slider/index'
import { LINE_TYPES, FONT_WEIGHT_TYPES } from '@/constants/echarts-constans'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import FunctionInput from '@/setting-component/function-input/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio/index'

export default {
  name: 'EchartsGauge',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      lineTypes: LINE_TYPES,
      fontWeightTypes: FONT_WEIGHT_TYPES,
      pointerColorType: 'auto',
    }
  },
  methods: {
    parsePercent: (value) => value.replace('%', ''),
    formatterPercent: (value) => `${value}%`,
    // 添加分段颜色
    addColor() {
      this.series[0].axisLine.lineStyle.color.push([0, '#ffffff'])
    },
    // 删除分段颜色
    removeColor(index) {
      this.series[0].axisLine.lineStyle.color.splice(index)
    },
    pointerColorTypeChange(value) {
      if (value === 'custom') {
        this.series[0].itemStyle.color = '#ffffff'
      } else if (value === 'auto') {
        this.series[0].itemStyle.color = 'auto'
      }
    },
  },
  components: {
    Radio,
    RadioGroup,
    FunctionInput,
    SvSelectOption,
    SvSelect,
    SvColor,
    Slider,
    FoldIn,
    SvCheckbox,
    NumberInput,
    FormRow,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
 @import "~@/stylus/index.styl"
.label
   display flex
   align-items center

   .explain
     margin-left 6px
     cursor pointer
     color theme-color

 .operate-icon
   cursor pointer

   &:hover
     color theme-color

 .slider
   width 150px
</style>
