<template>
  <div class="setting_box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="属性" name="attr">
        <div v-if="curComponent" class="setting-content">
          <size-position-setting />
          <echarts-title />
          <echarts-grid />
          <echarts-x-axis />
          <echarts-y-axis />
          <echarts-legend />
          <echarts-tooltip />
          <!-- <echarts-line /> -->
          <!-- <echarts-bar />
          <echarts-actions /> -->
          <!-- <component-setting-function /> -->
        </div>
        <p v-else class="placeholder">请选择组件</p>
      </el-tab-pane>
      <el-tab-pane label="动画" name="animation">
        <AnimationList v-if="curComponent" />
        <p v-else class="placeholder">请选择组件</p>
      </el-tab-pane>
      <el-tab-pane label="事件" name="events">
        <EventList v-if="curComponent" />
        <p v-else class="placeholder">请选择组件</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import * as echart from 'echarts'
import { mapState } from 'vuex'
// import AttrList from '@/components/attrList' // 右侧属性列表
import AnimationList from '@/components/animationList' // 右侧动画列表
import EventList from '@/components/eventList' // 右侧事件列表
import EchartsTitle from '@/echarts-setting/echarts-title/index.vue'
import EchartsXAxis from '@/echarts-setting/echarts-x-axis/index'
import EchartsYAxis from '@/echarts-setting/echarts-y-axis/index'
import EchartsGrid from '@/echarts-setting/echarts-grid/index'
import EchartsTooltip from '@/echarts-setting/echarts-tooltip/index'
// import EchartsBar from '@/echarts-setting/echarts-bar/index'
import SizePositionSetting from '@/common-component/size-position-setting/index'
import EchartsLegend from '@/echarts-setting/echarts-legend/index'
// import EchartsActions from '@/echarts-setting/echarts-actions/index'
export default {
  name: 'BarChartSetting',
  data() {
    return {
      chart: null,
      activeName: 'attr',
    }
  },
  components: {
    // AttrList,
    AnimationList,
    EventList,
    EchartsTitle,
    EchartsXAxis,
    EchartsTooltip,
    // EchartsBar,
    SizePositionSetting,
    EchartsLegend,
    // EchartsActions,
    EchartsYAxis,
    EchartsGrid,
  },
  computed: {
    ...mapState(['curComponent']),
  },
  mounted() {
    // this.chart = echart.init(this.$refs.chart)
    // this.chart.setOption(option)
  },
}
</script>

<style scoped lang="less">
.setting_box {
  height: 100%;
  .setting-content {
    overflow-y: auto;
    height: 100%;
    :deep(.el-tabs) {
      height: 100%;
    }
  }
}
</style>
