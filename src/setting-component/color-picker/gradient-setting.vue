<template>
  <div class="linear-gradient-box">
    <div class="linear-transparent">
      <div class="gradient-linear">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GradientSetting"
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .linear-transparent
    height 6px
    width calc(100% - 20px)
    border-radius 10px
    margin 10px
    background-color #ffffff
    background-image linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5), linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5)
    background-size 6px 6px
    background-position 0 0, 3px 3px
  
    .gradient-linear
      height 100%
      width 100%
      background linear-gradient(90deg, #ffffff, #ff0000)
      border-radius 10px
      position relative
      
      .bar
        box()
        position absolute
        right 0
        top 0
        bottom 0
        margin auto
        height 12px
        width 12px
        border-radius 50%
        background-color transparent
        border 3px solid #ffffff
        cursor pointer
       
</style>
