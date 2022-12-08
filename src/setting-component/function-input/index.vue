<template>
  <function-code
    :fn-name="fnName"
    :fn-params="fnParams"
    :fn-body="fnBody"
    :show-full="showFull"
    :imm-edit="immEdit"
    @save="handleSave"
  />
</template>

<script>
import { getFunctionBodyAndParams } from '@/utils/util'
import FunctionCode from '@/setting-component/function-code/index'

export default {
  name: 'FunctionInput',
  components: { FunctionCode },
  props: {
    value: {
      type: Function,
      default: function() {},
    },
    fnName: {
      type: String,
      default: 'formatter',
    },
    showFull: {
      // 可放大
      type: Boolean,
      default: true,
    },
    immEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fnParams: [],
      fnBody: '',
    }
  },
  created() {
    const { body, params } = getFunctionBodyAndParams(this.value)
    this.fnBody = body
    this.fnParams = params
  },
  watch: {
    fnBody(body) {
      this.$emit('input', new Function(...this.fnParams, body))
    },
  },
  methods: {
    handleSave(value) {
      this.fnBody = value
    },
  },
}
</script>

<style scoped lang="stylus"></style>
