<template>
  <tab v-model="select">
    <tab-pane label="配置" name="配置" class="pane">
      <div class="explain">
        <div class="title">{{ comName }}配置</div>
        <div>
          <sv-dropdown class="dropdown" @menuItemClick="addComponent">
            <sv-button slot="button" class="button">
              添加子组件
            </sv-button>
            <div slot="menu">
              <sv-menu-item
                v-for="(item, index) in componentTypes"
                :key="index"
                :flag="item"
              >
                <div class="item">
                  <i :class="['iconfont', item.icon]"></i>
                  <span>{{ item.label }}</span>
                </div>
              </sv-menu-item>
            </div>
          </sv-dropdown>
        </div>
        <div>
          <div
            class="child-box"
            v-for="(item, index) in childrenCom"
            :key="index"
            @click="toComponentSetting(item)"
          >
            <span class="name">{{ childMap[item.type].label }}</span>
            <i
              class="iconfont sv-lajitongshanchu"
              @click.stop="deleteComponent(item)"
            ></i>
          </div>
        </div>
      </div>
      <div class="setting-content">
        <size-position-setting />
        <echarts-title />
        <echarts-tooltip />
        <echarts-visual-map />
        <echarts-geo />
        <echarts-actions />
        <component-setting-function />
      </div>
    </tab-pane>
    <tab-pane label="数据" name="数据" class="pane">
      <div class="data-explain">{{ comName }}数据配置</div>
      <div class="setting-content">
        <data-source-setting />
      </div>
    </tab-pane>
    <tab-pane label="交互" name="交互" class="pane">
      <div class="data-explain">{{ comName }}交互配置</div>
      <div class="setting-content">
        <echarts-interactive-setting :events="events" />
      </div>
    </tab-pane>
  </tab>
</template>

<script>
import EchartsTitle from '@/echarts-setting/echarts-title/index.vue'
import Tab from '@/setting-component/tab/index'
import TabPane from '@/setting-component/tab/tab-pane'
import EchartsTooltip from '@/echarts-setting/echarts-tooltip/index'
import DataSourceSetting from '@/common-component/map-setting/data-source-setting'
import SizePositionSetting from '@/common-component/size-position-setting/index'
import { FocusComInfoMixins } from '@/mixins'
import EchartsVisualMap from '@/echarts-setting/echarts-visual-map/index'
import EchartsGeo from '@/echarts-setting/echarts-geo/index'
import SvDropdown from '@/setting-component/sv-drop-down/index'
import SvButton from '@/setting-component/sv-button/index'
import SvMenuItem from '@/setting-component/sv-drop-down/sv-menu-item'
import { mapState, mapActions } from 'vuex'
import {
  DEFAULT_BASE_MAP_LINES_DATA_SETTING,
  DEFAULT_BASE_MAP_LINES_SETTING,
} from '@/common-component/map-lines-setting/default-setting'
import {
  DEFAULT_BASE_MAP_EFFECT_SCATTER_DATA_SETTING,
  DEFAULT_BASE_MAP_EFFECT_SCATTER_SETTING,
} from '@/common-component/map-effect-scatter-setting/default-setting'
import {
  DEFAULT_BASE_MAP_SCATTER_DATA_SETTING,
  DEFAULT_BASE_MAP_SCATTER_SETTING,
} from '@/common-component/map-scatter-setting/default-setting'
import EchartsActions from '@/echarts-setting/echarts-actions/index'
import ComponentSettingFunction from '@/common-component/component-setting-function'
import EchartsInteractiveSetting from '@/common-component/echarts-interactive-setting'

