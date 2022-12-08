<template>
  <div class="radio-box" @click="handleClick">
    <div :class="['icon', {active}]">
      <span class="empty-circle">
        <transition name="rotate">
          <span v-if="active" class="circle"></span>
        </transition>
      </span>
    </div>
    <div class="label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  computed: {
    active() {
      return this.$parent.value === this.value
    }
  },
  mounted() {
  },
  methods: {
    handleClick() {
      this.$parent.$emit('select', this.value)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .radio-box
    display flex
    align-items center
    justify-content flex-start
    cursor pointer
    margin-left 10px
  
    .icon
  
      .empty-circle
        box()
        height 12px
        width 12px
        border-radius 50%
        border 1px solid #ffffff
        display flex
        align-items center
        justify-content center
        margin-right 5px
        
      &.active
    
        .empty-circle
          border-color theme-color
    
          .rotate-enter, .rotate-leave-to
            transform scale(0)
            
          .rotate-enter-active, .rotate-leave-active
            transition .2s ease-in-out
            
          .circle
            transition .3s ease-in-out
            width 6px
            height 6px
            background-color theme-color
            border-radius 50%
          
</style>
