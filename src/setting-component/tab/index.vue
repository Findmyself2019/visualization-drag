<template>
  <div class="tab-box">
    <div class="tab-nav">
      <span
        :class="['tab-bar', {active: name == value}]"
        v-for="({label, name}, index) in titles"
        :key="index"
        @click="clickHandler(name)"
      >{{ label }}</span>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      titles: []
    }
  },
  mounted() {
    this.$slots.default.map(({componentOptions: {propsData: {label, name}}}) => {
      this.titles.push({label, name})
    })
  },
  methods: {
    clickHandler(name) {
      this.$emit('input', name)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .tab-box
    width 100%
    height 100%
    display flex
    flex-direction column
    justify-content flex-start
    align-content center
    
    .tab-nav
      vertical-center(30px)
      background-color #484f5e
      font-size 14px
      
      .tab-bar
        padding 0 15px
        display inline-block
        cursor pointer
        
        &.active
          background-color #373e4c
  
    .tab-content
      overflow-x hidden
      height calc(100% - 30px)
</style>