<template>
  <fold label="y轴">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addAxis"></i>
    </div>
    <div slot="content">
      <fold-in
        v-for="(axis, axisIndex) in yAxis"
        :label="`轴${axisIndex + 1}`"
        :key="axisIndex"
      >
        <div slot="pane-right" v-if="yAxis.length > 1">
          <i
            class="operate-icon iconfont sv-jian"
            @click="removeAxis(axisIndex)"
          ></i>
        </div>
        <div slot="content">
          <form-row label="显示">
            <sv-checkbox v-model="axis.show" />
          </form-row>
          <form-row label="轴位置">
            <sv-select v-model="axis.position">
              <sv-select-option
                v-for="(item, index) in positionTypes"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
                {{ item.label }}
              </sv-select-option>
            </sv-select>
          </form-row>
          <form-row label="反向坐标轴">
            <sv-checkbox v-model="axis.inverse" />
          </form-row>
          <form-row label="类型">
            <div class="setting">
              <sv-select
                v-model="axis.type"
                @input="typeChange($event, axisIndex)"
              >
                <sv-select-option
                  v-for="(item, index) in yAxisType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </sv-select-option>
              </sv-select>
            </div>
          </form-row>
          <form-row label="脱离0值" v-if="axis.type === 'value'">
            <sv-checkbox v-model="axis.scale" />
          </form-row>
          <form-row v-if="axis.type === 'category'">
            <span slot="label">使用自定义数据</span>
            <sv-checkbox
              :value="
                axis.dataFormatter !== undefined && axis.dataFormatter !== ''
              "
              @input="changeUseData($event, axisIndex)"
            />
          </form-row>
          <form-row
            dir="column"
            v-if="axis.type === 'category' && axis.dataFormatter"
          >
            <div slot="label" class="label">
              <span>轴数据</span>
              <el-tooltip placement="top">
                <i class="explain iconfont sv-Group-"></i>
                <template slot="title">
                  <span>参数data为组件使用的所有数据源</span>
                </template>
              </el-tooltip>
            </div>
            <function-input v-model="axis.dataFormatter" />
          </form-row>
          <form-row dir="column" v-if="axis.type === 'value'">
            <div class="label" slot="label">
              <span>最小值</span>
              <el-tooltip placement="top">
                <i class="explain iconfont sv-Group-"></i>
                <template slot="title">
                  <span>
                    返回<span style="color: #3896fe">null</span>或<span
                      style="color: #3896fe"
                      >undefined</span
                    >表示自动计算最小值
                  </span>
                </template>
              </el-tooltip>
            </div>
            <function-input v-model="axis.min" />
          </form-row>
          <form-row dir="column" v-if="axis.type === 'value'">
            <div class="label" slot="label">
              <span>最大值</span>
              <el-tooltip placement="top">
                <i class="explain iconfont sv-Group-"></i>
                <template slot="title">
                  <span>
                    返回<span style="color: #3896fe">null</span>或<span
                      style="color: #3896fe"
                      >undefined</span
                    >表示自动计算最大值
                  </span>
                </template>
              </el-tooltip>
            </div>
            <function-input v-model="axis.max" />
          </form-row>
          <form-row label="两边留白">
            <div class="radio-box">
              <sv-checkbox v-model="axis.boundaryGap" />
            </div>
          </form-row>
          <form-row label="轴名称">
            <sv-input v-model="axis.name" />
          </form-row>
          <fold-in label="轴名称样式">
            <div slot="content">
              <form-row label="字体颜色">
                <sv-color v-model="axis.nameTextStyle.color" />
              </form-row>
              <form-row label="字体大小">
                <number-input v-model="axis.nameTextStyle.fontSize" :min="0" />
              </form-row>
              <form-row label="与轴线间距">
                <number-input v-model="axis.nameGap" />
              </form-row>
              <form-row label="旋转角度">
                <slider
                  class="slider"
                  v-model="axis.nameRotate"
                  :max="360"
                  :min="-360"
                />
              </form-row>
              <form-row label="对齐方式">
                <sv-select v-model="axis.nameTextStyle.align">
                  <sv-select-option
                    v-for="(item, index) in alignType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
            </div>
          </fold-in>
          <fold-in label="轴线">
            <div slot="pane-right">
              <sv-checkbox v-model="axis.axisLine.show" />
            </div>
            <div slot="content">
              <form-row label="轴线宽度">
                <number-input v-model="axis.axisLine.lineStyle.width" :min="0">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
              <form-row label="轴线颜色">
                <sv-color v-model="axis.axisLine.lineStyle.color" />
              </form-row>
              <form-row label="轴线类型">
                <sv-select v-model="axis.axisLine.lineStyle.type">
                  <sv-select-option
                    v-for="(item, index) in axisLineType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
            </div>
          </fold-in>
          <fold-in label="轴刻度">
            <div slot="pane-right">
              <sv-checkbox v-model="axis.axisTick.show" />
            </div>
            <div slot="content">
              <form-row label="与标签对齐">
                <div class="radio-box">
                  <sv-checkbox v-model="axis.axisTick.alignWithLabel" />
                </div>
              </form-row>
              <form-row label="长度">
                <div class="radio-box">
                  <number-input v-model="axis.axisTick.length" :min="0" />
                </div>
              </form-row>
              <form-row label="刻度线类型">
                <sv-select v-model="axis.axisTick.lineStyle.type">
                  <sv-select-option
                    v-for="(item, index) in axisLineType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="刻度宽度">
                <number-input
                  v-model="axis.axisTick.lineStyle.width"
                  :min="0"
                />
              </form-row>
              <form-row label="刻度颜色">
                <sv-color v-model="axis.axisTick.lineStyle.color" />
              </form-row>
            </div>
          </fold-in>
          <fold-in label="刻度标签">
            <div slot="pane-right">
              <sv-checkbox v-model="axis.axisLabel.show" />
            </div>
            <div slot="content">
              <form-row label="标签内容" dir="column">
                <function-input v-model="axis.axisLabel.formatter" />
              </form-row>
              <form-row label="标签朝内">
                <sv-checkbox v-model="axis.axisLabel.inside" />
              </form-row>
              <form-row label="旋转角度">
                <slider
                  class="slider"
                  v-model="axis.axisLabel.rotate"
                  :max="360"
                  :min="-360"
                />
              </form-row>
              <form-row label="与轴线间距">
                <number-input v-model="axis.axisLabel.margin" />
              </form-row>
              <form-row label="文字颜色">
                <sv-color v-model="axis.axisLabel.color" />
              </form-row>
              <form-row label="文字大小">
                <number-input v-model="axis.axisLabel.fontSize" :min="0">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
            </div>
          </fold-in>
          <fold-in label="分割线">
            <div slot="pane-right">
              <sv-checkbox v-model="axis.splitLine.show" />
            </div>
            <div slot="content">
              <form-row label="类型">
                <sv-select v-model="axis.splitLine.lineStyle.type">
                  <sv-select-option
                    v-for="(item, index) in axisLineType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="颜色">
                <sv-color v-model="axis.splitLine.lineStyle.color" />
              </form-row>
              <form-row label="宽度">
                <number-input
                  v-model="axis.splitLine.lineStyle.width"
                  :min="0"
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
import FormRow from '@/setting-component/form-row/index.vue'
import SvInput from '@/setting-component/sv-input/index.vue'
import NumberInput from '@/setting-component/number-input/index.vue'
import SvSelect from '@/setting-component/sv-select/index.vue'
import Fold from '@/setting-component/fold/index.vue'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import { mapState, mapActions,mapMutations } from 'vuex'
import FoldIn from '@/setting-component/fold-in/index'
import SvColor from '@/setting-component/sv-color/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import Slider from '@/setting-component/slider/index'
import FunctionInput from '@/setting-component/function-input/index'
import _ from 'lodash'
import { AXIS_TYPES, LINE_TYPES } from '@/constants/echarts-constans'

