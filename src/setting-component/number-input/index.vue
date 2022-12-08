<template>
  <div class="ed-number">
    <div class="input-box">
      <input
        :value="curValue"
        @input="inputHandler($event)"
        @change="handleChange"
      />
      <div class="arrows">
        <span
          class="top-triangle"
          @click="add"
          @mousedown="sustainAdd"
        ></span>
        <span
          class="bottom-triangle"
          @click="low"
          @mousedown="sustainLow"
          @mouseup="stopSustainLow"
        ></span>
      </div>
    </div>
    <div class="input-suffix" v-if="getSuffixVisible">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
const SUSTAIN_OUT_TIME = 600
const SUSTAIN_TIME = 50
export default {
  name: "NumberInput",
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    max:{
      type:Number,
      default: Infinity
    },
    min:{
      type: Number,
      default: -Infinity
    },
    parse: { // 该属性指定value转为数字的方式，需要搭配formatter使用(可参考echarts-pie/index.vue中的使用)
      type: Function,
      default: null
    },
    formatter: { // 格式化函数
      type: Function,
      default: null
    }
  },
  data() {
    return {
      curValue: this.value,
      precision: 0
    }
  },
  computed: {
    getSuffixVisible() {
      return this.$slots.suffix
    },
    step() {
      return Math.pow(10, -this.precision)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        const {parse} = this
        if (parse) {
          this.curValue = parseFloat(parse(value))
        } else {
          this.curValue = value
        }
        const cir = (this.curValue + '').split('.')[1]
        this.precision =  cir ? cir.length : 0
      }
    },
    curValue: {
      handler() {
        const {max, min, curValue, formatter} = this
        let value = curValue
        value > max && (value = max)
        value < min && (value = min)
        formatter && (value = formatter(curValue))
        this.curValue = value
        this.$emit('input', value)
      }
    }
  },
  methods: {
    // 递增
    add: function () {
      const {curValue} = this
      const res = curValue >= this.max ? this.max : (curValue + this.step).toFixed(this.precision)
      this.curValue = Number(res)
    },

    // 递减
    low: function () {
      const {curValue} = this
      const res = curValue === this.min ? this.min:(Number(curValue) - this.step).toFixed(this.precision)
      this.curValue = Number(res)
    },

    // 与父组件双向绑定
    inputHandler(e) {
      let {value} = e.target
      if (isNaN(parseFloat(value))) {
        this.curValue = 0
      } else {
        this.curValue = parseFloat(value)
      }
    },
    handleChange(e) {
      const {value} = e.target
      let _value = parseFloat(value)
      if (isNaN(_value)) {
        _value = 0
      }
      this.curValue = _value
      e.target.value = _value
    },
    // 持续按下增加
    sustainAdd() {
      this.outTimerAdd = setTimeout(() => {
        this.interTimerAdd = setInterval(this.add, SUSTAIN_TIME)
      }, SUSTAIN_OUT_TIME)
      window.addEventListener('mouseup', this.stopSustainAdd)
    },

    // 持续按下减少
    sustainLow() {
      this.outTimerLow = setTimeout(() => {
        this.interTimerLow = setInterval(this.low, SUSTAIN_TIME)
      }, SUSTAIN_OUT_TIME)
      window.addEventListener('mouseup', this.stopSustainLow)
    },

    // 鼠标弹起停止
    stopSustainAdd() {
      clearInterval(this.interTimerAdd)
      clearTimeout(this.outTimerAdd)
      window.removeEventListener('mouseup', this.stopSustainAdd)
    },
    stopSustainLow() {
      clearTimeout(this.outTimerLow)
      clearInterval(this.interTimerLow)
      window.removeEventListener('mouseup', this.stopSustainLow)
    }
  },
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .ed-number
    display flex
    justify-content flex-start
    align-content stretch

    .input-box
      position relative
      flex 1
      input
        box()
        width: 100%;
        height form-height
        color #fff
        padding 0 20px 0 7px
        border 1px solid form-bg-color
        background-color form-bg-color

        &:focus
          outline 0
          border 1px solid theme-color

      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button
        -webkit-appearance none
        margin 0

      .arrows
        box()
        padding 3px 0
        width 15px
        position absolute
        top 0
        bottom 0
        right 2px
        display flex
        flex-direction column
        align-items center
        justify-content center

        span
          cursor pointer

          &.top-triangle
            triangle(top)
            margin-bottom 5px
            &:hover
              border-bottom-color  theme-color

          &.bottom-triangle
            triangle(bottom)
            &:hover
              border-top-color  theme-color

    .input-suffix
      vertical-center(form-height)
      background-color #484e5d
      padding 0 6px
      color #ffffff
</style>
