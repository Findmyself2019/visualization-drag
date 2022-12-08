<template>
  <div class="color-box">
    <sv-input
      class="input"
      :value="value"
      @input="changeValue"
      @focus="handleFocus"
      ref="input"
    />
    <div class="opacity-block">
      <div class="show-color" :style="{ backgroundColor: value }"></div>
    </div>
    <transition name="slider">
      <div class="color-picker" v-show="show" ref="color" :style="position">
        <chrome-picker :value="color" @input="updateValue" />
      </div>
    </transition>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import SvInput from '@/setting-component/sv-input/index'

export default {
  name: 'SvColor',
  props: {
    value: {
      type: String,
      default: '#ffffff',
    },
    horizontal: {
      type: String,
      default: 'right',
    },
  },
  data() {
    return {
      color: '',
      show: false,
    }
  },
  computed: {
    position() {
      const obj = {}
      obj[this.horizontal] = 0
      return obj
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.indexOf('rgba') === 0) {
          // 该注释写法会导致safari报错： Invalid regular expression: invalid group specifier name dispatchException
          // const match = this.value.match(/(?<=\()(\d+),\s*(\d+),\s*(\d+),\s*((?:0?\.\d+)|1|0)(?=\))/)
          const match = this.value.match(
            new RegExp(
              '(?<=\\()(\\d+),\\s*(\\d+),\\s*(\\d+),\\s*((?:0?\\.\\d+)|1|0)(?=\\))',
              'g'
            )
          )
          this.color = {
            rgba: {
              r: match[1],
              g: match[2],
              b: match[3],
              a: match[4],
            },
          }
        } else if (value.indexOf('#') === 0) {
          this.color = value
        }
      },
    },
  },
  methods: {
    handleFocus() {
      this.computedDir()
      setTimeout(() => (this.show = true))
      setTimeout(() => window.addEventListener('click', this.hideColorPicker))
    },
    hideColorPicker(e) {
      if (
        !this.$refs.color.contains(e.target) &&
        !this.$refs.input.$el.contains(e.target)
      ) {
        this.show = false
        window.removeEventListener('click', this.hideColorPicker)
      }
    },
    updateValue(color) {
      const { r, g, b, a } = color.rgba
      if (a === 1) {
        this.$emit('input', color.hex)
      } else {
        this.$emit('input', `rgba(${r}, ${g}, ${b}, ${a})`)
      }
    },
    changeValue(value) {
      this.show = true
      this.$emit('input', value)
    },
    computedDir() {
      const { input, color } = this.$refs
      const rect = input.$el.getBoundingClientRect()
      const { clientHeight } = document.body
      const { display, visibility } = window.getComputedStyle(color)
      color.style.display = 'block'
      color.style.visibility = 'hidden'
      const { height } = color.getBoundingClientRect()
      if (rect.bottom + 20 + height > clientHeight) {
        color.style.top = `${-height - 10}px`
      } else {
        color.style.top = `${rect.bottom - rect.top + 10}px`
      }
      color.style.display = display
      color.style.visibility = visibility
    },
  },
  components: {
    SvInput,
    'chrome-picker': Chrome,
  },
}
</script>

<style scoped lang="stylus">
.color-box
  position relative
  width 150px

  .input >>> input
    padding-right 20px

  .opacity-block
    /* 事件穿透 */
    pointer-events none
    position absolute
    width 14px
    height 14px
    border-radius 3px
    top 5px
    right 3px
    overflow hidden
    background-size 10px 10px
    background-position 0 0, 5px 5px
    background-image linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5),
    linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5)

    .show-color
      position absolute
      width 100%
      height 100%


  .slider-leave-to, .slider-enter
    opacity 0
    transform translateY(-16px)

  .slider-leave-active, .slider-enter-active
    transition all .3s ease-in-out
    transform-origin top

  .color-picker
    position absolute
    z-index 9
</style>