export default {
  name: 'EchartsYAxis',
  data() {
    return {
      yAxisType: AXIS_TYPES,
      alignType: [
        {
          label: '左对齐',
          value: 'left',
        },
        {
          label: '居中对齐',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'right',
        },
      ],
      axisLineType: LINE_TYPES,
      positionTypes: [
        {
          label: '左',
          value: 'left',
        },
        {
          label: '右',
          value: 'right',
        },
      ],
      max: new Function('value', 'return null'),
      min: new Function('value', 'return null'),
      dataFormatter: new Function('data', 'return []'),
    }
  },
  computed: {
    ...mapState('echartsSetting', ['yAxis']),
  },
  watch: {
    yAxis: {
      deep: true,
      handler(setting) {
        this.updateComSetting({
          setting,
          key: 'yAxis',
        })
        this.setYAxis(setting)
      },
    },
  },
  methods: {
    ...mapActions('echartsSetting', ['setYAxis']),
    ...mapMutations(['updateComSetting']),
    typeChange(type, index) {
      if (type === 'value') {
        this.$set(this.yAxis[index], 'min', this.min)
        this.$set(this.yAxis[index], 'max', this.max)
      } else {
        this.min = this.yAxis[index].min
        this.max = this.yAxis[index].max
        this.$delete(this.yAxis[index], 'min')
        this.$delete(this.yAxis[index], 'max')
      }
    },
    // 添加轴
    addAxis() {
      const index = this.yAxis.length - 1
      this.yAxis.push(_.cloneDeep(this.yAxis[index]))
    },
    removeAxis(index) {
      if (this.yAxis.length > 1) {
        this.yAxis.splice(index, 1)
      }
    },
    changeUseData(value, index) {
      if (value) {
        this.$set(this.yAxis[index], 'dataFormatter', this.dataFormatter)
      } else {
        this.dataFormatter = this.yAxis[index].dataFormatter
        this.$delete(this.yAxis[index], 'dataFormatter')
      }
    },
  },
  components: {
    FunctionInput,
    Slider,
    SvSelectOption,
    SvColor,
    FoldIn,
    SvCheckbox,
    FormRow,
    SvInput,
    NumberInput,
    SvSelect,
    Fold,
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

.radio-box
  line-height 25px

.slider
  width 150px

.label
  display flex
  align-items center

  .explain
    margin-left 6px
    cursor pointer
    color theme-color
</style>
