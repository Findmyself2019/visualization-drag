<template>
  <div
    class="opacity-bar"
    ref="slider"
    @click="handleClick"
  >
    <div class="color-rail" :style="linearGradient"></div>
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
  name: "OpacityBar",
  model: {
    prop: 'opacity',
    event: 'changeOpacity'
  },
  props: {
    opacity: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: ''
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
    linearGradient() {
      return {
        background: `linear-gradient(90deg, transparent, #${this.color})`
      }
    }
  },
  watch: {
    opacity:{
      handler(opacity) {
        this.needWatch && (this.left = opacity / 100 * this.width - BAR_RADIUS)
      }
    },
    left: {
      handler(left) {
        const {width, needWatch, opacity} = this
        if (!needWatch) {
          this.$emit('changeOpacity', Math.round((left + BAR_RADIUS) / width * 100))
        } else {
          this.$emit('changeOpacity', opacity)
        }
        
      }
    }
  },
  mounted() {
    this.width = this.$refs.slider.getBoundingClientRect().width
    this.left = this.opacity / 100 * this.width - BAR_RADIUS
  },
  methods: {
    handleClick(e) {
      this.needWatch = false
      this.left = e.offsetX - BAR_RADIUS
      this.$nextTick(() => this.needWatch = true)
    },
    handleMouseDown(e) {
      this.needWatch = false
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
      this.needWatch = true
      window.removeEventListener('mousemove', this.moving)
      window.removeEventListener('mouseup', this.stopMove)
    }
  },
}
</script>

<style scoped lang="stylus">
  .opacity-bar
    border-radius 3px
    margin 10px 0 10px 8px
    width calc(100% - 8px)
    height 10px
    background-color #ffffff
    background-image linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5),
    linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5)
    background-size 10px 10px
    background-position 0 0, 5px 5px
    position relative
    
    .color-rail
      height 100%
      width 100%
      border-radius 3px
  
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
