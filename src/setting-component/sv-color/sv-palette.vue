<!-- 调色板组件 -->
<template>
  <div class="container" ref="container">
    <!-- 颜色面板 -->
    <div
      class="palette"
      ref="palette"
      :style="{ background: palette }"
      @click="clickHandler($event)"
    >
      <span
        class="selectIcon"
        @mousedown="mousedownHandler($event)"
        :style="{ left: position.x, top: position.y }"
      ></span>
    </div>

    <div class="slide">
      <!-- 色相滑块 -->
      <ColorSlide class="colorSilde" v-model="hslH" />
      <!-- 透明滑块 -->
      <TransparentSlide
        class="transparentSilde"
        :value="hslH"
        v-model="alpha"
      />
    </div>
  </div>
</template>

<script>
import ColorSlide from '@/setting-component/sv-color/color-slide.vue'
import TransparentSlide from '@/setting-component/sv-color/transparent-slide.vue'
export default {
  name: 'SvPalette',
  model: {
    prop: 'value',
    event: 'colorChange',
  },
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Number,
      default: 33,
    },
  },
  data() {
    return {
      hslH: 0,
      hslS: 1,
      hslV: 1,
      alpha: 1,
      rgbArr: [],
      isClick: true,
      startMouse: { x: 0, y: 0 }, // 开始鼠标位置 X
      startPosition: {}, // 开始滑块
      currentPostion: { x: 50, y: 0 }, // 当前位置
      dragging: false,
      slideWidth: 0,
      slideHeght: 0,
      platte: 0,
    }
  },
  watch: {
    show(val) {
      if (val) {
        var width = this.$refs.palette.clientWidth
        var height = this.$refs.palette.clientHeight
        this.currentPostion = {
          x: width * this.hslL - 5,
          y: height - height * this.hslV - 5,
        }
      }
    },
    value: {
      handler: 'updataRgb',
      immediate: true,
    },
    hslH(val) {
      let rgb = this.fhsvtorgb(val, this.hslS, this.hslV)
      rgb.push(this.alpha)
      this.$emit('colorChange', rgb)
    },
    rgbArr(val) {
      this.$emit('colorChange', val)
    },
    alpha(val) {
      let rgb = this.fhsvtorgb(this.hslH, this.hslS, this.hslV)
      rgb.push(val)
      this.$emit('colorChange', rgb)
    },
    top(val) {
      if (val) {
        this.$forceUpdate()
        val > 50
          ? (this.$refs.container.style.top = '-' + (this.top - 3) + 'px')
          : (this.$refs.container.style.top = this.top + 'px')
      }
    },
  },
  computed: {
    palette() {
      return `hsla(${this.hslH}, 100%, 50%, 1)`
    },
    position() {
      var that = this
      return {
        x: `${that.currentPostion.x}px`,
        y: `${that.currentPostion.y}px`,
      }
    },
  },
  mounted() {
    this.$refs.container.style.display = 'block'
    this.$refs.container.style.visibility = 'hidden'
    this.platte = this.$refs.container.offsetHeight
    this.$emit('getComputed', this.platte)
    if (this.show) {
      var width = this.$refs.palette.clientWidth
      var height = this.$refs.palette.clientHeight
      this.currentPostion = {
        x: width * this.hslS - 5,
        y: height - height * this.hslV - 5,
      }
    }
    this.$refs.container.style.display = 'none'
    this.$refs.container.style.visibility = 'visible'
  },
  methods: {
    updataRgb() {
      const { value } = this
      const arr = this.rgbtohsv(value[0], value[1], value[2])
      this.hslH = arr[0]
      this.hslL = arr[1] / 100
      this.hslV = arr[2] / 100
      this.alpha = value[3]
    },
    mousedownHandler(event) {
      this.onDragStart(event)
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.onDragEnd)
    },
    onDragStart(e) {
      var that = this
      this.isClick = true
      this.dragging = true
      this.slideWidth = this.$refs.palette.clientWidth
      this.slideHeight = this.$refs.palette.clientHeight
      this.startMouse = {
        x: e.clientX,
        y: e.clientY,
      }
      this.startPosition = {
        x: parseFloat(that.position.x.slice(0, that.position.x.indexOf('p'))),
        y: parseFloat(that.position.y.slice(0, that.position.y.indexOf('p'))),
      }
    },
    onDragging(event) {
      var that = this
      if (this.dragging) {
        const diffX = event.clientX - this.startMouse.x
        const diffY = event.clientY - this.startMouse.y
        this.hslS = (this.currentPostion.x + 5) / this.slideWidth
        this.hslV =
          (this.slideHeight - this.currentPostion.y - 5) / this.slideHeight
        let rgb = this.fhsvtorgb(this.hslH, this.hslS, this.hslV)
        rgb.push(this.alpha)
        this.rgbArr = rgb
        this.currentPostion = {
          x: that.startPosition.x + diffX,
          y: that.startPosition.y + diffY,
        }
        if (this.currentPostion.x < -5) {
          this.currentPostion.x = -5
        }
        if (this.currentPostion.y < -5) {
          this.currentPostion.y = -5
        }
        if (this.currentPostion.x > this.slideWidth - 5) {
          this.currentPostion.x = this.slideWidth - 5
        }
        if (this.currentPostion.y > this.slideHeight - 5) {
          this.currentPostion.y = this.slideHeight - 5
        }
      }
    },
    onDragEnd() {
      if (this.dragging) {
        this.dragging = false
        this.isClick = false
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
      }
      setTimeout(() => (this.isClick = true), 0)
    },
    clickHandler(event) {
      if (this.isClick) {
        this.startMouse = { x: 0, y: 0 }
        this.startPosition = { x: 0, y: 0 }
        this.slideWidth = this.$refs.palette.clientWidth
        this.slideHeight = this.$refs.palette.clientHeight
        this.currentPostion = {
          x: event.offsetX - this.startMouse.x - 5,
          y: event.offsetY - this.startMouse.y - 5,
        }
        this.hslS = (this.currentPostion.x + 5) / this.slideWidth
        this.hslV =
          (this.slideHeight - this.currentPostion.y - 5) / this.slideHeight
        let rgb = this.fhsvtorgb(this.hslH, this.hslS, this.hslV)
        rgb.push(this.alpha)
        this.rgbArr = rgb
      }
    },
    // RGB 转 HSV
    rgbtohsv(r, g, b) {
      r = r / 255
      g = g / 255
      b = b / 255
      var h, s, v
      var min = Math.min(r, g, b)
      var max = (v = Math.max(r, g, b))
      var difference = max - min

      if (max == min) {
        h = 0
      } else {
        switch (max) {
          case r:
            h = (g - b) / difference + (g < b ? 6 : 0)
            break
          case g:
            h = 2.0 + (b - r) / difference
            break
          case b:
            h = 4.0 + (r - g) / difference
            break
        }
        h = Math.round(h * 60)
      }
      if (max == 0) {
        s = 0
      } else {
        s = 1 - min / max
      }
      s = Math.round(s * 100)
      v = Math.round(v * 100)
      return [h, s, v]
    },
    // HSV 转 RGB
    fhsvtorgb(h, s, v) {
      var h1 = Math.floor(h / 60) % 6
      var f = h / 60 - h1
      var p = v * (1 - s)
      var q = v * (1 - f * s)
      var t = v * (1 - (1 - f) * s)
      var r, g, b
      switch (h1) {
        case 0:
          r = v
          g = t
          b = p
          break
        case 1:
          r = q
          g = v
          b = p
          break
        case 2:
          r = p
          g = v
          b = t
          break
        case 3:
          r = p
          g = q
          b = v
          break
        case 4:
          r = t
          g = p
          b = v
          break
        case 5:
          r = v
          g = p
          b = q
          break
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    },
  },
  components: {
    ColorSlide,
    TransparentSlide,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.container
  width 150px
  height 150px
  &.top
    &::after
      content ''
      position absolute
      top -5px
      left 0
      right 0
      margin auto
      triangle(top, 5px, #ffffff)
  &.bottom
    &::after
      content ''
      position absolute
      bottom -5px
      left 0
      right 0
      margin auto
      triangle(bottom, 5px, #ffffff)
  .show-content
    width 100px
    height 100px
    background-color: white;
    background-image: linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5), linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;

    .showHSL
      width 100%
      height 100%
      color #000

  .text
    color #000
    font-weight: bold;
    margin 10px 0

  .slide
    background form-bg-color

    .colorSilde
     padding-top 10px
    .transparentSilde
      margin-top 10px

  .palette
    width 100%
    height 100%
    position relative
    background transparent
    overflow: hidden;

    &:hover
      cursor crosshair

    .selectIcon
      position absolute
      width 10px
      height 10px
      border-radius 10px
      border 1px #fff solid
      z-index 1
      &:hover
        cursor crosshair


    &::before,&::after
      content ''
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    &::before
      background linear-gradient(to right, white, transparent)
    &::after
      background linear-gradient(to top, black, transparent)
</style>
