<!-- 角度坐标轴设置 -->
<template>
  <fold label="角度轴设置">
    <div slot="content">
      <form-row label="起始刻度角度">
        <number-input v-model="angleAxis[0].startAngle">
          <span slot="suffix">°</span>
        </number-input>
      </form-row>
      <form-row label="顺时针">
        <sv-checkbox v-model="angleAxis[0].clockwise" />
      </form-row>
      <form-row label="类型">
        <div class="setting">
          <sv-select v-model="angleAxis[0].type" @input="typeChange($event)">
            <sv-select-option
              v-for="(item, index) in axisType"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </sv-select-option>
          </sv-select>
        </div>
      </form-row>
      <form-row v-if="angleAxis[0].type === 'category'">
        <span slot="label">使用自定义数据</span>
        <sv-checkbox
          :value="
            angleAxis[0].dataFormatter !== undefined &&
              angleAxis[0].dataFormatter !== ''
          "
          @input="changeUseData($event)"
        />
      </form-row>
      <form-row
        dir="column"
        v-if="angleAxis[0].type === 'category' && angleAxis[0].dataFormatter"
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
        <function-input v-model="angleAxis[0].dataFormatter" />
      </form-row>
      <form-row dir="column" v-if="angleAxis[0].type === 'value'">
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
        <function-input v-model="angleAxis[0].min" />
      </form-row>
      <form-row dir="column" v-if="angleAxis[0].type === 'value'">
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
        <function-input v-model="angleAxis[0].max" />
      </form-row>
      <form-row label="两边留白">
        <div class="radio-box">
          <sv-checkbox v-model="angleAxis[0].boundaryGap" />
        </div>
      </form-row>
      <fold-in label="轴线">
        <div slot="pane-right">
          <sv-checkbox v-model="angleAxis[0].axisLine.show" />
        </div>
        <div slot="content">
          <form-row label="轴线宽度">
            <number-input
              v-model="angleAxis[0].axisLine.lineStyle.width"
              :min="0"
            >
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="轴线颜色">
            <sv-color v-model="angleAxis[0].axisLine.lineStyle.color" />
          </form-row>
          <form-row label="轴线类型">
            <sv-select v-model="angleAxis[0].axisLine.lineStyle.type">
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
          <sv-checkbox v-model="angleAxis[0].axisTick.show" />
        </div>
        <div slot="content">
          <form-row label="与标签对齐">
            <div class="radio-box">
              <sv-checkbox v-model="angleAxis[0].axisTick.alignWithLabel" />
            </div>
          </form-row>
          <form-row label="长度">
            <div class="radio-box">
              <number-input v-model="angleAxis[0].axisTick.length" :min="0" />
            </div>
          </form-row>
          <form-row label="刻度线类型">
            <sv-select v-model="angleAxis[0].axisTick.lineStyle.type">
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
              v-model="angleAxis[0].axisTick.lineStyle.width"
              :min="0"
            />
          </form-row>
          <form-row label="刻度颜色">
            <sv-color v-model="angleAxis[0].axisTick.lineStyle.color" />
          </form-row>
        </div>
      </fold-in>
      <fold-in label="刻度标签">
        <div slot="pane-right">
          <sv-checkbox v-model="angleAxis[0].axisLabel.show" />
        </div>
        <div slot="content">
          <form-row label="标签内容" dir="column">
            <function-input v-model="angleAxis[0].axisLabel.formatter" />
          </form-row>
          <form-row label="标签朝外">
            <sv-checkbox v-model="angleAxis[0].axisLabel.inside" />
          </form-row>
          <form-row label="与轴线间距">
            <number-input v-model="angleAxis[0].axisLabel.margin" />
          </form-row>
          <form-row label="文字颜色">
            <sv-color v-model="angleAxis[0].axisLabel.color" />
          </form-row>
          <form-row label="文字大小">
            <number-input v-model="angleAxis[0].axisLabel.fontSize" :min="0">
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <fold-in label="分割线">
        <div slot="pane-right">
          <sv-checkbox v-model="angleAxis[0].splitLine.show" />
        </div>
        <div slot="content">
          <form-row label="类型">
            <sv-select v-model="angleAxis[0].splitLine.lineStyle.type">
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
            <sv-color v-model="angleAxis[0].splitLine.lineStyle.color" />
          </form-row>
          <form-row label="宽度">
            <number-input
              v-model="angleAxis[0].splitLine.lineStyle.width"
              :min="0"
            />
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import FormRow from '@/setting-component/form-row/index'
import { mapState, mapActions } from 'vuex'
import NumberInput from '@/setting-component/number-input/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import SvSelect from '@/setting-component/sv-select/index'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import FunctionInput from '@/setting-component/function-input/index'
import SvColor from '@/setting-component/sv-color/index'
import { AXIS_TYPES, LINE_TYPES } from '@/constants/echarts-constans'
import FoldIn from '@/setting-component/fold-in/index'

export default {
  name: 'EchartsAngleAxis',
  data() {
    return {
      axisType: AXIS_TYPES,
      axisLineType: LINE_TYPES,
      max: new Function('value', 'return null'),
      min: new Function('value', 'return null'),
      dataFormatter: new Function('data', 'return []'),
    }
  },
  computed: {
    ...mapState('echartsSetting', ['angleAxis']),
  },
  watch: {
    angleAxis: {
      deep: true,
      immediate: true,
      handler(setting) {
        this.changeComSetting({
          setting,
          key: 'angleAxis',
        })
        this.setAngleAxis(setting)
      },
    },
  },
  methods: {
    ...mapActions('echartsSetting', ['setAngleAxis']),
    ...mapActions('pageComList', ['changeComSetting']),
    changeUseData(value) {
      if (value) {
        this.$set(this.angleAxis[0], 'dataFormatter', this.dataFormatter)
      } else {
        this.dataFormatter = this.angleAxis[0].dataFormatter
        this.$delete(this.angleAxis[0], 'dataFormatter')
      }
    },
    typeChange(type) {
      if (type === 'value') {
        this.$set(this.angleAxis[0], 'min', this.min)
        this.$set(this.angleAxis[0], 'max', this.max)
      } else {
        this.min = this.angleAxis[0].min
        this.max = this.angleAxis[0].max
        this.$delete(this.angleAxis[0], 'min')
        this.$delete(this.angleAxis[0], 'max')
      }
    },
  },
  components: {
    FoldIn,
    SvColor,
    FunctionInput,
    SvSelectOption,
    SvSelect,
    SvCheckbox,
    NumberInput,
    FormRow,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.label
  display flex
  align-items center

  .explain
    margin-left 6px
    cursor pointer
    color theme-color
</style>
