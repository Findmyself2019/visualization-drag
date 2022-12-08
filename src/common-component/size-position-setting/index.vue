<template>
  <fold label="尺寸及位置" :open="false">
    <div slot="content">
      <fold-in :can-open="false" label="尺寸">
        <div class="row" slot="content">
          <form-row label="宽">
            <number-input v-model="sizeAndPos.width">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="高">
            <number-input v-model="sizeAndPos.height">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <fold-in label="位置" :can-open="false">
        <div class="row" slot="content">
          <form-row label="左">
            <number-input v-model="sizeAndPos.left">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="上">
            <number-input v-model="sizeAndPos.top">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import Fold from '@/setting-component/fold/index'
import FoldIn from '@/setting-component/fold-in/index'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SizePositionSetting',
  computed: {
    ...mapGetters('pageComList', ['focusComInfo']),
    sizeAndPos() {
      const { focusComInfo } = this
      if (focusComInfo.length === 1) {
        return focusComInfo[0].sizeAndPos
      }
      return null
    },
  },
  watch: {
    sizeAndPos: {
      deep: true,
      handler(obj) {
        this.changeComSizeAndPos({
          id: this.focusComInfo[0].id,
          sizeAndPos: obj,
        })
      },
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSizeAndPos']),
  },
  components: {
    FormRow,
    NumberInput,
    Fold,
    FoldIn,
  },
}
</script>

<style scoped lang="stylus">
.row
  display flex
  justify-content space-between
</style>
