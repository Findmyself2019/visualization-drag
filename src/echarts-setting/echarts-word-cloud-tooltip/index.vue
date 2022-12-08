<template>
  <fold label="提示框">
    <div slot="pane-right">
      <sv-checkbox v-model="tooltip.show" />
    </div>
    <div slot="content">
      <fold-in label="浮层样式">
        <div slot="content">
          <form-row label="背景色">
            <sv-color v-model="tooltip.backgroundColor" />
          </form-row>
          <form-row label="字体颜色">
            <sv-color v-model="tooltip.textStyle.color" />
          </form-row>
          <form-row label="字体大小">
            <number-input v-model="tooltip.textStyle.fontSize" :min="0" />
          </form-row>
          <fold-in label="内边距" :can-open="false">
            <div slot="content">
              <form-row label="上">
                <number-input v-model="tooltip.padding[0]" />
              </form-row>
              <form-row label="右">
                <number-input v-model="tooltip.padding[1]" />
              </form-row>
              <form-row label="下">
                <number-input v-model="tooltip.padding[2]" />
              </form-row>
              <form-row label="左">
                <number-input v-model="tooltip.padding[3]" />
              </form-row>
            </div>
          </fold-in>
        </div>
      </fold-in>
      <fold-in label="位置" :can-open="false">
        <div slot="pane-right">
          <radio-group v-model="positionType" @change="handleChange">
            <radio value="follow">
              跟随鼠标
            </radio>
            <radio value="fixed">
              固定位置
            </radio>
          </radio-group>
        </div>
        <div slot="content" v-if="positionType === 'fixed'">
          <form-row label="左">
            <number-input
              v-model="tooltip.position[0]"
              @input="handleInput(0, $event)"
            >
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
          <form-row label="上">
            <number-input
              v-model="tooltip.position[1]"
              @input="handleInput(1, $event)"
            >
              <span slot="suffix">px</span>
            </number-input>
          </form-row>
        </div>
      </fold-in>
      <form-row label="自定义内容">
        <div class="center">
          <span>启用</span>
          <sv-checkbox v-model="formatter" />
        </div>
      </form-row>
      <div class="row">
        <function-code
          :fn-name="fnName"
          :fn-body="fnBody"
          :fn-params="fnParams"
          @save="($event) => (this.fnBody = $event)"
        />
      </div>
    </div>
  </fold>
</template>

<script>
import FoldIn from '@/setting-component/fold-in/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FormRow from '@/setting-component/form-row/index'
import NumberInput from '@/setting-component/number-input/index'
import SvColor from '@/setting-component/sv-color/index'
import Fold from '@/setting-component/fold/index'
import RadioGroup from '@/setting-component/radio/radio-group'
import Radio from '@/setting-component/radio/index'
import FunctionCode from '@/setting-component/function-code/index'
import { mapState, mapActions } from 'vuex'
import { getFunctionBodyAndParams } from '@/utils/util'
import debounce from '@/utils/debounce'

export default {
  name: 'EchartsWordCloudTooltip',
  data() {
    return {
      positionType: 'follow',
      tempPosition: [100, 10],
      fnName: 'formatter',
      fnParams: ['params'],
      fnBody:
        'console.log(params)\n' +
        'const {marker, value} = params\n' +
        'return `${marker} ${value}`',
      formatter: false,
    }
  },
  computed: {
    ...mapState('echartsSetting', ['tooltip']),
  },
  watch: {
    tooltip: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          setting,
          key: 'tooltip',
        })
      },
    },
    fnBody: {
      handler(body) {
        this.formatter &&
          this.$set(
            this.tooltip,
            'formatter',
            new Function(...this.fnParams, body)
          )
      },
    },
    formatter: {
      handler(value) {
        if (value) {
          this.$set(
            this.tooltip,
            'formatter',
            new Function(...this.fnParams, this.fnBody)
          )
        } else {
          this.$delete(this.tooltip, 'formatter')
        }
      },
    },
  },
  mounted() {
    const { tooltip } = this
    if (tooltip.position === undefined) {
      this.positionType = 'follow'
    } else {
      this.tempPosition = tooltip.position
      this.positionType = 'fixed'
    }
    if (tooltip.formatter && tooltip.formatter instanceof Function) {
      this.formatter = true
      const { body, params } = getFunctionBodyAndParams(tooltip.formatter)
      this.fnBody = body
      this.fnParams = params
    }
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
    handleChange(val) {
      if (val === 'follow') {
        this.tooltip.position = undefined
      } else if (val === 'fixed') {
        // 监听position两个input
        this.$set(this.tooltip, 'position', this.tempPosition)
      }
    },
    handleInput: debounce(function(index, val) {
      this.tempPosition[index] = val
    }),
  },
  components: {
    FunctionCode,
    Radio,
    RadioGroup,
    Fold,
    SvColor,
    NumberInput,
    FormRow,
    SvCheckbox,
    FoldIn,
  },
}
</script>

<style scoped lang="stylus">
.row
  padding-left 12px

.center
  height 100%
  display flex
  align-items center

  span
    margin-right 8px
</style>
