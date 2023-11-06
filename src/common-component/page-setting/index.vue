<!-- 页面配置 -->
<template>
  <tab v-model="select">
    <tab-pane name="配置" label="页面配置">
      <div class="page-setting">
        <form-row label="页面名称">
          <sv-input class="fill" v-model="setting.title" />
        </form-row>
        <form-row label="页面描述">
          <sv-textarea v-model="setting.desc" />
        </form-row>
        <form-row label="宽度">
          <number-input v-model="setting.width">
            <span slot="suffix">px</span>
          </number-input>
        </form-row>
        <form-row label="高度">
          <number-input v-model="setting.height">
            <span slot="suffix">px</span>
          </number-input>
        </form-row>
        <form-row label="页面展现方式">
          <sv-select v-model="setting.show">
            <sv-select-option
              v-for="(type, index) in showTypes"
              :key="index"
              :value="type.value"
              :label="type.label"
            >
              {{ type.label }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row label="背景色">
          <sv-color v-model="setting.backgroundColor" />
        </form-row>
        <form-row label="背景图">
          <upload class="upload" v-model="setting.backgroundImage" />
        </form-row>
        <form-row label="背景图模式">
          <sv-select v-model="setting.backgroundSize">
            <sv-select-option
              v-for="(item, index) in imgModeArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row label="重复背景">
          <sv-select v-model="setting.backgroundRepeat">
            <sv-select-option
              v-for="(item, index) in imgRepeatArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row label="组件贴合精度">
          <sv-select v-model="setting.precision">
            <sv-select-option
              v-for="(item, index) in precisionArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row>
          <div class="label" slot="label">
            <span>开发模式</span>
            <a-tooltip placement="top">
              <i class="explain iconfont sv-Group-"></i>
              <template slot="title">
                <span>
                  开发模式下，组件不会响应自身的任何事件
                </span>
              </template>
            </a-tooltip>
          </div>
          <sv-checkbox v-model="setting.developMode" />
        </form-row>
      </div>
    </tab-pane>
  </tab>
</template>

<script>
import FormRow from '@/setting-component/form-row/index.vue'
import NumberInput from '@/setting-component/number-input/index.vue'
import SvColor from '@/setting-component/sv-color/index.vue'
import Upload from "@/setting-component/upload/index"
import {createNamespacedHelpers} from 'vuex'
import debounce from "@/utils/debounce"
import Tab from "@/setting-component/tab/index"
import TabPane from "@/setting-component/tab/tab-pane"
import SvSelect from "@/setting-component/sv-select/index"
import SvSelectOption from "@/setting-component/sv-select/sv-select-option"
import SvInput from "@/setting-component/sv-input/index"
import SvTextarea from "@/setting-component/sv-textarea/index"
import SvCheckbox from "@/setting-component/sv-checkbox"
const {mapActions, mapState} = createNamespacedHelpers('pageSetting')

export default {
  name: "PageSetting",
  data() {
    return {
      select: '配置',
      imgModeArr: [
        {label: '全部填充(背景可能变形)', value: '100% 100%'}, // 100% 100%
        {label: '全显填充(背景可能填充不全)', value: 'contain'}, // contain
        {label: '等比填充(背景可能显示不全)', value: 'cover'}, // cover
        {label: '自动填充', value: 'auto'}, // auto
      ],
      precisionArr: [
        {label: '0', value: 0},
        {label: '2', value: 2},
        {label: '4', value: 4},
        {label: '6', value: 6},
        {label: '8', value: 8},
        {label: '10', value: 10},
        {label: '20', value: 20}
      ],
      imgRepeatArr: [
        {label: '水平重复', value: 'repeat-x'},
        {label: '竖直重复', value: 'repeat-y'},
        {label: '水平竖直重复', value: 'repeat'},
        {label: '不重复', value: 'no-repeat'}
      ],
      showTypes: [
        {label: '以设定尺寸显示', value: 'fix'},
        {label: '等比缩放，宽度铺满', value: 'x'},
        {label: '等比缩放，高度铺满', value: 'y'},
        {label: '全屏铺满', value: 'full'},
      ]
    }
  },
  computed: {
    ...mapState([
      'setting'
    ])
  },
  watch: {
    setting: {
      deep: true,
      handler: debounce(function(val) {
        this.setPageSetting(val)
      })
    }
  },
  methods: {
    ...mapActions([
      'setPageSetting'
    ])
  },
  components: {
    SvCheckbox,
    SvTextarea,
    SvInput,
    SvSelectOption,
    TabPane,
    Tab,
    SvSelect,
    Upload,
    FormRow,
    NumberInput,
    SvColor
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .page-setting
    padding 15px 15px 15px 0

    .fill
      width 150px

  .label
    display flex
    align-items center

    .explain
      margin-left 6px
      cursor pointer
      color theme-color
</style>
