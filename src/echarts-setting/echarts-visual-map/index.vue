<!-- echarts visualMap 配置 -->
<template>
  <fold label="视觉映射设置">
    <div slot="pane-right">
      <div class="type-box">
        <sv-select v-model="type" class="select">
          <sv-select-option
            v-for="(item, index) in types"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
        <i class="iconfont sv-tianjia1" @click="addVisualMap"></i>
      </div>
    </div>
    <div slot="content">
      <div v-for="(item, index) in visualMap" :key="index">
        <echarts-visual-map-of-continuous
          v-if="item.type === 'continuous'"
          :visual-map="item"
          :index="index"
          @removeVisualMap="removeVisualMap(index)"
        />
        <echarts-visual-map-of-piecewise
          v-if="item.type === 'piecewise'"
          :visual-map="item"
          :index="index"
          @removeVisualMap="removeVisualMap(index)"
        />
      </div>
    </div>
  </fold>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Fold from '@/setting-component/fold/index'
import EchartsVisualMapOfContinuous from '@/echarts-setting/echarts-visual-map-of-continuous/index'
import EchartsVisualMapOfPiecewise from '@/echarts-setting/echarts-visual-map-of-piecewise/index'
import SvSelect from '@/setting-component/sv-select/index'
import { VISUAL_MAP_TYPES } from '@/constants/echarts-constans'
import {
  DEFAULT_BASE_MAP_VISUAL_MAP_OF_CONTINUOUS_SETTING,
  DEFAULT_BASE_MAP_VISUAL_MAP_OF_PIECEWISE_SETTING,
} from '@/common-component/map-setting/default-setting'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'

export default {
  name: 'EchartsVisualMap',
  data() {
    return {
      types: VISUAL_MAP_TYPES,
      type: 'piecewise',
    }
  },
  computed: {
    ...mapState('echartsSetting', ['visualMap']),
  },
  watch: {
    visualMap: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          key: 'visualMap',
          setting,
        })
      },
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
    // 添加视觉映射
    addVisualMap() {
      const { type } = this
      if (type === 'piecewise') {
        this.visualMap.push(DEFAULT_BASE_MAP_VISUAL_MAP_OF_PIECEWISE_SETTING)
      } else if (type === 'continuous') {
        this.visualMap.push(DEFAULT_BASE_MAP_VISUAL_MAP_OF_CONTINUOUS_SETTING)
      }
    },
    // 移除视觉映射
    removeVisualMap(index) {
      this.visualMap.splice(index, 1)
    },
  },
  components: {
    SvSelectOption,
    SvSelect,
    EchartsVisualMapOfPiecewise,
    EchartsVisualMapOfContinuous,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.type-box
  display flex
  align-items center

  .select
    width 100px

  .iconfont
    margin-left 15px
    cursor pointer

    &:hover
      color theme-color
</style>
