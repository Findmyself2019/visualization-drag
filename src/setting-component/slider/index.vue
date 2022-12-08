<!-- 滑块 -->
<template>
  <div class="slider-box">
    <div class="slider-thumb">
      <i
        class="subtract iconfont sv-weibiaoti512"
        v-if="showIcon"
        @click="subtract"
        @mousedown="sustainSubtract"
      ></i>
      <div class="slider-slide" ref="slide" @click="clickHandler($event)">
        <div class="slider-val" :style="{ width: currentPosition }"></div>
        <div
          class="slider-bar"
          ref="bar"
          :style="{ left: currentPosition }"
          @mousedown="mousedownHandler($event)"
        ></div>
      </div>
      <i
        class="add iconfont sv-weibiaoti511"
        v-if="showIcon"
        @click="add"
        @mousedown="sustainAdd"
      >
      </i>
    </div>
    <div
      class="slider-content"
      v-if="showLabel"
      :style="{ padding: showIcon ? '0 20px' : 0 }"
    >
      <span class="slider-min">{{ min }}</span>
      <sv-input class="slider-input" :value="value" @input="inputHandler" />
      <span class="slider-max">{{ max }}</span>
    </div>
  </div>
</template>

<script>
import SvInput from '@/setting-component/sv-input/index.vue'
const SUSTAIN_OUT_TIME = 600
const SUSTAIN_TIME = 50
export default {
  name: 'Slider',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      // 步长
      type: Number,
      default: 1,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClick: true,
      startX: 0,
      currentX: 0,
      startPosition: 0,
      dragging: false,
      newPosition: 0,
      slideWidth: 0,
      precision: 0,
    }
  },
  created() {
    const { min, max, value } = this
    // 设置精度
    const precisions = [this.max, this.min, this.step].map((item) => {
      const decimal = ('' + item).split('.')[1]
      return decimal ? decimal.length : 0
    })
    this.precision = Math.max.apply(null, precisions)
    if (value < min) {
      this.$emit('input', min)
    } else if (value > max) {
      this.$emit('input', max)
    }
  },
  watch: {
    value(value) {
      const { min, max } = this
      if (value < min) {
        this.$emit('input', min)
      } else if (value > max) {
        this.$emit('input', max)
      }
    },
  },
  computed: {
    currentPosition() {
      return `${((this.value - this.min) / (this.max - this.min)) * 100}%`
    },
  },
  methods: {
    inputHandler(value) {
      value = parseFloat(value)

      // NaN转0
      if (isNaN(value)) value = 0

      this.$emit('input', Number(value.toFixed(this.precision)))
    },
    subtract() {
      const { min, step } = this
      let value = this.value - step
      if (value < min) {
        value = min
      }
      this.$emit('input', Number(value.toFixed(this.precision)))
    },
    sustainSubtract() {
      this.outTimer = setTimeout(() => {
        this.interTimer = setInterval(() => {
          this.subtract()
        }, SUSTAIN_TIME)
      }, SUSTAIN_OUT_TIME)
      window.addEventListener('mouseup', this.stopSustain)
    },
    sustainAdd() {
      this.outTimer = setTimeout(() => {
        this.interTimer = setInterval(() => {
          this.add()
        }, SUSTAIN_TIME)
      }, SUSTAIN_OUT_TIME)
      window.addEventListener('mouseup', this.stopSustain)
    },
    stopSustain() {
      clearTimeout(this.outTimer)
      clearInterval(this.interTimer)
      window.removeEventListener('mouseup', this.stopSustain)
    },
    add() {
      const { max, step } = this
      let value = this.value + step
      if (value > max) {
        value = max
      }
      this.$emit('input', Number(value.toFixed(this.precision)))
    },
    mousedownHandler(event) {
      this.onDragStart(event)
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.onDragEnd)
    },
    onDragStart(event) {
      this.isClick = true
      this.slideWidth = this.$refs.slide.clientWidth
      this.dragging = true
      this.startX = event.clientX
      this.startPosition = parseFloat(this.currentPosition)
    },
    onDragging(event) {
      if (this.dragging) {
        this.currentX = event.clientX
        const diff = ((this.currentX - this.startX) / this.slideWidth) * 100
        this.newPosition = this.startPosition + diff
        this.setPosition(this.newPosition)
      }
    },
    onDragEnd() {
      if (this.dragging) {
        this.isClick = false
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
        this.dragging = false
      }
      // 解决拖动完成后会触发click事件
      setTimeout(() => (this.isClick = true), 0)
    },
    setPosition(newPosition) {
      const { step, max, min } = this
      if (newPosition < 0) {
        newPosition = 0
      } else if (newPosition > 100) {
        newPosition = 100
      }

      // 考虑步长
      const stepLength = 100 / ((max - min) / step)
      const steps = Math.round(newPosition / stepLength)
      let value
      value = steps * stepLength * (max - min) * 0.01 + min
      this.$emit('input', Number(value.toFixed(this.precision)))
    },
    clickHandler(e) {
      if (this.isClick) {
        this.slideWidth = this.$refs.slide.clientWidth
        this.startX = 0
        this.startPosition = 0
        this.currentX = e.offsetX
        this.newPosition =
          ((this.currentX - this.startX) / this.slideWidth) * 100
        this.setPosition(this.newPosition)
      }
    },
  },
  components: {
    SvInput,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.slider-thumb
  display flex
  justify-content space-between
  align-items center
  padding 5px 0

  .iconfont
    font-size 12px
    transform scale(0.85)
    cursor pointer

    &:hover
      color theme-color

    &.subtract
      margin-right 10px

    &.add
      margin-left 10px

  .slider-slide
    cursor pointer
    flex 1
    height 5px
    border-radius 5px
    background-color form-bg-color
    position relative

    .slider-bar
      box()
      position absolute
      top -3px
      height 11px
      width 11px
      border-radius 50%
      background-color #ffffff
      border 1px solid theme-color
      transform translateX(-50%)
      cursor pointer

    .slider-val
      background-color theme-color
      height 5px
      border-radius 5px

.slider-content
  display flex
  justify-content space-between
  align-items center
  padding 0 20px
  margin-top 5px

  .slider-input
    width 50px

  &>>> .input
    text-align center
</style>
