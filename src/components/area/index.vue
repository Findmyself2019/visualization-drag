<template>
  <div
    class="area"
    :style="{
      left: start.x + 'px', top: start.y + 'px', width: width + 'px', height: height + 'px'
    }"
  ></div>
</template>

<script>
export default {
  name: 'Area',
  data () {
    return {

    }
  },
  props: {
    start: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
  }
}
</script>

<style scoped lang="less">
.area {
  border: 1px solid #70c0ff;
  position: absolute;
}
</style>
