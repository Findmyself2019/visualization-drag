<template>
  <div class="vd-right-side">
    <div class="setting-area">
      <component :is="currentCom" v-if="curComponent"/>
      <!-- <loading :loading="loading" /> -->
      <div class="empty" v-else>请选择组件！</div>
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
    ...mapState(['settingPath','curComponent'])
  },
  watch: {
    'settingPath': {
      async handler () {
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
      ::v-deep .el-tabs{
        height: 100%;  
      }
      ::v-deep .el-tabs__content{
        height: calc(100% - 55px);
        overflow-y: auto;
      }
    }
  }
</style>
