<template>
  <fold label="水球图系列配置">
    <div slot="content">
      <form-row label="水球形状">
        <sv-select v-model="series[0].shape">
          <sv-select-option
            v-for="item in shapes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="水球半径大小">
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
      <fold-in :can-open="false" label="水球位置">
        <div slot="content">
          <form-row label="左">
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
          <form-row label="上">
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
      <fold-in label="水球设置">
        <div slot="content">
          <form-row label="边框宽度">
            <number-input
              v-model="series[0].backgroundStyle.borderWidth"
              :min="0"
            />
          </form-row>
          <form-row label="边框颜色">
            <sv-color v-model="series[0].backgroundStyle.bordercolor" />
          </form-row>
          <form-row label="阴影范围">
            <number-input
              v-model="series[0].backgroundStyle.shadowBlur"
              :min="0"
            />
          </form-row>
          <form-row label="阴影颜色">
            <sv-color v-model="series[0].backgroundStyle.shadowColor" />
          </form-row>
          <form-row label="背景色">
            <sv-color v-model="series[0].backgroundStyle.color" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="轮廓">
        <div slot="pane-right">
          <sv-checkbox v-model="series[0].outline.show" />
        </div>
        <div slot="content">
          <form-row label="轮廓与水球间距">
            <number-input v-model="series[0].outline.borderDistance" :min="0" />
          </form-row>
          <form-row label="轮廓颜色">
            <sv-color v-model="series[0].outline.itemStyle.borderColor" />
          </form-row>
          <form-row label="轮廓宽度">
            <number-input
              v-model="series[0].outline.itemStyle.borderWidth"
              :min="0"
            />
          </form-row>
          <form-row label="轮廓阴影颜色">
            <sv-color v-model="series[0].outline.itemStyle.shadowColor" />
          </form-row>
          <form-row label="轮廓阴影范围">
            <number-input
              v-model="series[0].outline.itemStyle.shadowBlur"
              :min="0"
            />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="波浪样式">
        <div slot="content">
          <fold-in :can-open="false" label="波浪颜色">
            <div slot="pane-right">
              <i class="iconfont sv-tianjia1" @click="addColor"></i>
            </div>
            <div slot="content">
              <div
                class="color-item"
                v-for="(item, index) in series[0].color"
                :key="index"
              >
                <div class="color-left">
                  <span class="index">{{ index + 1 }}</span>
                  <sv-color v-model="series[0].color[index]" />
                </div>
                <i class="iconfont sv-jian" @click="removeColor(index)"></i>
              </div>
            </div>
          </fold-in>
          <form-row label="透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="series[0].itemStyle.opacity"
            />
          </form-row>
          <form-row label="鼠标经过时透明度">
            <slider
              class="slider"
              :min="0"
              :max="1"
              :step="0.01"
              v-model="series[0].emphasis.itemStyle.opacity"
            />
          </form-row>
          <form-row label="阴影颜色">
            <sv-color v-model="series[0].itemStyle.shadowColor" />
          </form-row>
          <form-row label="阴影范围">
            <number-input v-model="series[0].itemStyle.shadowBlur" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="波浪动画设置">
        <div slot="content">
          <form-row label="开启动画">
            <sv-checkbox v-model="series[0].waveAnimation" />
          </form-row>
          <form-row label="振幅">
            <number-input
              :min="0"
              :max="100"
              :parse="parsePercent"
              :formatter="formatterPercent"
              v-model="series[0].amplitude"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="波长">
            <number-input
              :min="0"
              :max="100"
              :parse="parsePercent"
              :formatter="formatterPercent"
              v-model="series[0].waveLength"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="移动方向">
            <sv-select v-model="series[0].direction">
              <sv-select-option
                v-for="item in dirTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
        </div>
      </fold-in>
      <fold-in label="文本">
        <div slot="pane-right">
          <sv-checkbox v-model="series[0].label.show" />
        </div>
        <div slot="content">
          <form-row label="字体大小">
            <number-input v-model="series[0].label.fontSize" />
          </form-row>
          <form-row label="字体粗细">
            <sv-select v-model="series[0].label.fontWeight">
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
          <form-row label="文本颜色">
            <sv-color v-model="series[0].label.color" />
          </form-row>
          <form-row label="波纹覆盖时颜色">
            <sv-color v-model="series[0].label.insideColor" />
          </form-row>
          <form-row label="对齐方式">
            <sv-select v-model="series[0].label.align">
              <sv-select-option
                v-for="item in alignTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="文本位置">
            <sv-select v-model="series[0].label.position">
              <sv-select-option
                v-for="item in positionTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="文本基线">
            <sv-select v-model="series[0].label.baseline">
              <sv-select-option
                v-for="item in baselineTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import { EchartsSeriesRespondMixins } from '@/mixins'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvColor from '@/setting-component/sv-color/index'
import Slider from '@/setting-component/slider/index'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import { FONT_WEIGHT_TYPES, ALIGN_TYPES } from '@/constants/echarts-constans'

export default {
  name: 'EchartsLiquidFill',
  mixins: [EchartsSeriesRespondMixins],
  data() {
    return {
      fontWeightTypes: FONT_WEIGHT_TYPES,
      alignTypes: ALIGN_TYPES,
      positionTypes: [
        {
          label: '内部',
          value: 'inside',
        },
        {
          label: '左方',
          value: 'left',
        },
        {
          label: '右方',
          value: 'right',
        },
        {
          label: '上方',
          value: 'top',
        },
        {
          label: '下方',
          value: 'bottom',
        },
      ],
      baselineTypes: [
        {
          label: 'top',
          value: 'top',
        },
        {
          label: 'middle',
          value: 'middle',
        },
        {
          label: 'bottom',
          value: 'bottom',
        },
      ],
      shapes: [
        {
          label: '圆形',
          value: 'circle',
        },
        {
          label: '圆角矩形',
          value: 'rect',
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
          label: '水滴状',
          value: 'pin',
        },
        {
          label: '箭头状',
          value: 'arrow',
        },
      ],
      dirTypes: [
        {
          label: '从右至左',
          value: 'left',
        },
        {
          label: '从左至右',
          value: 'right',
        },
      ],
    }
  },
  methods: {
    parsePercent: (value) => value.replace('%', ''),
    formatterPercent: (value) => `${value}%`,
    addColor() {
      this.series[0].color.push('#3896fe')
    },
    removeColor(index) {
      this.series[0].color.splice(index, 1)
    },
  },
  components: {
    SvSelect,
    SvColor,
    NumberInput,
    FormRow,
    SvCheckbox,
    SvSelectOption,
    Slider,
    FoldIn,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
.slider
  width 150px

.iconfont
  font-size 15px
  cursor pointer

  &:hover
    color theme-color

.color-item
  display flex
  align-items center
  justify-content space-between
  margin-bottom 10px

  .color-left
    display flex
    align-items center

    .index
      margin 0 15px
</style>
