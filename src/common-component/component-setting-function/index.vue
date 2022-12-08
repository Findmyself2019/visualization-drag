<!-- 组件配置修改 -->
<template>
  <fold label="组件配置修改函数">
    <div slot="content">
      <form-row dir="column">
        <function-input v-model="settingHandleFunction" />
      </form-row>
    </div>
  </fold>
</template>

<script>
import { FocusComInfoMixins } from '@/mixins'
import { mapActions } from 'vuex'
import Fold from '@/setting-component/fold'
import FunctionInput from '@/setting-component/function-input'
import FormRow from '@/setting-component/form-row'

export default {
  name: 'ComponentSettingFunction',
  mixins: [FocusComInfoMixins],
  computed: {
    settingHandleFunction: {
      get() {
        return (
          this.focusComInfo[0].setting.settingHandleFunction ||
          new Function('setting', 'data', 'return setting')
        )
      },
      set(value) {
        this.changeComSetting({
          key: 'settingHandleFunction',
          setting: value,
        })
      },
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
  },
  components: {
    FormRow,
    FunctionInput,
    Fold,
  },
}
</script>

<style scoped lang="stylus"></style>
