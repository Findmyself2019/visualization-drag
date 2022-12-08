<template>
  <tab v-model="select">
    <tab-pane label="配置" name="配置" class="pane">
      <div class="explain">
        <div class="title">
          地图飞线配置
        </div>
        <i class="iconfont sv-head-back" @click="back"></i>
      </div>
      <div class="setting-content">
        <echarts-map-lines />
      </div>
    </tab-pane>
    <tab-pane label="数据" name="数据" class="pane">
      <div class="explain">
        地图飞线数据配置
      </div>
      <div class="setting-content">
        <data-source-setting />
      </div>
    </tab-pane>
  </tab>
</template>

<script>
import Tab from '@/setting-component/tab/index'
import TabPane from '@/setting-component/tab/tab-pane'
import EchartsMapLines from '@/echarts-setting/echarts-map-lines/index'
import { mapActions } from 'vuex'
import DataSourceSetting from '@/common-component/map-lines-setting/data-source-setting'

export default {
  name: 'MapLinesSetting',
  data() {
    return {
      select: '配置',
    }
  },
  methods: {
    ...mapActions('workbench', ['setSettingPath', 'setSeriesIndex']),
    back() {
      this.setSeriesIndex(0)
      // 返回至地图配置
      this.setSettingPath('component-settings/map-setting/index.vue')
    },
  },
  beforeDestroy() {
    // 从地图子组件切换至其他组件时重置series索引
    this.setSeriesIndex(0)
  },
  components: {
    DataSourceSetting,
    EchartsMapLines,
    TabPane,
    Tab,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.pane

  .explain
    padding 10px 15px
    display flex
    align-items center
    justify-content space-between

  .iconfont
    height 22px
    font-size 18px
    cursor pointer
    color  theme-color
    transition all .3s linear

    &:hover
      opacity 0.8
</style>
