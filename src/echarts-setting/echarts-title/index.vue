<template>
  <fold label="标题">
    <div slot="pane-right">
      <i class="operate-icon iconfont sv-tianjia1" @click="addTitle"></i>
    </div>
    <div slot="content">
      <fold-in
        :label="`标题${index + 1}`"
        v-for="(item,index) in title"
        :key="index"
      >
        <div slot="content">
          <form-row label="是否显示">
            <sv-checkbox v-model="item.show" />
          </form-row>
          <echarts-position :position="item" />
          <form-row label="使用数据源">
            <sv-checkbox
              :value="item.textFormatter !== undefined"
              @input="useDataSource($event, index)"
            />
          </form-row>
          <form-row label="自定义标题" v-if="item.textFormatter" dir="column">
            <function-input v-model="item.textFormatter" />
          </form-row>
          <form-row label="标题" v-else>
            <sv-input v-model="item.text" class="fill" />
          </form-row>
          <fold-in label="标题样式">
            <div slot="content">
              <form-row label="字体大小">
                <number-input v-model="item.textStyle.fontSize" :min="0">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
              <form-row label="字体粗细">
                <sv-select v-model="item.textStyle.fontWeight">
                  <sv-select-option
                    v-for="item in fontWeightType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="颜色">
                <sv-color v-model="item.textStyle.color" />
              </form-row>
              <form-row label="文字阴影颜色">
                <sv-color v-model="item.textStyle.textShadowColor" />
              </form-row>
              <form-row label="文字阴影长度">
                <number-input v-model="item.textStyle.textShadowBlur" />
              </form-row>
            </div>
          </fold-in>
          <form-row label="副标题" v-if="!item.textFormatter">
            <sv-input v-model="item.subtext" class="fill" />
          </form-row>
          <fold-in label="副标题样式">
            <div slot="content">
              <form-row label="字体大小">
                <number-input v-model="item.subtextStyle.fontSize" :min="0">
                  <span slot="suffix">px</span>
                </number-input>
              </form-row>
              <form-row label="字体粗细">
                <sv-select v-model="item.subtextStyle.fontWeight">
                  <sv-select-option
                    v-for="weight in fontWeightType"
                    :key="weight.value"
                    :label="weight.label"
                    :value="weight.value"
                  >
                    {{ weight.label }}
                  </sv-select-option>
                </sv-select>
              </form-row>
              <form-row label="颜色">
                <sv-color v-model="item.subtextStyle.color" />
              </form-row>
              <form-row label="文字阴影颜色">
                <sv-color v-model="item.subtextStyle.textShadowColor" />
              </form-row>
              <form-row label="文字阴影长度">
                <number-input v-model="item.subtextStyle.textShadowBlur" />
              </form-row>
            </div>
          </fold-in>
          <form-row label="主副标题间距">
            <number-input v-model="item.itemGap" />
          </form-row>
        </div>
      </fold-in>
    </div>
  </fold>
</template>

<script>
import FormRow from '@/setting-component/form-row/index.vue'
import SvInput from '@/setting-component/sv-input/index.vue'
import NumberInput from '@/setting-component/number-input/index.vue'
import Fold from '@/setting-component/fold/index.vue'
import SvColor from '@/setting-component/sv-color/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import FoldIn from '@/setting-component/fold-in/index'
import EchartsPosition from '@/echarts-setting/echarts-position/index'
import { mapActions, mapState,mapMutations } from 'vuex'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import SvSelect from '@/setting-component/sv-select/index'
import { DEFAULT_TITLE } from '@/echarts-setting/echarts-title/default'
import _ from 'lodash'
import FunctionInput from '@/setting-component/function-input/index'

export default {
  name: 'EchartsTitle',
  data() {
    return {
      fontWeightType: [
        {
          label: '正常',
          value: 'normal',
        },
        {
          label: '加粗',
          value: 'bold',
        },
        {
          label: '细',
          value: 'lighter',
        },
      ],
      textFormatter: new Function(
        'data',
        `return {
          text: '标题',
          subtext: '副标题'
        }`
      ),
    }
  },
  computed: {
    ...mapState('echartsSetting', ['title']),
  },
  watch: {
    title: {
      deep: true,
      handler(setting) {
        this.updateComSetting({
          setting,
          key: 'title',
        })
        this.setTitle(setting)
      },
    },
  },
  methods: {
    ...mapActions('echartsSetting', ['setTitle']),
    ...mapMutations(['updateComSetting']),
    // 添加标题
    addTitle() {
      const newTitle = _.cloneDeep(DEFAULT_TITLE)
      const index = this.title.length + 1
      newTitle.text += index
      newTitle.subtext += index
      this.title.push(newTitle)
    },
    // 删除标题
    removeTitle(index) {
      this.title.splice(index, 1)
    },
    useDataSource(value, index) {
      if (value) {
        this.$set(this.title[index], 'textFormatter', this.textFormatter)
      } else {
        this.textFormatter = this.title[index].textFormatter
        this.$delete(this.title[index], 'textFormatter')
      }
    },
  },
  components: {
    FunctionInput,
    SvSelect,
    SvSelectOption,
    EchartsPosition,
    FoldIn,
    SvCheckbox,
    SvColor,
    FormRow,
    SvInput,
    NumberInput,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.operate-icon
  cursor pointer

  &:hover
    color theme-color

.fill
  width 150px
</style>
