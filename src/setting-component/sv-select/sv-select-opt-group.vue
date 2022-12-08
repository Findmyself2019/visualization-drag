<template functional>
  <div class="opt-group">
    <div class="label-box">
      <slot name="label"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SvSelectOptGroup"
}
</script>

<style scoped lang="stylus">
  .opt-group >>>
  
    .select-option
      padding-left 15px
    
  .label-box
    color #b7b7b7
    padding 4px 6px
    transform scale(0.9)
    transform-origin center left
    
</style>
