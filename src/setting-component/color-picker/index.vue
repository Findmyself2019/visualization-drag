<template>
  <div class="color-picker-box">
    <sv-input
      class="sv-input"
      v-model="inputColor"
      @focus="focus = true"
      @blur="focus = false"
    >
      <div slot="prefix" class="prefix">
        <div class="color-block-transparent">
          <div
            class="color-block-color"
            :style="{ backgroundColor: `#${color}`, opacity: alpha / 100 }"
          ></div>
        </div>
        <span style="margin-left: 5px">#</span>
      </div>
    </sv-input>
    <div class="color-picker-pane">
      <div class="color-type-menu">
        <div class="circle pure-color"></div>
        <div class="circle linear-gradient"></div>
      </div>
      <gradient-setting />
      <div class="color-title">
        <span>拾色器</span>
      </div>
      <color-palette :hsv="hsv" @changeSv="handleChangeSv" />
      <div class="color-slider-box">
        <div class="color-setting">
          <color-bar :hsv-h="hsv.h" @changeH="handleChangeH" />
          <opacity-bar v-model="alpha" :color="color" />
        </div>
        <div class="color-show">
          <div
            class="color-real"
            :style="{ backgroundColor: `#${color}`, opacity: alpha / 100 }"
          ></div>
        </div>
      </div>
      <div class="hex-box">
        <span>HEX</span>
        <sv-input
          class="input"
          v-model="inputColor"
          @focus="focus = true"
          @blur="focus = false"
        >
          <span slot="prefix">#</span>
        </sv-input>
      </div>
      <div class="color-input">
        <div class="input-item">
          <number-input class="input" :max="max" v-model="r" />
          <span>R</span>
        </div>
        <div class="input-item">
          <number-input class="input" :max="max" v-model="g" />
          <span>G</span>
        </div>
        <div class="input-item">
          <number-input class="input" :max="max" v-model="b" />
          <span>B</span>
        </div>
        <div class="input-item">
          <number-input class="input" :max="100" v-model="alpha" />
          <span>Alpha</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvInput from '@/setting-component/sv-input/index'
import ColorPalette from '@/setting-component/color-picker/color-palette'
import ColorBar from '@/setting-component/color-picker/color-bar'
import OpacityBar from '@/setting-component/color-picker/opacity-bar'
import NumberInput from '@/setting-component/number-input/index'
import { hexToRgb, rgbToHsv, rgbToHex, hsvToRgb } from '@/utils/util'
import GradientSetting from '@/setting-component/color-picker/gradient-setting'

export default {
  name: 'ColorPicker',
  props: {
    color: {
      type: String,
      default: '3896fe',
    },
  },
  data() {
    return {
      inputColor: this.color,
      hsv: {
        h: 0,
        s: 0,
        v: 0,
      },
      max: 255,
      r: 0,
      g: 0,
      b: 0,
      alpha: 100,
      needWatch: true,
      focus: false,
    }
  },

  watch: {
    inputColor: {
      handler(color) {
        this.$emit('changeColor', color.toUpperCase())
      },
    },
    color: {
      immediate: true,
      handler(color) {
        const rgb = hexToRgb(`#${color}`)
        this.r = rgb[0]
        this.g = rgb[1]
        this.b = rgb[2]
        if (this.needWatch) {
          const hsv = rgbToHsv(rgb)
          this.hsv = {
            h: hsv[0],
            s: hsv[1],
            v: hsv[2],
          }
        }
      },
    },
    hsv: {
      deep: true,
      handler(hsv) {
        const color = rgbToHex(hsvToRgb([hsv.h, hsv.s, hsv.v]))
        !this.focus && (this.inputColor = color)
        this.$emit('changeColor', color)
      },
    },
    r() {
      this.watchRgb()
    },
    g() {
      this.watchRgb()
    },
    b() {
      this.watchRgb()
    },
  },
  methods: {
    watchRgb() {
      const { r, g, b } = this
      this.$emit('changeColor', rgbToHex([r, g, b]))
    },
    handleChangeSv({ s, v }) {
      this.needWatch = false
      this.hsv.s = s
      this.hsv.v = v
      this.$nextTick(() => (this.needWatch = true))
    },
    handleChangeH(h) {
      this.needWatch = false
      this.hsv.h = h
      this.$nextTick(() => (this.needWatch = true))
    },
  },
  components: {
    GradientSetting,
    NumberInput,
    OpacityBar,
    ColorBar,
    ColorPalette,
    SvInput,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.color-picker-box
  position relative

  .sv-input >>>

    .input
     padding-left 34px !important

  .prefix
    display flex
    align-items center

    .color-block-transparent
      height 12px
      width 12px
      border-radius 3px
      border 1px solid #ffffff
      position relative
      background-color #fff
      background-image linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5), linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5)
      background-size 12px 12px
      background-position 0 0, 6px 6px
      overflow hidden

      .color-block-color
        content ''
        position absolute
        left 0
        right 0
        bottom 0
        top 0

  .color-picker-pane
    position absolute
    left 0
    top 35px
    background-color form-bg-color
    width 240px
    border-radius 4px
    padding-bottom 10px
    filter:drop-shadow(0 0 2px form-bg-color)

    &::before
      content ''
      position absolute
      left 0
      right 0
      top -8px
      margin auto
      width 0
      height 0
      border-top none
      border-left 9px solid transparent
      border-right 9px solid transparent
      border-bottom 8px solid form-bg-color

    .color-type-menu
      display flex
      align-items center
      justify-content flex-start
      padding 10px

      .circle
        width 17px
        height 17px
        border-radius 17px
        box-shadow 0 0 0 1px rgba(0,0,0, 0.5)
        cursor pointer
        margin-right 10px

        &.pure-color
          background #76829a

        &.linear-gradient
          background linear-gradient(180deg, #b1bfda 40%, #717D94)

    .color-title
      padding 4px 10px

    .color-slider-box
      display flex
      align-items center
      padding 0 10px

      .color-setting
        flex 1

      .color-show
        width 30px
        height 30px
        border-radius 50%
        margin-left 10px
        background-color #ffffff
        background-image linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5),
          linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5)
        background-size 10px 10px
        background-position 0 0, 5px 5px

        .color-real
          width 100%
          height 100%
          border-radius 50%

    .hex-box
      display flex
      align-items center
      padding 0 10px
      margin-bottom 10px

      .input
        flex 1

      span
        margin-right 5px

    .color-input
      display flex
      align-items center
      justify-content space-evenly
      padding 0 10px

      .input-item
        display flex
        flex-direction column
        align-items center
        margin 0 2px

        span
          margin-top 5px

.input >>>

  .input
    border 1px solid #6e6e6e
    border-radius 3px

  .input-box

    input
      border 1px solid #6e6e6e
      border-radius 3px
</style>
