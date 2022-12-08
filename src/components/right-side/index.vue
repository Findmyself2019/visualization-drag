<template>
  <div class="vd-right-side">
    <div class="setting-area">
      <component :is="currentCom" />
      <!-- <loading :loading="loading" /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RightSide',
  data() {
    return {
      currentCom: null,
      loading:false
    }
  },
  computed: {
    ...mapState(['settingPath'])
  },
  watch: {
    'settingPath': {
      async handler () {
        console.log(5345345345)
        this.loading = true
        // 先销毁组件
        this.currentCom = null
        this.currentCom = ()=>import(`@/${this.settingPath}`)
        this.loading = false
      },
      immediate:true
    }
  }
}
</script>

<style scoped lang="less">
  .vd-right-side{
    height: 100%;
    .setting-area{
      height: 100%;
    }
  }
</style>
