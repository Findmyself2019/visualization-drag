<template>
  <span class="box">
    <span>{{ label }}</span>
    <i
      v-show="!value"
      class="iconfont sv-danxuankuang1"
      @click="selectBoolean"
    ></i>
    <i
      v-show="value"
      class="iconfont sv-danxuankuang"
      @click="selectBoolean"
    ></i>
  </span>
</template>

<script>
export default {
  name: "SvCheckbox",
  props:{
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    selectBoolean(){
      this.$emit('input',!this.value)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .box
    cursor pointer
    .iconfont
      font-size: 12px

</style>
