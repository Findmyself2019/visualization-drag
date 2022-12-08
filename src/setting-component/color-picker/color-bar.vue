<template>
  <div
    class="color-bar"
    @click="handleClick"
    ref="thumb"
  >
    <div
      class="bar"
      @mousedown="handleMouseDown"
      @click.stop
      :style="style"
    ></div>
  </div>
</template>

<script>
const BAR_RADIUS = 7
export default {
  name: "ColorBar",
  props: {
    hsvH: {
      type: Number,
      default: 255
    }
  },
  data() {
    return {
      startX: 0,
      left: -BAR_RADIUS,
      width: 0,
      needWatch: true
    }
  },
  computed: {
    style() {
      const {left} = this
      return {
        left: `${left}px`
      }
    },
  },
  watch: {
    hsvH(hsvH) {
      this.left = (1 - hsvH / 360) * this.width - BAR_RADIUS
    },
    left: {
      handler(left) {
        const {width} = this
        const h = (width - left - BAR_RADIUS) / width * 360
        
        this.$emit('changeH', h)
      }
    }
  },
  mounted() {
    this.width = this.$refs.thumb.getBoundingClientRect().width
    this.left = (1 - this.hsvH / 360) * this.width - BAR_RADIUS
  },
  methods: {
    handleClick(e) {
      this.left = e.offsetX - BAR_RADIUS
    },
    handleMouseDown(e) {
      this.startX = e.clientX
      window.addEventListener('mousemove', this.moving)
      window.addEventListener('mouseup', this.stopMove)
    },
    moving(e) {
      const {left, width, startX} = this
      const x2 = e.clientX
      const diffX = x2 - startX
      let currLeft = left + diffX
    
      if (currLeft < -BAR_RADIUS) {
        currLeft = -BAR_RADIUS
      } else if (currLeft > width - BAR_RADIUS) {
        currLeft = width - BAR_RADIUS
      }
    
      this.left = currLeft
      this.startX = x2
    },
    stopMove() {
      window.removeEventListener('mousemove', this.moving)
      window.removeEventListener('mouseup', this.stopMove)
    }
  },
}
</script>

<style scoped lang="stylus">
  .color-bar
    margin 10px 0 10px 8px
    width calc(100% - 8px)
    height 10px
    border-radius 3px
    position relative
    background linear-gradient(90deg,
        #f00 0, #f0f 1/6, #00f 2/6, #0ff 3/6, #0f0 4/6, #ff0 5/6, #f00 1
      )
  
    .bar
      cursor pointer
      position absolute
      bottom 0
      top 0
      margin auto
      height 14px
      width 14px
      border-radius 50%
      background-color #ffffff
      box-shadow 0 0 4px 1px #000
</style>
