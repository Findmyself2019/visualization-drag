<template>
  <div class="input-box">
    <div class="input-prefix" v-if="getPrefixVisible">
      <slot name="prefix"></slot>
    </div>
    <input
      v-bind="$attrs"
      class="input"
      v-on="inputListeners"
      ref="input"
      :style="{paddingLeft: getPrefixVisible && '15px'}"
      :value="value"
    />
    <div class="input-suffix" v-if="getSuffixVisible">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SvInput",
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    inputListeners() {
      const self = this
      return Object.assign({}, self.$listeners,
        {
          input: function(event) {
            self.$emit('input', event.target.value)
          }
        })
    },
    getPrefixVisible() {
      return this.$slots.prefix
    },
    getSuffixVisible() {
      return this.$slots.suffix
    }
  },
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .input-box
    display flex
    justify-content flex-start
    align-content stretch
    position relative
    font-size 12px
    
    .input
      box()
      background-color form-bg-color
      border 1px solid form-bg-color
      color #ffffff
      padding 0 7px
      height form-height
      width 100%
      
      &::-webkit-input-placeholder
        color #d7d7d7
        
      &::-moz-input-placeholder
        color #d7d7d7
        
      &::-ms-input-placeholder
        color #d7d7d7
      
      &:focus
        outline 0
        border 1px solid theme-color
  
    .input-prefix
      position absolute
      vertical-center(form-height)
      background-color transparent
      padding 0 6px
      color #cecece
      
    .input-suffix
      vertical-center(form-height)
      background-color #484e5d
      padding 0 6px
      color #ffffff
</style>
