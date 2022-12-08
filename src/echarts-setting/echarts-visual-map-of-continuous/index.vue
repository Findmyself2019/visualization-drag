<template>
  <fold-in :label="`连续型视觉映射【 ${index + 1} 】`">
    <div slot="pane-right">
      <sv-checkbox v-model="visualMap.show" />
      <i class="remove iconfont sv-jian" @click="removeVisualMap"></i>
    </div>
    <div slot="content">
      <form-row label="应用系列">
        <sv-select
          class="select"
          v-model="visualMap.seriesIndex"
          :multiple="true"
        >
          <sv-select-option
            v-for="i in focusComInfo[0].setting.series.length"
            :key="i"
            :label="`系列${i}`"
            :value="i - 1"
          >
            系列{{ i }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="映射维度">
        <sv-input v-model="visualMap.dimension" />
      </form-row>
      <echarts-position :position="visualMap" />
      <fold-in label="图形尺寸">
        <div slot="content">
          <form-row label="宽度">
            <number-input :min="0" v-model="visualMap.itemWidth" />
          </form-row>
          <form-row label="高度">
            <number-input :min="0" v-model="visualMap.itemHeight" />
          </form-row>
        </div>
      </fold-in>
      <form-row label="方向">
        <sv-select v-model="visualMap.orient">
          <sv-select-option
            v-for="(item, index1) in orientTypes"
            :key="index1"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="反转视觉映射">
        <div class="center">
          <sv-checkbox v-model="visualMap.inverse" />
        </div>
      </form-row>
      <form-row label="最小值">
        <number-input v-model="visualMap.min" />
      </form-row>
      <form-row label="最大值">
        <number-input v-model="visualMap.max" />
      </form-row>
      <fold-in label="手柄对应值">
        <div slot="content">
          <form-row label="手柄一">
            <number-input
              :min="visualMap.min"
              :max="visualMap.max"
              v-model="visualMap.range[0]"
            />
          </form-row>
          <form-row label="手柄二">
            <number-input
              :min="visualMap.min"
              :max="visualMap.max"
              v-model="visualMap.range[1]"
            />
          </form-row>
        </div>
      </fold-in>
      <form-row label="显示手柄">
        <div class="center">
          <sv-checkbox v-model="visualMap.calculable" />
        </div>
      </form-row>
      <form-row label="手柄及文字位置">
        <sv-select v-model="visualMap.align">
          <sv-select-option
            v-for="(item, index1) in alignTypes"
            :key="index1"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="拖拽实时更新">
        <div class="center">
          <sv-checkbox v-model="visualMap.realTime" />
        </div>
      </form-row>
      <fold-in label="两端文本">
        <div slot="content">
          <form-row label="文本一">
            <sv-input class="fill" v-model="visualMap.text[0]" />
          </form-row>
          <form-row label="文本二">
            <sv-input class="fill" v-model="visualMap.text[1]" />
          </form-row>
          <form-row label="与图形间距">
            <number-input :min="0" v-model="visualMap.textGap">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <form-row label="鼠标悬浮显示数值">
        <div class="center">
          <sv-checkbox v-model="visualMap.hoverLink" />
        </div>
      </form-row>
      <fold-in label="映射颜色">
        <div slot="pane-right">
          <i class="iconfont sv-tianjia1" @click="addColor"></i>
        </div>
        <div slot="content">
          <div
            class="color-item"
            v-for="(item, index2) in visualMap.inRange.color"
            :key="index2"
          >
            <div class="color-left">
              <span class="index">{{ index2 + 1 }}</span>
              <sv-color v-model="visualMap.inRange.color[index2]" />
            </div>
            <i class="iconfont sv-jian" @click="removeColor(index2)"></i>
          </div>
        </div>
      </fold-in>
      <fold-in label="文本样式">
        <div slot="content">
          <form-row label="文本大小">
            <number-input :min="0" v-model="visualMap.textStyle.fontSize" />
          </form-row>
          <form-row label="文本颜色">
            <sv-color v-model="visualMap.textStyle.color" />
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold-in>
</template>

<script>
import {
  ORIENT_TYPES,
  VISUAL_TEXT_POSITION,
} from '@/constants/echarts-constans'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import EchartsPosition from '@/echarts-setting/echarts-position/index'
import NumberInput from '@/setting-component/number-input/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import SvInput from '@/setting-component/sv-input/index'
import SvColor from '@/setting-component/sv-color/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import { FocusComInfoMixins } from '@/mixins'

export default {
  name: 'EchartsVisualMapOfContinuous',
  mixins: [FocusComInfoMixins],
  props: {
    visualMap: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      alignTypes: VISUAL_TEXT_POSITION,
      orientTypes: ORIENT_TYPES,
    }
  },
  methods: {
    removeVisualMap() {
      this.$emit('removeVisualMap')
    },
    addColor() {
      this.visualMap.inRange.color.push('#ffffff')
    },
    removeColor(index) {
      this.visualMap.inRange.color.splice(index, 1)
    },
    seriesIndexChange(value) {
      this.visualMap.seriesIndex = value
    },
  },
  components: {
    SvSelectOption,
    SvColor,
    SvInput,
    SvCheckbox,
    FoldIn,
    NumberInput,
    EchartsPosition,
    SvSelect,
    FormRow,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.remove
  margin-left 10px

.center
  height 100%
  display flex
  align-items center

.fill
  width 150px

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

.iconfont
  font-size 15px
  cursor pointer

  &:hover
    color theme-color

.select
  width 150px
</style>
