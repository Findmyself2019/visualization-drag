<template>
  <fold label="图例">
    <div slot="pane-right">
      <sv-checkbox v-model="legend.show" />
    </div>
    <div slot="content">
      <echarts-position :position="legend" />
      <fold-in label="尺寸">
        <div slot="content">
          <form-row label="宽度">
            <number-input v-model="legend.width" />
          </form-row>
          <form-row label="高度">
            <number-input v-model="legend.height" />
          </form-row>
        </div>
      </fold-in>
      <form-row label="图例类型">
        <sv-select v-model="legend.type">
          <sv-select-option
            v-for="(item, index) in legendTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="布局朝向">
        <sv-select v-model="legend.orient">
          <sv-select-option
            v-for="(item, index) in orientTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <form-row label="图例间距">
        <number-input v-model="legend.itemGap" />
      </form-row>
      <form-row label="图例图形类型">
        <sv-select v-model="legend.icon">
          <sv-select-option
            v-for="(item, index) in iconTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
      </form-row>
      <fold-in label="图例图形尺寸">
        <div slot="content">
          <form-row label="宽度">
            <number-input v-model="legend.itemWidth">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="高度">
            <number-input v-model="legend.itemHeight">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <!-- <fold-in label="图例文本样式">
        <div slot="content">
          <form-row label="文本颜色">
            <sv-color v-model="legend.textStyle.color" />
          </form-row>
          <form-row label="文本大小">
            <number-input v-model="legend.textStyle.fontSize" />
          </form-row>
        </div>
      </fold-in> -->
      <fold-in label="翻页(图例控制块)设置">
        <div slot="content">
          <form-row label="按钮页信息间距">
            <number-input v-model="legend.pageButtonItemGap" />
          </form-row>
          <form-row label="按钮图例间距">
            <number-input v-model="legend.pageButtonGap" />
          </form-row>
          <form-row label="图例控制块位置">
            <sv-select v-model="legend.pageButtonPosition">
              <sv-select-option
                v-for="(item, index) in pageButtonPositionTypes"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <fold-in label="翻页按钮">
            <div slot="content">
              <form-row label="按钮颜色">
                <sv-color v-model="legend.pageIconColor" />
              </form-row>
              <form-row label="未激活颜色">
                <sv-color v-model="legend.pageIconInactiveColor" />
              </form-row>
              <form-row label="按钮大小">
                <number-input v-model="legend.pageIconSize" />
              </form-row>
            </div>
          </fold-in>
          <fold-in label="页信息文本样式">
            <div slot="content">
              <form-row label="页信息格式">
                <sv-input class="fill" v-model="legend.pageFormatter" />
              </form-row>
              <!-- <form-row label="字体颜色">
                <sv-color v-model="legend.pageTextStyle.color" />
              </form-row>
              <form-row label="字体大小">
                <number-input v-model="legend.pageTextStyle.fontSize" />
              </form-row> -->
            </div>
          </fold-in>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import FormRow from '@/setting-component/form-row/index.vue'
import Fold from '@/setting-component/fold/index.vue'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import { mapState, mapActions } from 'vuex'
import SvSelect from '@/setting-component/sv-select/index'
import NumberInput from '@/setting-component/number-input/index'
import FoldIn from '@/setting-component/fold-in/index'
// import SvColor from '@/setting-component/sv-color/index'
import SvInput from '@/setting-component/sv-input/index'
import EchartsPosition from '@/echarts-setting/echarts-position/index'
import { ORIENT_TYPES } from '@/constants/echarts-constans'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'

export default {
  name: 'EchartsLegend',
  data() {
    return {
      legendTypes: [
        {
          label: '普通图例',
          value: 'plain',
        },
        {
          label: '翻滚图例',
          value: 'scroll',
        },
      ],
      orientTypes: ORIENT_TYPES,
      iconTypes: [
        {
          label: '圆形',
          value: 'circle',
        },
        {
          label: '矩形',
          value: 'rect',
        },
        {
          label: '圆角矩形',
          value: 'roundRect',
        },
        {
          label: '三角形',
          value: 'triangle',
        },
        {
          label: '菱形',
          value: 'diamond',
        },
        {
          label: '水滴形',
          value: 'pin',
        },
        {
          label: '箭头',
          value: 'arrow',
        },
        {
          label: '无',
          value: 'none',
        },
      ],
      pageButtonPositionTypes: [
        {
          label: 'start',
          value: 'start',
        },
        {
          label: 'end',
          value: 'end',
        },
      ],
    }
  },
  computed: {
    ...mapState('echartsSetting', ['legend']),
  },
  watch: {
    legend: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          key: 'legend',
          setting,
        })
      },
    },
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
  },
  components: {
    SvSelectOption,
    EchartsPosition,
    SvInput,
    // SvColor,
    FoldIn,
    NumberInput,
    SvSelect,
    SvCheckbox,
    FormRow,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
.center
  height 100%
  display flex
  align-items center

.fill
  width 150px
</style>
