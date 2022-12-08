<template>
  <div class="contentWrap" ref="colorSelect">
    <div class="input-box" ref="inputBox" @click="handleIsShow($event)">
      <input
        disabled="true"
        v-bind="$attrs"
        type="text"
        :class="['input', { active: isShow }]"
        ref="input"
        :value="inputVlue"
      />
      <div class="transparent">
        <div class="color-block" :style="{ background: inputVlue }"></div>
      </div>
    </div>
    <div ref="paletteBox">
      <transition :name="show">
        <Palette
          v-show="isShow"
          class="palette"
          ref="palette"
          v-model="rgbaArr"
          :show="isShow"
          @getComputed="getComputed"
          :top="top"
          :class="[before]"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import Palette from '@/setting-component/sv-color/sv-palette.vue'
import { isHexColor, isRgbaColor } from '@/utils/util'

export default {
  name: 'SvColorOld',
  props: {
    value: {
      type: String,
      default: 'rgba(0,0,0,0)',
    },
  },
  data() {
    return {
      rgbaArr: [],
      inputVlue: '',
      isShow: false,
      childHeight: 180,
      top: 33,
      show: '',
      before: '',
    }
  },
  watch: {
    value: {
      handler: 'updataValue',
      immediate: true,
    },
    rgbaArr(val) {
      var apha = val[3]
      apha = apha.toFixed(2)
      if (apha == 1) {
        this.inputVlue = this.rgbToHex(
          `rgb(${val[0]},${val[1]},${val[2]},${apha})`
        )
      } else {
        this.inputVlue = `rgba(${val[0]},${val[1]},${val[2]},${apha})`
      }
      this.$emit('input', this.inputVlue)
    },
  },
  methods: {
    updataValue(val) {
      this.inputVlue = val

      // 判断十六进制的色值
      if (isHexColor(val)) {
        const rgba = this.hexoToRgb(val)
        rgba.push(1)
        this.rgbaArr = rgba
      }

      // 判断 RGBA 色值判断
      if (isRgbaColor(val)) {
        this.rgbaArr = val
          .slice(5, -1)
          .split(',')
          .map(Number)
      }
    },
    // rgb 转 16 进制
    rgbToHex(rgb) {
      // rgb(x, y, z)
      var color = rgb.toString().match(/\d+/g)
      var hex = '#'
      for (var i = 0; i < 3; i++) {
        hex += ('0' + Number(color[i]).toString(16)).slice(-2)
      }
      return hex
    },
    // 16 进制转 rgb
    hexoToRgb(hex) {
      var color = [],
        rgb = []
      hex = hex.replace(/#/, '')
      if (hex.length == 3) {
        // 处理 "#abc" 成 "#aabbcc"
        var tmp = []
        for (var i = 0; i < 3; i++) {
          tmp.push(hex.charAt(i) + hex.charAt(i))
        }
        hex = tmp.join('')
      }
      for (let i = 0; i < 3; i++) {
        color[i] = '0x' + hex.substr(i * 2, 2)
        rgb.push(parseInt(Number(color[i])))
      }
      return rgb
    },
    handleIsShow(e) {
      //判断颜色面板显示位置
      if (!this.isShow) {
        const bodyHeight = document.body.offsetHeight,
          mouseY = e.clientY,
          inputY = this.$refs.inputBox.clientHeight - e.offsetY,
          diffY = bodyHeight - mouseY - inputY - 10
        this.getOuterSizes(diffY)
      }
      //dom更新之后再渲染
      this.$nextTick(() => {
        this.isShow = !this.isShow
      })

      document.addEventListener('click', this.handleHidden, false)
    },
    handleHidden(e) {
      if (
        this.$refs.input &&
        !this.$refs.input.contains(e.target) &&
        this.$refs.colorSelect &&
        !this.$refs.colorSelect.contains(e.target)
      ) {
        this.isShow = false
        document.removeEventListener('click', this.handleHidden, false)
      }
    },
    //从子组件获取宽高
    getComputed(height) {
      this.childHeight = height
    },
    getOuterSizes(diffY) {
      let ulHeight = this.childHeight
      let upOffset = ulHeight + 10
      //判断如果input框距离页面最底部的距离小于下拉ul的高度,让他向上展开
      if (diffY < ulHeight) {
        this.top = upOffset
        this.show = 'showUp'
        this.before = 'bottom'
      } else {
        this.top = 33
        this.show = 'show'
        this.before = 'top'
      }
    },
  },
  components: {
    Palette,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.contentWrap
  position: relative;
  .input-box
    position relative
    display flex
    flex-direction row
    align-items center

    .input
      box()
      user-select none
      cursor pointer
      background-color form-bg-color
      border 1px solid form-bg-color
      color #ffffff
      padding 0 10px 0 25px
      height form-height
      width 100%

      &.active
        border 1px solid theme-color

      &:focus
        outline 0
        border 1px solid theme-color

    .transparent
      position: absolute;
      left: 10px;
      width: 9px;
      height: 10px;
      background-color: white;
      background-image: linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5), linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5);
      background-size: 10px 10px;
      background-position: 0 0, 5px 5px;

      .color-block
        box-sizing content-box
        position relative
        width: 8px;
        height: 8px;
        border: 1px solid #fff;

        &:hover
          cursor pointer

  .palette
    box-sizing content-box
    position: absolute;
    padding: 15px 15px 50px;
    background: #292f3a;
    top: 33px;
    z-index: 999;
    right 0

  .show-enter, .show-leave-to
    opacity 0
    transform translateY(-20px)

  .show-enter-active, .show-leave-active
    transition all .3s ease-in-out

  .showUp-enter, .showUp-leave-to
    opacity 0
    transform translateY(20px)

  .showUp-enter-active, .showUp-leave-active
    transition all .3s ease-in-out

  &.top
    &::after
      content ''
      position absolute
      top -5px
      left 0
      right 0
      margin auto
      triangle(top, 5px, #292f3a)
  &.bottom
    &::after
      content ''
      position absolute
      bottom -5px
      left 0
      right 0
      margin auto
      triangle(bottom, 5px, #292f3a)
</style>
