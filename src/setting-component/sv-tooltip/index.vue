<!-- 提示工具 -->
<template>
  <div class="tooltip-box">
    <span
      ref="trigger"
      class="trigger"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseLeave"
    >
      <slot></slot>
      <transition :name="contentClass">
        <div
          :class="['tooltip-content', placement]"
          v-show="show"
          :style="{left: `${position.left}px`, top: `${position.top}px`}"
          ref="content"
        >
          <slot name="content"></slot>
        </div>
      </transition>
    </span>
  </div>
</template>

<script>
export default {
  name: "SvTooltip",
  props: {
    placement: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      position: {
        top: 0,
        left: 0
      },
      show: false
    }
  },
  computed: {
    contentClass() {
      return this.placement
    }
  },
  methods: {
    handleMouseenter() {
      this.computePos()
      this.$nextTick(() => {
        this.show = true
      })
    },
    handleMouseLeave() {
      this.show = false
    },
    computePos() {
      const {placement} = this
      let {trigger, content} = this.$refs
      // trigger = trigger.children[0]
      const _display = window.getComputedStyle(content).display
      const _visibility = window.getComputedStyle(content).visibility
  
      content.style.visibility = 'hidden'
      content.style.display = 'block'
      const rect1 = trigger.getBoundingClientRect()
      const rect2 = content.getBoundingClientRect()
      const height1 = rect1.height
      // const height2 = rect2.height
      const width1 = rect1.width
      const width2 = rect2.width
      
      if (placement.indexOf('bottom') > -1) {
        this.position = {
          top: height1 + 10,
          left: (width1 - width2) / 2
        }
      } else if (placement.indexOf('top') > -1) {
        this.position = {
          top: - height1 - 12,
          left: (width1 - width2) / 2
        }
      }
      
      content.style.display = _display
      content.style.visibility = _visibility
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .tooltip-box
    position relative
    display inline-block
  
    .trigger
      display inline-block
      position relative
    
    .tooltip-content
      position absolute
      z-index 1
      background-color tooltip-bg
      padding 3px 6px
      border-radius 4px
      font-size 12px
      color #202020
      word-break keep-all
      
      &::after
        content ''
        position absolute
        margin auto
        
      &.top::after
        bottom -5px
        left 0
        right 0
        triangle(bottom, 5px , tooltip-bg)
      
      &.top-start::after
        bottom -5px
        left 12px
        triangle(bottom, 5px , tooltip-bg)
  
      &.bottom::after
        top -5px
        left 0
        right 0
        triangle(top, 5px , tooltip-bg)
        
      &.bottom-start::after
        top -5px
        left 12px
        triangle(top, 5px , tooltip-bg)
        
      &.bottom-end::after
        top -5px
        right 12px
        triangle(top, 5px , tooltip-bg)
  
      &.left::after
        left -5px
        top 0
        bottom 0
        triangle(right, 5px , tooltip-bg)
  
      &.right::after
        right -5px
        top 0
        bottom 0
        triangle(left, 5px , tooltip-bg)
        
    .top-enter, .top-leave-to
      transform translateY(-10px)
      opacity 0
      
    .top-enter-active, .top-leave-active
      transition all .5s ease-out
  
</style>
