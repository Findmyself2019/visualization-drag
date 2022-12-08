<!-- 极坐标系设置 -->
<template>
  <fold label="极坐标设置">
    <div slot="content">
      <fold-in :can-open="false" label="位置">
        <div slot="content">
          <form-row label="水平方向">
            <number-input
              :min="0"
              :max="100"
              :parse="parsePercent"
              :formatter="formatterPercent"
              v-model="polar[0].center[0]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
          <form-row label="竖直方向">
            <number-input
              :min="0"
              :max="100"
              :parse="parsePercent"
              :formatter="formatterPercent"
              v-model="polar[0].center[1]"
            >
              <span slot="suffix">%</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <form-row label="半径">
        <number-input
          :min="0"
          :parse="parsePercent"
          :formatter="formatterPercent"
          v-model="polar[0].radius"
        >
          <span slot="suffix">%</span>
        </number-input>
      </form-row>
    </div>
  </fold>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Fold from '@/setting-component/fold/index'
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'

export default {
  name: 'EchartsPolar',
  components: { NumberInput, FormRow, FoldIn, Fold },
  computed: {
    ...mapState('echartsSetting', ['polar']),
  },
  watch: {
    polar: {
      deep: true,
      immediate: true,
      handler(setting) {
        this.changeComSetting({
          setting,
          key: 'polar',
        })
        this.setPolar(setting)
      },
    },
  },
  methods: {
    ...mapActions('echartsSetting', ['setPolar']),
    ...mapActions('pageComList', ['changeComSetting']),
    parsePercent: (value) => value.replace('%', ''),
    formatterPercent: (value) => `${value}%`,
  },
}
</script>

<style scoped lang="stylus"></style>
