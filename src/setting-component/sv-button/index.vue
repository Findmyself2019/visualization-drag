<template>
  <div
    :class="['button', { loading }]"
    @click="($event) => !loading && $emit('click', $event)"
  >
    <i class="loading iconfont sv-loading" v-if="loading"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SvButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.button
  box()
  cursor pointer
  padding 4px 7px
  border-radius 3px
  border 1px solid
  color theme-color
  display inline-flex
  align-items center
  justify-content center

  &.loading
    opacity 0.8

  &:hover
    opacity 0.8

  .loading
    font-size 12px
    font-weight bold
    margin-right 6px
    animation rotate 1s linear infinite

@keyframes rotate
  to
    transform rotate(1turn)
</style>
