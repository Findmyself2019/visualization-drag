<template>
  <div
    :class="['select-option', {selected}]"
    @click="handleClick"
    ref="option"
  >
    <slot></slot>
    <i v-if="select.multiple && Array.isArray(select.value) && select.value.includes(value)" class="iconfont sv-check"></i>
  </div>
</template>

<script>

export default {
  name: "SvSelectOption",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number],
      default: undefined
    }
  },
  inject: ['select'],
  computed: {
    selected() {
      return this.select.value === this.value
    },
    open() {
      return this.select.open
    }
  },
  watch: {
    open: {
      handler(open) {
        // 显示被选中项
        if(open && this.$refs.option.classList.contains('selected')) {
          const top = this.$refs.option.offsetTop
          if (top > 200) {
            this.select.$refs.pane.scrollTop = top
          }
        }
      }
    }
  },
  created() {
    this.select.$emit('setSelected', this)
    this.select.options.push(this)
  },
  mounted() {
    this.select.create = false
  },
  beforeDestroy() {
    const index = this.select.options.indexOf(this)
    if (index > -1) {
      this.select.options.splice(index, 1)
    }
  },
  methods: {
    handleClick() {
      const {value, label} = this
      if (this.select.multiple) {
        const arr = this.select.value
        const index = arr.indexOf(value)
        if (index > -1) {
          arr.splice(index, 1)
        } else {
          if (arr.length < this.select.maxSelectLength) {
            arr.push(value)
          }
        }
        this.select.$emit('input', arr)
        this.$nextTick(() => {
          const {inputBox} = this.select.$refs
          if (inputBox) {
            const {height} = inputBox.getBoundingClientRect()
            this.select.$refs.pane.style.top = height + 10 + 'px'
          }
        })
      } else {
        this.select.label = label
        this.select.$emit('input', value)
        this.select.$emit('change', {value, label: label === undefined ? value : label})
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .select-option
    color #ffffff
    cursor default
    word-break break-all
    padding 5px 6px
    display flex
    align-items center
    justify-content space-between

    &:hover
      background-color #6faef5

    &.selected
      background-color theme-color

    .iconfont
      font-size 14px
</style>
