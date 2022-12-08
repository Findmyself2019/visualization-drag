<template>
  <div
    class="form-row"
    :style="{
      flexDirection: isCol ? 'column': 'row',
      alignItems: isCol ? 'initial' : 'center'
    }"
  >
    <div v-if="labelSlot" class="row-name-slot">
      <slot name="label"></slot>
    </div>
    <span
      v-else
      class="row-name"
      :style="{marginBottom: isCol ? '10px' : 0}"
    >{{ label }}</span>
    <div
      class="row-setting"
      :style="{marginLeft: isCol ? '12px' : 0, maxWidth: isCol ? '' : '150px'}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormRow",
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    dir: {
      type: String,
      default: 'row'
    }
  },
  computed: {
    isCol() {
      return this.dir === 'column'
    },
    labelSlot() {
      return this.$slots.label
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .form-row
    display flex
    justify-content flex-start
    margin-bottom 10px

    .row-name
      display flex
      align-items center
      flex 1
      margin-right 10px
      padding-left 12px

    .row-name-slot
      flex 1
      margin-right 10px
      padding-left 12px


</style>