export default {
  name: 'MapSetting',
  mixins: [FocusComInfoMixins],
  data() {
    return {
      select: '配置',
      componentTypes: [
        {
          label: '地图散点',
          value: 'scatter',
          icon: 'sv-GISditu_sandiantu',
          settingPath: 'component-settings/map-scatter-setting/index.vue',
          setting: {
            series: DEFAULT_BASE_MAP_SCATTER_SETTING,
            data: DEFAULT_BASE_MAP_SCATTER_DATA_SETTING,
          },
        },
        {
          label: '涟漪地图散点',
          value: 'effectScatter',
          icon: 'sv-lianyitu',
          settingPath:
            'component-settings/map-effect-scatter-setting/index.vue',
          setting: {
            series: DEFAULT_BASE_MAP_EFFECT_SCATTER_SETTING,
            data: DEFAULT_BASE_MAP_EFFECT_SCATTER_DATA_SETTING,
          },
        },
        {
          label: '地图飞线',
          value: 'lines',
          icon: 'sv-Dfeixian',
          settingPath: 'component-settings/map-lines-setting/index.vue',
          setting: {
            series: DEFAULT_BASE_MAP_LINES_SETTING,
            // 此处lines并不支持dataset，只是与其他组件保持一致
            data: DEFAULT_BASE_MAP_LINES_DATA_SETTING,
          },
        },
      ],
      events: [
        {
          label: '地图区域切换选中事件',
          value: 'geoselectchanged',
        },
      ],
    }
  },
  computed: {
    ...mapState('echartsSetting', ['series', 'dataset']),
    ...mapState('comDataSetting', ['data']),
    childMap() {
      return this.componentTypes.reduce(
        (last, { value, label, settingPath, setting }) => {
          last[value] = { label, settingPath, setting }
          return last
        },
        {}
      )
    },
    mapChildrenCom() {
      return this.componentTypes.map(({ value }) => value)
    },
    childrenCom() {
      const { series, mapChildrenCom } = this
      const coms = []
      series.forEach((item, index) => {
        if (mapChildrenCom.includes(item.type)) {
          coms.push({
            type: item.type,
            index,
          })
        }
      })
      return coms
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
    ...mapActions('workbench', ['setSettingPath', 'setSeriesIndex']),
    addComponent({ setting: { series, data } }) {
      if (data) {
        series.datasetIndex = this.data.length
        this.data.push(data)
        this.dataset.push({
          source: '',
        })
        this.changeComSetting({
          key: 'dataset',
          setting: this.dataset,
        })
        this.changeComSetting({
          key: 'data',
          setting: this.data,
        })
      }
      this.series.push(series)
      this.changeComSetting({
        key: 'series',
        setting: this.series,
      })
    },
    toComponentSetting({ type, index }) {
      this.setSeriesIndex(index)
      this.setSettingPath(this.childMap[type].settingPath)
    },
    deleteComponent({ index }) {
      this.series.splice(index, 1)
      this.data.splice(index, 1)
      this.dataset.splice(index, 1)
      this.changeComSetting({
        key: 'dataset',
        setting: this.dataset,
      })
      this.changeComSetting({
        key: 'data',
        setting: this.data,
      })
      this.changeComSetting({
        key: 'series',
        setting: this.series,
      })
    },
  },
  components: {
    EchartsInteractiveSetting,
    ComponentSettingFunction,
    EchartsActions,
    SvMenuItem,
    SvButton,
    SvDropdown,
    EchartsGeo,
    EchartsVisualMap,
    SizePositionSetting,
    DataSourceSetting,
    EchartsTooltip,
    TabPane,
    Tab,
    EchartsTitle,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.pane
  overflow hidden
  height 100%
  display flex
  flex-direction column

  .explain
    padding 0 15px
    box-shadow 0 0 8px rgba(0,0,0,.3)

    .title
      line-height 35px

    .dropdown
      width 150px
      margin 10px 0

      .button
        width 100%
        height 25px

      .item
        display flex
        align-items center
        height 25px

        .iconfont
          margin-right 6px
          font-size 15px

  .child-box
    box()
    width 100%
    margin-bottom 10px
    height 26px
    border-radius 3px
    display flex
    align-items center
    justify-content space-between
    padding 0 10px
    cursor pointer
    color #dddddd
    background-color #2561a3
    transition all .3s linear

    &:hover
      background-color #3896fe
      box-shadow 0 0 3px 1px #6c6c6c

    .iconfont
      font-size 13px

  .data-explain
    line-height 35px
    padding 0 15px

  .setting-content
    overflow-y auto
    flex 1
</style>
