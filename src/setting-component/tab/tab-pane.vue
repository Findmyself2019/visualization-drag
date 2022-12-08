<template>
  <div
    class="tab-pane"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabPane",
  props: {
    label: {
      type: String,
      default: ''
    }, // 标签标题
    name: {
      type: String,
      default: ''
    }, // 切换标识
  },
  computed: {
    active() {
      return this.$parent.value === this.name
    }
  }
}
</script>

<style scoped lang="stylus">
  .tab-pane
    position relative
</style>