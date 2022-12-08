<template>
  <fold label="轮播设置">
    <div slot="content">
      <form-row label="开启轮播">
        <sv-checkbox v-model="actions.show" />
      </form-row>
      <form-row label="轮播间隔">
        <number-input v-model="actions.interval" :min="0">
          <span slot="suffix">ms</span>
        </number-input>
      </form-row>
      <form-row label="循环轮播">
        <sv-checkbox v-model="actions.loop" />
      </form-row>
    </div>
  </fold>
</template>

<script>
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import { mapState, mapActions } from 'vuex'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import Fold from '@/setting-component/fold/index'

export default {
  name: 'EchartsActions',
  computed: {
    ...mapState('echartsSetting', ['actions']),
  },
  watch: {
    actions: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          key: 'actions',
          setting,
        })
      },
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
  },
  components: {
    Fold,
    NumberInput,
    FormRow,
    SvCheckbox,
  },
}
</script>

<style scoped lang="stylus"></style>
