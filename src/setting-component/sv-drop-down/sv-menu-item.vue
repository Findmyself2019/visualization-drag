<template>
  <div class="menu-item" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SvMenuItem",
  inject: ['dropdown'],
  props: {
    flag: {
      type: [Number, String, Object],
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.dropdown.$emit('menuItemClick', this.flag)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .menu-item
    display flex
    align-items center
    padding 4px 10px
    cursor pointer
    
    &:hover
      background-color theme-color
</style>
