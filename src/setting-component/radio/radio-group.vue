<template>
  <div class="radio-group-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RadioGroup",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  mounted() {
    this.$on('select', function(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    })
  }
}
</script>

<style scoped lang="stylus">
  .radio-group-box
    display flex
    align-items center
    justify-content flex-start
</style>
