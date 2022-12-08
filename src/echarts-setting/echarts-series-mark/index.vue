<!-- echarts  series mark 公共配置 -->
<template>
  <div>
    <fold-in label="标注点" :can-open="false">
      <div slot="pane-right" class="pane-right">
        <sv-select v-model="defaultPoint" class="select-type">
          <sv-select-option
            v-for="(item, index) in markPointTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
        <i class="operate-icon iconfont sv-tianjia1" @click="addMarkPoint"></i>
      </div>
      <div slot="content">
        <div slot="content">
          <fold-in
            v-for="(item, index) in seriesCopy.markPoint.data"
            :label="`标注点【${item.name}】(类型：${typeMap[item.type]})`"
            :key="index"
          >
            <div slot="pane-right">
              <i
                class="operate-icon iconfont sv-jian"
                @click="removeMarkPoint(item)"
              ></i>
            </div>
            <div slot="content">
              <form-row label="标记图形">
                <sv-select v-model="item.symbol">
                  <sv-select-option
                    v-for="(item2, index2) in symbolTypes"
                    :key="index2"
                    :label="item2.label"
                    :value="item2.value"
                  >
                    {{ item2.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="图形大小">
                <number-input v-model="item.symbolSize" :min="0" />
              </form-row>
              <form-row label="图形颜色">
                <sv-color v-model="item.itemStyle.color" />
              </form-row>
              <fold-in label="偏移量" :can-open="false">
                <div slot="content">
                  <form-row label="左偏移量">
                    <number-input v-model="item.symbolOffset[0]" />
                  </form-row>
                  <form-row label="上偏移量">
                    <number-input v-model="item.symbolOffset[1]" />
                  </form-row>
                </div>
              </fold-in>
              <form-row label="旋转角度">
                <slider
                  class="slider"
                  v-model="item.symbolRotate"
                  :max="360"
                  :min="-360"
                />
              </form-row>
              <fold-in label="标注文本" :can-open="false">
                <div slot="pane-right">
                  <sv-checkbox v-model="item.label.show" />
                </div>
                <div slot="content">
                  <form-row label="字体大小">
                    <number-input v-model="item.label.fontSize" :min="0" />
                  </form-row>
                  <form-row label="字体颜色">
                    <sv-color v-model="item.label.color" />
                  </form-row>
                </div>
              </fold-in>
            </div>
          </fold-in>
        </div>
      </div>
    </fold-in>
    <fold-in label="标注线" :can-open="false">
      <div slot="pane-right" class="pane-right">
        <sv-select v-model="defaultLine" class="select-type">
          <sv-select-option
            v-for="(item, index) in markLineTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </sv-select-option>
        </sv-select>
        <transition name="show">
          <div class="custom-line" v-if="isCustom">
            <span>y:</span>
            <number-input v-model="customY" />
          </div>
        </transition>
        <i class="operate-icon iconfont sv-tianjia1" @click="addMarkLine"></i>
      </div>
      <div slot="content">
        <fold-in
          v-for="(item, index) in seriesCopy.markLine.data"
          :key="index"
          :label="
            `标注线【${item.name}】(类型：${
              typeMap[item.type] ? typeMap[item.type] : `y=${item.yAxis}`
            })`
          "
        >
          <div slot="pane-right">
            <i
              class="operate-icon iconfont sv-jian"
              @click="removeMarkLine(item)"
            ></i>
          </div>
          <div slot="content">
            <form-row label="值" v-if="isCustom">
              <number-input v-model="item.yAxis" />
            </form-row>
            <fold-in label="标注线" :can-open="false">
              <div slot="content">
                <form-row label="线段类型">
                  <sv-select v-model="item.lineStyle.type">
                    <sv-select-option
                      v-for="(item2, index2) in lineTypes"
                      :key="index2"
                      :label="item2.label"
                      :value="item2.value"
                    >
                      {{ item2.label }}
                    </sv-select-option>
                  </sv-select>
                </form-row>
                <form-row label="颜色">
                  <sv-color v-model="item.lineStyle.color" />
                </form-row>
                <form-row label="线宽">
                  <number-input v-model="item.lineStyle.width" :min="0" />
                </form-row>
              </div>
            </fold-in>
            <fold-in label="文本" :can-open="false">
              <div slot="pane-right">
                <sv-checkbox v-model="item.label.show" />
              </div>
              <div slot="content">
                <form-row label="文本位置">
                  <sv-select v-model="item.label.position">
                    <sv-select-option
                      v-for="(item2, index2) in labelPositionTypes"
                      :key="index2"
                      :label="item2.label"
                      :value="item2.value"
                    >
                      {{ item2.label }}
                    </sv-select-option>
                  </sv-select>
                </form-row>
              </div>
            </fold-in>
          </div>
        </fold-in>
      </div>
    </fold-in>
  </div>
</template>

<script>
import SvSelect from '@/setting-component/sv-select/index'
import FoldIn from '@/setting-component/fold-in/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvColor from '@/setting-component/sv-color/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import { LINE_TYPES, SYMBOL_TYPES } from '@/constants/echarts-constans'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import Slider from '@/setting-component/slider/index'

export default {
  name: 'EchartsSeriesMark',
  props: {
    series: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      seriesCopy: this.series, // 改变量无需监听，引用类型，地址未发生变化，可直接触发父组件的updateComSetting
      typeMap: {
        min: '最小值',
        max: '最大值',
        average: '平均值',
        median: '中位数',
        custom: '自定义',
      },
      symbolTypes: SYMBOL_TYPES,
      markPointTypes: [
        {
          label: '最小值',
          value: 'min',
        },
        {
          label: '最大值',
          value: 'max',
        },
        {
          label: '平均值',
          value: 'average',
        },
      ],
      defaultPoint: 'min',
      markLineTypes: [
        {
          label: '最小值',
          value: 'min',
        },
        {
          label: '最大值',
          value: 'max',
        },
        {
          label: '平均值',
          value: 'average',
        },
        {
          label: '中位数',
          value: 'median',
        },
        {
          label: '自定义',
          value: 'custom',
        },
      ],
      defaultLine: 'min',
      lineTypes: LINE_TYPES,
      labelPositionTypes: [
        {
          label: '起始点',
          value: 'start',
        },
        {
          label: '中点',
          value: 'middle',
        },
        {
          label: '结束点',
          value: 'end',
        },
      ],
      customY: 0,
    }
  },
  computed: {
    isCustom() {
      return this.defaultLine === 'custom'
    },
  },
  methods: {
    // 添加标记点
    addMarkPoint() {
      const length = this.seriesCopy.markPoint.data.length
      this.seriesCopy.markPoint.data.push({
        name: `${length + 1}`,
        type: this.defaultPoint,
        symbol: 'pin',
        symbolSize: 50,
        symbolRotate: 0,
        symbolOffset: [0, 0],
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 12,
        },
        itemStyle: {
          color: this.seriesCopy.itemStyle.color,
        },
      })
    },
    removeMarkPoint(point) {
      const index = this.seriesCopy.markPoint.data.indexOf(point)
      if (index > -1) {
        this.seriesCopy.markPoint.data.splice(index, 1)
      }
    },
    // 添加标记线
    addMarkLine() {
      const { seriesCopy, defaultLine, customY } = this
      const length = seriesCopy.markLine.data.length
      const defaultSetting = {
        name: `${length + 1}`,
        symbol: 'none',
        lineStyle: {
          color: this.seriesCopy.itemStyle.color,
          width: 1,
          type: 'dashed',
        },
        label: {
          show: true,
          position: 'end',
        },
      }
      if (defaultLine === 'custom') {
        defaultSetting.yAxis = customY
      } else {
        defaultSetting.type = defaultLine
      }
      seriesCopy.markLine.data.push(defaultSetting)
    },
    removeMarkLine(line) {
      const index = this.seriesCopy.markLine.data.indexOf(line)
      if (index > -1) {
        this.seriesCopy.markLine.data.splice(index, 1)
      }
    },
  },
  components: {
    Slider,
    SvSelectOption,
    SvCheckbox,
    SvColor,
    NumberInput,
    FormRow,
    FoldIn,
    SvSelect,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.operate-icon
  font-size 15px
  cursor pointer
  margin-left 10px

  &:hover
    color theme-color

.pane-right
  display flex
  align-items center
  justify-content flex-end

  .select-type
    width 90px

  .custom-line
    width 90px
    margin-left 10px
    display flex
    align-items center
    justify-content space-between

    span
      margin-right 10px

  .show-enter, .show-leave-to
    width 0

  .show-enter-active, .show-leave-to
    transition all .3s ease-out

.slider
  width 150px
</style>
