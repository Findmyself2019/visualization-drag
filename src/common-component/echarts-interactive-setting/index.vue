<!-- echarts交互设置 -->
<template>
  <fold label="交互设置">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addEvent"></i>
    </div>
    <div slot="content">
      <fold-in
        v-for="(item, index) in interactive"
        :key="index"
        :label="`事件${index + 1}`"
        :can-open="false"
      >
        <div slot="pane-right">
          <i
            class="operate-icon iconfont sv-jian"
            @click="removeEvent(index)"
          ></i>
        </div>
        <div slot="content">
          <form-row label="事件类型">
            <sv-select v-model="item.eventType">
              <sv-select-option
                v-for="event in events"
                :key="event.value"
                :label="event.label"
                :value="event.value"
              >
                {{ event.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="事件行为">
            <sv-select
              :value="item.eventBehavior"
              @input="eventBehaviorChange($event, item.eventBehavior, index)"
            >
              <sv-select-option
                v-for="behavior in behaviors"
                :key="behavior.value"
                :label="behavior.label"
                :value="behavior.value"
              >
                {{ behavior.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <fold-in
            label="数据源设置"
            v-if="item.eventBehavior === 'refreshData'"
          >
            <div slot="content">
              <form-row label="选择数据源">
                <sv-select
                  multiple
                  class="select"
                  v-model="item.refreshDataBehaviorSetting.dataSource"
                >
                  <sv-select-option
                    v-for="d in dataSource"
                    :key="d._id"
                    :label="d.name"
                    :value="d._id"
                  >
                    {{ d.name }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row dir="column">
                <span slot="label">
                  事件
                  <el-tooltip>
                    <div slot="title">
                      dataSource为选定数据源设置；
                      event为事件回调参数，包含事件相关信息
                    </div>
                    <i class="explain iconfont sv-Group-"></i>
                  </el-tooltip>
                </span>
                <function-input
                  fn-name="callback"
                  v-model="item.refreshDataBehaviorSetting.handleFunction"
                />
              </form-row>
            </div>
          </fold-in>
          <fold-in label="自定义设置" v-if="item.eventBehavior === 'custom'">
            <div slot="content">
              <form-row dir="column" label="事件">
                <function-input
                  fn-name="callback"
                  v-model="item.customBehaviorSetting.handleFunction"
                />
              </form-row>
            </div>
          </fold-in>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold'
import FoldIn from '@/setting-component/fold-in'
import FormRow from '@/setting-component/form-row'
import SvSelect from '@/setting-component/sv-select'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import FunctionInput from '@/setting-component/function-input'
import { mapActions, mapState } from 'vuex'
import { FocusComInfoMixins } from '@/mixins'

export default {
  name: 'EchartsInteractiveSetting',
  mixins: [FocusComInfoMixins],
  components: {
    FunctionInput,
    SvSelectOption,
    SvSelect,
    FormRow,
    FoldIn,
    Fold,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      behaviors: [
        {
          label: '刷新数据源',
          value: 'refreshData',
        },
        {
          label: '自定义事件',
          value: 'custom',
        },
      ],
      refreshDataBehaviorSetting: [],
      customBehaviorSetting: [],
    }
  },
  computed: {
    ...mapState('dataSource', ['dataSource']),
    interactive() {
      return this.focusComInfo[0].setting.interactive || []
    },
  },
  mounted() {
    this.interactive.forEach(() => {
      this.refreshDataBehaviorSetting.push({
        dataSource: [],
        handleFunction: new Function(
          'dataSource',
          'event',
          'return dataSource'
        ),
      })
      this.customBehaviorSetting.push({
        handleFunction: new Function('event', '// do anything'),
      })
    })
  },
  watch: {
    interactive: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          key: 'interactive',
          setting,
        })
      },
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
    eventBehaviorChange(newVal, oldVal, index) {
      if (oldVal === 'refreshData') {
        this.refreshDataBehaviorSetting.splice(
          index,
          1,
          this.interactive[index].refreshDataBehaviorSetting
        )
      } else if (oldVal === 'custom') {
        this.customBehaviorSetting.splice(
          index,
          1,
          this.interactive[index].customBehaviorSetting
        )
      }
      if (newVal === 'refreshData') {
        this.$delete(this.interactive[index], 'customBehaviorSetting')
        this.$set(
          this.interactive[index],
          'refreshDataBehaviorSetting',
          this.refreshDataBehaviorSetting[index]
        )
      } else if (newVal === 'custom') {
        this.$delete(this.interactive[index], 'refreshDataBehaviorSetting')
        this.$set(
          this.interactive[index],
          'customBehaviorSetting',
          this.customBehaviorSetting[index]
        )
      }
      this.interactive[index].eventBehavior = newVal
    },
    // 添加事件
    addEvent() {
      this.interactive.push({
        eventType: this.events[0].value,
        eventBehavior: 'refreshData',
        refreshDataBehaviorSetting: {
          dataSource: [],
          handleFunction: new Function(
            'dataSource',
            'event',
            'return dataSource'
          ),
        },
      })
      this.refreshDataBehaviorSetting.push({
        dataSource: [],
        handleFunction: new Function(
          'dataSource',
          'event',
          'return dataSource'
        ),
      })
      this.customBehaviorSetting.push({
        handleFunction: new Function('event', '// do anything'),
      })
    },
    removeEvent(index) {
      this.interactive.splice(index, 1)
      this.refreshDataBehaviorSetting.splice(index, 1)
      this.customBehaviorSetting.splice(index, 1)
    },
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.operate-icon
  cursor pointer

  &:hover
    color theme-color

.select
  width 150px !important

.explain
  margin-left 10px
  color theme-color
  cursor pointer

  &:hover
    opacity 0.8
</style>
