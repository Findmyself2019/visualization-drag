<template>
  <textarea
    class="textarea"
    :value="value"
    @input="handleInput"
  ></textarea>
</template>

<script>
export default {
  name: "SvTextarea",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .textarea
    box()
    resize none
    background-color form-bg-color
    outline none
    color #ffffff
    font-size 12px
    padding 8px
    border 1px solid form-bg-color
    
    &:focus
      border 1px solid theme-color
</style>
