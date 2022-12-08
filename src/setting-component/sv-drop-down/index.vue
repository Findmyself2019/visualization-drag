<template>
  <div class="dropdown-box">
    <div
      class="button-box"
      ref="button"
      @click="handleClick"
    >
      <slot name="button"></slot>
    </div>
    <transition name="show">
      <div
        class="menu-box"
        v-show="selfVisible"
        ref="menu"
      >
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SvDropdown",
  props: {
    visible: {
      type: Boolean,
      default: undefined
    }
  },
  provide() {
    return {
      dropdown: this
    }
  },
  data() {
    return {
      selfVisible: this.visible || false
    }
  },
  watch: {
    selfVisible(value) {
      if (this.visible !== undefined) {
        this.$emit('change', value)
      }
      if (value) {
        window.addEventListener('click', this.hide)
      }
    }
  },
  methods: {
    handleClick() {
      if (!this.selfVisible) {
        const {button, menu} = this.$refs
        const buttonHeight = button.getBoundingClientRect().height
        const {y} = button.getBoundingClientRect()
        const {clientHeight} = document.body
        const {display, visibility} = window.getComputedStyle(menu)
        menu.style.display = 'block'
        menu.style.visibility = 'hidden'
        const menuHeight = menu.getBoundingClientRect().height
        
        if (y + buttonHeight + menuHeight + 20 > clientHeight) {
          menu.style.top = `${- menuHeight - 6}px`
        } else {
          menu.style.top = `${buttonHeight + 6}px`
        }
  
        menu.style.display = display
        menu.style.visibility = visibility
      }
      setTimeout(() => this.selfVisible = !this.selfVisible)
    },
    hide({target}) {
      const {button} = this.$refs
      if (button && !button.contains(target)) {
        this.selfVisible = false
        window.removeEventListener('click', this.hide)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .dropdown-box
    display inline-block
    position relative
  
    .button-box
      display inline-block
      width 100%
      
    .show-enter, .show-leave-to
      opacity 0
      transform translateY(10px)
  
    .show-enter-active, .show-leave-active
      transition all .2s ease-in
  
    .menu-box
      position absolute
      z-index 9
      border 1px solid theme-color
      border-radius 3px
      width 100%
      background-color form-bg-color
      max-height 200px
      overflow-y auto
    
</style>
