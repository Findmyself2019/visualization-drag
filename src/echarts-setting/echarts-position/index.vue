<template>
  <fold-in label="位置">
    <div slot="content">
      <fold-in label="水平方向" :can-open="false">
        <div slot="pane-right">
          <radio-group v-model="positionTypeOfHorizontal">
            <radio :value="1">
              快速定位
            </radio>
            <radio :value="2">
              自定义
            </radio>
          </radio-group>
        </div>
        <div slot="content">
          <form-row label="左">
            <number-input
              v-model="position.left"
              v-if="positionTypeOfHorizontal === 2"
            />
            <sv-select
              v-if="positionTypeOfHorizontal === 1"
              v-model="position.left"
            >
              <sv-select-option
                v-for="(item, index) in horizontalTypes"
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
      <fold-in label="竖直方向" :can-open="false">
        <div slot="pane-right">
          <radio-group v-model="positionTypeOfVertical">
            <radio :value="1">
              快速定位
            </radio>
            <radio :value="2">
              自定义
            </radio>
          </radio-group>
        </div>
        <div slot="content">
          <form-row label="上">
            <number-input
              v-model="position.top"
              v-if="positionTypeOfVertical === 2"
            />
            <sv-select
              v-if="positionTypeOfVertical === 1"
              v-model="position.top"
            >
              <sv-select-option
                v-for="(item, index) in verticalTypes"
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
    </div>
  </fold-in>
</template>

<script>
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio/index'
import SvSelect from '@/setting-component/sv-select/index'
import { isNumber } from '@/utils/util'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'

export default {
  name: 'EchartsPosition',
  props: {
    position: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      positionTypeOfVertical: 1, // 竖直方向类型
      positionTypeOfHorizontal: 1, // 水平方向类型
      horizontalTypes: [
        {
          label: '水平居左',
          value: 'left',
        },
        {
          label: '水平居中',
          value: 'center',
        },
        {
          label: '水平居右',
          value: 'right',
        },
      ],
      verticalTypes: [
        {
          label: '竖直居上',
          value: 'top',
        },
        {
          label: '竖直居中',
          value: 'center',
        },
        {
          label: '竖直居下',
          value: 'bottom',
        },
      ],
      lastTop: this.position.top, // 记录上次top值
      lastLeft: this.position.left, // 记录上次left值
    }
  },
  watch: {
    positionTypeOfVertical: {
      handler() {
        [this.position.top, this.lastTop] = [this.lastTop, this.position.top]
      },
    },
    positionTypeOfHorizontal: {
      handler() {
        [this.position.left, this.lastLeft] = [
          this.lastLeft,
          this.position.left,
        ]
      },
    },
  },
  mounted() {
    const { top, left } = this.position
    if (isNumber(top)) {
      this.positionTypeOfVertical = 2
      this.$nextTick(() => (this.lastTop = 'top'))
    } else {
      this.lastTop = 10
    }
    if (isNumber(left)) {
      this.positionTypeOfHorizontal = 2
      this.$nextTick(() => (this.lastLeft = 'left'))
    } else {
      this.lastLeft = 10
    }
  },
  components: {
    SvSelectOption,
    SvSelect,
    Radio,
    RadioGroup,
    NumberInput,
    FormRow,
    FoldIn,
  },
}
</script>

<style scoped lang="stylus"></style>
