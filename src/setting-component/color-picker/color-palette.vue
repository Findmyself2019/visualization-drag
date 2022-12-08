<template>
  <div
    class="color-palette"
    :style="{ background: backgroundColor }"
    ref="palette"
    @click="handleClick"
  >
    <div
      class="bar"
      :style="style"
      @click.stop
      @mousedown="handleMousedown"
    ></div>
  </div>
</template>

<script>
import { hsvToRgb } from '@/utils/util'

const BAR_RADIUS = 5
export default {
  name: 'ColorPalette',
  props: {
    hsv: {
      type: Object,
      default: () => ({
        h: 0,
        s: 0,
        v: 0,
      }),
    },
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      height: 0,
      width: 0,
      position: {
        left: -BAR_RADIUS,
        top: -BAR_RADIUS,
      },
      needWatch: true, // 控制是否需要监控sv变量
    }
  },
  mounted() {
    const { hsv } = this
    const { height, width } = this.$refs.palette.getBoundingClientRect()
    this.height = height
    this.width = width
    this.position.left = hsv.s * width - BAR_RADIUS
    this.position.top = (1 - hsv.v) * height - BAR_RADIUS
  },
  computed: {
    style() {
      const { top, left } = this.position
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
    backgroundColor() {
      return `rgb(${hsvToRgb([this.hsv.h, 1, 1]).join(',')})`
    },
  },
  watch: {
    hsv(hsv) {
      const { width, height } = this
      this.position.left = hsv.s * width - BAR_RADIUS
      this.position.top = (1 - hsv.v) * height - BAR_RADIUS
    },
    position: {
      deep: true,
      handler({ left, top }) {
        const { height, width, needWatch } = this
        if (!needWatch) {
          this.$emit('changeSv', {
            s: (left + BAR_RADIUS) / width,
            v: 1 - (top + BAR_RADIUS) / height,
          })
        }
      },
    },
  },
  methods: {
    handleClick(e) {
      this.needWatch = false
      this.position.left = e.offsetX - BAR_RADIUS
      this.position.top = e.offsetY - BAR_RADIUS
      this.$nextTick(() => (this.needWatch = true))
    },
    handleMousedown(e) {
      this.needWatch = false
      this.startX = e.clientX
      this.startY = e.clientY
      window.addEventListener('mousemove', this.moving)
      window.addEventListener('mouseup', this.stopMove)
    },
    moving(e) {
      const { position, startX, startY, width, height } = this
      const { top, left } = position
      const x2 = e.clientX
      const y2 = e.clientY
      const diffX = x2 - startX
      const diffY = y2 - startY
      let currLeft = diffX + left
      let currTop = diffY + top

      if (currLeft < -BAR_RADIUS) {
        currLeft = -BAR_RADIUS
      } else if (currLeft > width - BAR_RADIUS) {
        currLeft = width - BAR_RADIUS
      }

      if (currTop < -BAR_RADIUS) {
        currTop = -BAR_RADIUS
      } else if (currTop > height - BAR_RADIUS) {
        currTop = height - BAR_RADIUS
      }

      this.position.top = currTop
      this.position.left = currLeft
      this.startX = x2
      this.startY = y2
    },
    stopMove() {
      this.needWatch = true
      window.removeEventListener('mousemove', this.moving)
      window.removeEventListener('mouseup', this.stopMove)
    },
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.color-palette
  width calc(100% - 20px)
  margin 10px
  height 120px
  position relative
  border-radius 3px
  overflow hidden

  &::before
    content ''
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background linear-gradient(90deg, #ffffff, transparent)

  &::after
    content ''
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background linear-gradient(0, #000000, transparent)

  .bar
    box()
    z-index 9
    cursor pointer
    position absolute
    height 10px
    width 10px
    border-radius 50%
    border 2px solid #ffffff
</style>
