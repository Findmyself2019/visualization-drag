<template>
  <div class="select-box">
    <div
      :class="['input-box', {border: open}, {multiple}]"
      @click="handlerClick"
      ref="inputBox"
    >
      <ul v-if="multiple" class="select-value">
        <li
          v-for="(item, index) in labels"
          :key="index"
          class="select-item"
        >
          <span>
            {{ item }}
          </span>
          <i class="iconfont sv-guanbi1" @click.stop="removeOption(index)"></i>
        </li>
      </ul>
      <input
        v-else
        class="select-input"
        ref="input"
        :placeholder="placeholder"
        :readonly="!showSearch"
        :value="label"
        @focus="focus = true"
        @input="handleInput"
      />
      <span class="arrow">
        <i :class="['iconfont', 'sv-below-s', {rotate: open}]"></i>
      </span>
    </div>
    <transition name="show">
      <div
        class="select-pane"
        v-show="open"
        ref="pane"
      >
        <div
          class="no-data"
          v-if="showSearch && (!this.$slots.default || (this.$slots.default && this.$slots.default.length === 0))"
        >
          --未找到内容--
        </div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: "SvSelect",
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    multiple: { // 多选模式
      type: Boolean,
      default: false
    },
    maxSelectLength: { // 最多选择个数
      type: Number,
      default: Number.POSITIVE_INFINITY
    }
  },
  provide() {
    return {
      select: this
    }
  },
  data() {
    return {
      open: false,
      options: [],
      label: '',
      create: true,
      focus: false
    }
  },
  computed: {
    mapping() {
      const {options} = this
      return options.reduce((res, curr) => {
        res[curr.label] = curr.value
        return res
      }, {})
    },
    labels() {
      const {options, value, multiple} = this
      const arr = []
      if (multiple && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < options.length; j++) {
            if(value[i] === options[j].value) {
              arr.push(options[j].label)
              break
            }
          }
        }
        return arr
      }
      return []
    }
  },
  watch: {
    open(open) {
      if (!open && !this.multiple) {
        this.$refs.input.blur()
      }
    },
    mapping: {
      deep: true,
      handler(mapping) {
        const {value, label, showSearch, multiple} = this
        if (!showSearch && !multiple) {
          const labels = Object.keys(mapping)
          const values = Object.values(mapping)
          // 默认选中第一个
          !values.includes(value) && (this.$emit('input', values[0]))
          !labels.includes(label) && (this.label = labels[0])
        }
      }
    },
    value(value) {
      const {mapping} = this
      const labels = Object.keys(mapping)
      const values = Object.values(mapping)
      const index = values.indexOf(value)
      this.label = labels[index]
    }
  },
  created() {
    this.$on('setSelected', (option) => {
      !this.focus && option.value === this.value && (this.label = option.label || option.value)
    })
  },
  methods: {
    handlerClick(e) {
      this.multiple && e.stopPropagation()
      const {showSearch, open} = this
      if (!(showSearch && open)) {
        if (!open) {
          const {pane, inputBox} = this.$refs
          const {display, visibility} = window.getComputedStyle(pane)
          const inputStyle = inputBox.getBoundingClientRect()
          const inputY = inputStyle.y
          const inputHeight = inputStyle.height
          const {clientHeight} = document.body
          pane.style.display = 'block'
          pane.style.visibility = 'hidden'
          const {height} = pane.getBoundingClientRect()

          // 向上展开
          if (inputY + inputHeight + height + 20 > clientHeight) {
            pane.style.top = `${- height - 10}px`
          } else {
            pane.style.top = `${inputHeight + 10}px`
          }

          pane.style.display = display
          pane.style.visibility = visibility
        }
        setTimeout(() => this.open = !this.open)
      }
      setTimeout(() => window.addEventListener('click', this.hidePane))
    },
    hidePane({target}) {
      const {inputBox, pane} = this.$refs
      if (this.multiple) {
        if (pane && !pane.contains(target)) {
          this.open = false
          window.removeEventListener('click', this.hidePane)
        }
      } else {
        if (inputBox && !inputBox.contains(target)) {
          this.open = false
          window.removeEventListener('click', this.hidePane)
        }
      }
    },
    removeOption(index) {
      this.value.splice(index, 1)
      this.$emit('input', this.value)
    },
    handleInput(event) {
      this.label = event.target.value
      this.$emit('search', event.target.value)
    },
  }
}
</script>


<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .select-box
    position relative
    width 100%

    .input-box
      box()
      vertical-center(form-height)
      background form-bg-color
      cursor pointer
      position relative
      border 1px solid form-bg-color

      &.multiple
        height auto
        padding 4px
        min-height 30px

      .select-value
        list-style none
        display flex
        justify-content flex-start
        align-items center
        flex-wrap wrap
        margin 0
        margin-right 18px

        .select-item
          margin 2px
          background-color #56575b
          padding 2px 4px
          line-height 1.1
          display flex
          align-items center
          justify-content space-between
          border-radius 3px
          font-size 12px
          transition padding .3s cubic-bezier(.645,.045,.355,1)

          .iconfont
            font-size 12px
            margin-left 5px
            cursor pointer

      &.border
        border 1px solid theme-color


      .select-input
        box()
        width 100%
        cursor pointer
        border none
        background transparent
        height 100%
        padding 0 22px 0 8px
        color #ffffff
        float left
        text-overflow ellipsis

        &:focus
          outline none

      .arrow
        position absolute
        top 0
        bottom 0
        right 0
        width 22px
        display flex
        align-items center
        justify-content center

        .iconfont
          font-size 12px
          transition all 0.3s ease-in-out

          &.rotate
            transform rotate(180deg)

    .show-enter, .show-leave-to
      transform translateY(20px)
      opacity 0

    .show-enter-active, .show-leave-active
      transition all 0.3s ease-in-out

    .select-pane
      border 1px solid theme-color
      position absolute
      left 0
      top 34px
      background form-bg-color
      width 100%
      max-height 200px
      overflow-y auto
      z-index 99

      .no-data
        padding 3px 10px
        text-align center
</style>
