<template>
  <fold label="网格">
    <div slot="pane-right">
      <sv-checkbox v-model="grid.show" />
    </div>
    <div slot="content">
      <fold-in label="边距" :can-open="false">
        <div slot="content">
          <form-row label="上">
            <number-input v-model="grid.top">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="下">
            <number-input v-model="grid.bottom">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="左">
            <number-input v-model="grid.left">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="右">
            <number-input v-model="grid.right">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import { mapState, mapActions,mapMutations } from 'vuex'
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
export default {
  name: 'EchartsGrid',
  computed: {
    ...mapState('echartsSetting', ['grid']),
  },
  watch: {
    grid: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          setting,
          key: 'grid',
        })
        this.setGrid(setting)
      },
    },
  },
  methods: {
    ...mapActions('echartsSetting', ['setGrid']),
    ...mapMutations(['updateComSetting']),
  },
  components: {
    NumberInput,
    FormRow,
    FoldIn,
    SvCheckbox,
    Fold,
  },
}
</script>

<style scoped lang="stylus"></style>
