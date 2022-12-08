<template>
  <fold-in :label="`分段型视觉映射【 ${index + 1} 】`">
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
      <fold-in label="分段设置">
        <div slot="pane-right">
          <i class="iconfont sv-tianjia1" @click="addPiece"></i>
        </div>
        <div slot="content">
          <fold-in
            v-for="(item, index1) in visualMap.pieces"
            :key="index1"
            :label="`分段【 ${index1 + 1} 】`"
          >
            <div slot="pane-right">
              <i class="iconfont sv-jian" @click="removePiece(index1)"></i>
            </div>
            <div slot="content">
              <form-row label="自定义文本">
                <div class="center">
                  <sv-checkbox
                    :value="isCustomLabel(item)"
                    @input="changeCustomLabel($event, index1)"
                  />
                </div>
              </form-row>
              <form-row label="" v-if="isCustomLabel(item)">
                <sv-input class="fill" v-model="item.label" />
              </form-row>
              <form-row label="图形颜色">
                <sv-color v-model="item.color" />
              </form-row>
              <fold-in label="分段条件" :can-open="false">
                <div slot="pane-right">
                  <i
                    class="iconfont sv-tianjia1"
                    @click="addCondition(index1)"
                  ></i>
                </div>
                <div slot="content">
                  <form-row
                    v-for="(item2, index2) in formatterPiece(item)"
                    :key="index2"
                  >
                    <sv-select
                      slot="label"
                      class="condition"
                      :value="item2.operate"
                      @input="changeOperate($event, index1, item2)"
                    >
                      <sv-select-option
                        v-for="(item3, index3) in compareSymbol"
                        :key="index3"
                        :value="item3.value"
                        :label="item3.label"
                      >
                        {{ item3.label }}
                      </sv-select-option>
                    </sv-select>
                    <div class="value">
                      <number-input
                        :value="item2.value"
                        @input="changeValue($event, index1, item2)"
                      />
                      <i
                        class="iconfont sv-jian"
                        @click="removeCondition(index1, item2)"
                      ></i>
                    </div>
                  </form-row>
                </div>
              </fold-in>
            </div>
          </fold-in>
        </div>
      </fold-in>
      <form-row label="选择模式">
        <sv-select v-model="visualMap.selectedMode">
          <sv-select-option
            v-for="(item, index1) in selectModeType"
            :key="index1"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="文本位置">
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
      <form-row label="分段间距">
        <number-input :min="0" v-model="visualMap.itemGap" />
      </form-row>
      <form-row label="鼠标悬浮时图形高亮">
        <div class="center">
          <sv-checkbox v-model="visualMap.hoverLink" />
        </div>
      </form-row>
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
import FoldIn from '@/setting-component/fold-in/index'
import EchartsPosition from '@/echarts-setting/echarts-position/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import NumberInput from '@/setting-component/number-input/index'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import {
  ORIENT_TYPES,
  SYMBOL_TYPES,
  VISUAL_MAP_SELECTED_MODE,
} from '@/constants/echarts-constans'
import SvColor from '@/setting-component/sv-color/index'
import SvInput from '@/setting-component/sv-input/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import { FocusComInfoMixins } from '@/mixins'
const COMPARE_OPERATE_SYMBOL = ['value', 'lt', 'lte', 'gt', 'gte']

export default {
  name: 'EchartsVisualMapOfPiecewise',
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
      selectModeType: VISUAL_MAP_SELECTED_MODE,
      symbolTypes: SYMBOL_TYPES,
      orientTypes: ORIENT_TYPES,
      alignTypes: [
        {
          label: '自动决定',
          value: 'auto',
        },
        {
          label: '文字在右',
          value: 'left',
        },
        {
          label: '文字在左',
          value: 'right',
        },
      ],
      compareSymbol: [
        {
          label: '=',
          value: 'value',
        },
        {
          label: '>',
          value: 'gt',
        },
        {
          label: '<',
          value: 'lt',
        },
        {
          label: '>=',
          value: 'gte',
        },
        {
          label: '<=',
          value: 'lte',
        },
      ],
    }
  },
  methods: {
    removeVisualMap() {
      this.$emit('removeVisualMap')
    },
    // 格式化分段条件
    formatterPiece(piece) {
      const keys = Object.keys(piece)
      const res = []
      keys.forEach(
        (key) =>
          COMPARE_OPERATE_SYMBOL.includes(key) &&
          res.push({ operate: key, value: piece[key] })
      )
      return res
    },
    // 修饰符修改
    changeOperate(value, index, pieceObj) {
      this.$delete(this.visualMap.pieces[index], pieceObj.operate)
      this.$set(this.visualMap.pieces[index], value, pieceObj.value)
    },
    // 分段值修改
    changeValue(value, index, pieceObj) {
      const { operate } = pieceObj
      this.visualMap.pieces[index][operate] = value
    },
    isCustomLabel(piece) {
      return Object.keys(piece).includes('label')
    },
    changeCustomLabel(value, index) {
      if (value) {
        this.$set(this.visualMap.pieces[index], 'label', '自定义label')
      } else {
        this.$delete(this.visualMap.pieces[index], 'label')
      }
    },
    // 添加分段
    addPiece() {
      this.visualMap.pieces.push({ lt: 0, color: '#ffffff' })
    },
    // 移除分段
    removePiece(index) {
      this.visualMap.pieces.splice(index, 1)
    },
    // 添加分段内条件
    addCondition(index) {
      this.$set(this.visualMap.pieces[index], 'lt', 0)
    },
    // 移除分段内条件
    removeCondition(index, pieceObj) {
      this.$delete(this.visualMap.pieces[index], pieceObj.operate)
    },
  },
  components: {
    SvSelectOption,
    SvInput,
    SvColor,
    SvSelect,
    FormRow,
    NumberInput,
    SvCheckbox,
    EchartsPosition,
    FoldIn,
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

.iconfont
  font-size 15px
  cursor pointer

  &:hover
    color theme-color

.condition
  width 50px

.value
  display flex
  align-items center

  .iconfont
    margin-left 15px

.select
  width 150px
</style>
