<template>
  <div>
    <fold label="地理坐标系">
      <div slot="content">
        <form-row label="地图">
          <sv-select
            v-model="geo.map"
            :show-search="true"
            @search="handleSearch"
            @change="condition = ''"
          >
            <sv-select-option
              v-for="item in filterData"
              :key="item.adcode"
              :value="item.adcode"
              :label="item.name"
            >
              {{ item.name }} | {{ item.adcode }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row label="区域映射" dir="column">
          <code-editor-of-ace
            language="json"
            :code="geo.nameMap ? JSON.stringify(geo.nameMap, '\n', 2) : '{}'"
            @change="handleNameMapChange"
          />
        </form-row>
        <echarts-position :position="geo" />
        <form-row label="鼠标缩放与平移">
          <sv-select v-model="geo.roam">
            <sv-select-option
              v-for="(item, index) in roamTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <form-row label="当前缩放比">
          <number-input v-model="geo.zoom" />
        </form-row>
        <fold-in label="缩放极限">
          <div slot="content">
            <form-row label="最大值">
              <number-input :min="0" v-model="geo.scaleLimit.max" />
            </form-row>
            <form-row label="最小值">
              <number-input :min="0" v-model="geo.scaleLimit.min" />
            </form-row>
          </div>
        </fold-in>
        <form-row label="地图长宽比">
          <number-input :min="0" v-model="geo.aspectScale" />
        </form-row>
        <form-row label="选中模式">
          <sv-select v-model="geo.selectedMode">
            <sv-select-option
              v-for="(item, index) in selectedModeTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              {{ item.label }}
            </sv-select-option>
          </sv-select>
        </form-row>
        <fold-in label="文本">
          <div slot="pane-right">
            <sv-checkbox v-model="geo.label.show" />
          </div>
          <div slot="content">
            <form-row label="文本颜色">
              <sv-color v-model="geo.label.color" />
            </form-row>
            <form-row label="文本大小">
              <number-input :min="0" v-model="geo.label.fontSize" />
            </form-row>
          </div>
        </fold-in>
        <fold-in label="地图区域样式">
          <div slot="content">
            <form-row label="区域颜色">
              <sv-color v-model="geo.itemStyle.areaColor" />
            </form-row>
            <form-row label="边框颜色">
              <sv-color v-model="geo.itemStyle.borderColor" />
            </form-row>
            <form-row label="边框宽度">
              <number-input :min="0" v-model="geo.itemStyle.borderWidth" />
            </form-row>
            <form-row label="边框类型">
              <sv-select v-model="geo.itemStyle.borderType">
                <sv-select-option
                  v-for="(item, index) in borderTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.label }}
                </sv-select-option>
              </sv-select>
            </form-row>
            <form-row label="阴影模糊大小">
              <number-input :min="0" v-model="geo.itemStyle.shadowBlur" />
            </form-row>
            <form-row label="阴影颜色">
              <sv-color v-model="geo.itemStyle.shadowColor" />
            </form-row>
            <form-row label="透明度">
              <slider
                class="slider"
                :mim="0"
                :max="1"
                :step="0.01"
                v-model="geo.itemStyle.opacity"
              />
            </form-row>
          </div>
        </fold-in>
        <fold-in label="高亮设置" :can-open="false">
          <div slot="content">
            <fold-in label="文本">
              <div slot="pane-right">
                <sv-checkbox v-model="geo.emphasis.label.show" />
              </div>
              <div slot="content">
                <form-row label="文本颜色">
                  <sv-color v-model="geo.emphasis.label.color" />
                </form-row>
                <form-row label="文本大小">
                  <number-input
                    :min="0"
                    v-model="geo.emphasis.label.fontSize"
                  />
                </form-row>
              </div>
            </fold-in>
            <fold-in label="地图区域样式">
              <div slot="content">
                <form-row label="区域颜色">
                  <sv-color v-model="geo.emphasis.itemStyle.areaColor" />
                </form-row>
                <form-row label="边框颜色">
                  <sv-color v-model="geo.emphasis.itemStyle.borderColor" />
                </form-row>
                <form-row label="边框宽度">
                  <number-input
                    :min="0"
                    v-model="geo.emphasis.itemStyle.borderWidth"
                  />
                </form-row>
                <form-row label="边框类型">
                  <sv-select v-model="geo.emphasis.itemStyle.borderType">
                    <sv-select-option
                      v-for="(item, index) in borderTypes"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </sv-select-option>
                  </sv-select>
                </form-row>
                <form-row label="阴影模糊大小">
                  <number-input
                    :min="0"
                    v-model="geo.emphasis.itemStyle.shadowBlur"
                  />
                </form-row>
                <form-row label="阴影颜色">
                  <sv-color v-model="geo.emphasis.itemStyle.shadowColor" />
                </form-row>
                <form-row label="透明度">
                  <slider
                    class="slider"
                    :mim="0"
                    :max="1"
                    :step="0.01"
                    v-model="geo.emphasis.itemStyle.opacity"
                  />
                </form-row>
              </div>
            </fold-in>
          </div>
        </fold-in>
      </div>
    </fold>
    <fold label="特定区域样式">
      <div slot="pane-right">
        <i class="iconfont sv-tianjia1" @click="addRegion"></i>
      </div>
      <div slot="content">
        <fold-in
          v-for="(item, index) in geo.regions"
          :key="index"
          :label="item.name || `区域【 ${index + 1} 】`"
        >
          <div slot="pane-right">
            <i class="iconfont sv-jian" @click="removeRegion(index)"></i>
          </div>
          <div slot="content">
            <form-row label="区域名称">
              <sv-input v-model="item.name" />
            </form-row>
            <form-row label="选中">
              <sv-checkbox v-model="item.selected" />
            </form-row>
            <fold-in label="文本">
              <div slot="pane-right">
                <sv-checkbox v-model="item.label.show" />
              </div>
              <div slot="content">
                <form-row label="文本颜色">
                  <sv-color v-model="item.label.color" />
                </form-row>
                <form-row label="文本大小">
                  <number-input :min="0" v-model="item.label.fontSize" />
                </form-row>
              </div>
            </fold-in>
            <fold-in label="区域样式">
              <div slot="content">
                <form-row label="区域颜色">
                  <sv-color v-model="item.itemStyle.areaColor" />
                </form-row>
                <form-row label="边框颜色">
                  <sv-color v-model="item.itemStyle.borderColor" />
                </form-row>
                <form-row label="边框宽度">
                  <number-input :min="0" v-model="item.itemStyle.borderWidth" />
                </form-row>
                <form-row label="边框类型">
                  <sv-select v-model="item.itemStyle.borderType">
                    <sv-select-option
                      v-for="(item2, index2) in borderTypes"
                      :key="index2"
                      :label="item2.label"
                      :value="item2.value"
                    >
                      {{ item2.label }}
                    </sv-select-option>
                  </sv-select>
                </form-row>
                <form-row label="阴影模糊大小">
                  <number-input :min="0" v-model="item.itemStyle.shadowBlur" />
                </form-row>
                <form-row label="阴影颜色">
                  <sv-color v-model="item.itemStyle.shadowColor" />
                </form-row>
                <form-row label="透明度">
                  <slider
                    class="slider"
                    :mim="0"
                    :max="1"
                    :step="0.01"
                    v-model="geo.itemStyle.opacity"
                  />
                </form-row>
              </div>
            </fold-in>
            <fold-in label="高亮设置" :can-open="false">
              <div slot="content">
                <fold-in label="文本">
                  <div slot="pane-right">
                    <sv-checkbox v-model="item.emphasis.label.show" />
                  </div>
                  <div slot="content">
                    <form-row label="文本颜色">
                      <sv-color v-model="item.emphasis.label.color" />
                    </form-row>
                    <form-row label="文本大小">
                      <number-input
                        :min="0"
                        v-model="item.emphasis.label.fontSize"
                      />
                    </form-row>
                  </div>
                </fold-in>
                <fold-in label="地图区域样式">
                  <div slot="content">
                    <form-row label="区域颜色">
                      <sv-color v-model="item.emphasis.itemStyle.areaColor" />
                    </form-row>
                    <form-row label="边框颜色">
                      <sv-color v-model="item.emphasis.itemStyle.borderColor" />
                    </form-row>
                    <form-row label="边框宽度">
                      <number-input
                        :min="0"
                        v-model="item.emphasis.itemStyle.borderWidth"
                      />
                    </form-row>
                    <form-row label="边框类型">
                      <sv-select v-model="item.emphasis.itemStyle.borderType">
                        <sv-select-option
                          v-for="(item2, index2) in borderTypes"
                          :key="index2"
                          :label="item2.label"
                          :value="item2.value"
                        >
                          {{ item2.label }}
                        </sv-select-option>
                      </sv-select>
                    </form-row>
                    <form-row label="阴影模糊大小">
                      <number-input
                        :min="0"
                        v-model="item.emphasis.itemStyle.shadowBlur"
                      />
                    </form-row>
                    <form-row label="阴影颜色">
                      <sv-color v-model="item.emphasis.itemStyle.shadowColor" />
                    </form-row>
                    <form-row label="透明度">
                      <slider
                        class="slider"
                        :mim="0"
                        :max="1"
                        :step="0.01"
                        v-model="geo.emphasis.itemStyle.opacity"
                      />
                    </form-row>
                  </div>
                </fold-in>
              </div>
            </fold-in>
          </div>
        </fold-in>
      </div>
    </fold>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { LINE_TYPES, SELECTED_MODE } from '@/constants/echarts-constans'
import Fold from '@/setting-component/fold/index'
import FormRow from '@/setting-component/form-row/index'
import SvSelect from '@/setting-component/sv-select/index'
import NumberInput from '@/setting-component/number-input/index'
import FoldIn from '@/setting-component/fold-in/index'
import SvCheckbox from '@/setting-component/sv-checkbox/index'
import SvColor from '@/setting-component/sv-color/index'
import EchartsPosition from '@/echarts-setting/echarts-position/index'
import SvInput from '@/setting-component/sv-input/index'
import { DEFAULT_BASE_MAP_REGION_SETTING } from '@/common-component/map-setting/default-setting'
import SvSelectOption from '@/setting-component/sv-select/sv-select-option'
import api from '@/api'
import _ from 'lodash'
import Slider from '@/setting-component/slider/index'
import CodeEditorOfAce from '@/setting-component/code-editor-of-ace/index'

export default {
  name: 'EchartsGeo',
  data() {
    return {
      roamTypes: [
        {
          label: '关闭缩放与平移',
          value: false,
        },
        {
          label: '开启缩放与平移',
          value: true,
        },
        {
          label: '只开启平移',
          value: 'move',
        },
        {
          label: '只开启缩放',
          value: 'scale',
        },
      ],
      selectedModeTypes: SELECTED_MODE,
      borderTypes: LINE_TYPES,
      data: [],
      condition: '',
    }
  },
  watch: {
    geo: {
      deep: true,
      handler(setting) {
        this.changeComSetting({
          key: 'geo',
          setting,
        })
      },
    },
  },
  computed: {
    ...mapState('echartsSetting', ['geo']),
    filterData() {
      const { data, condition } = this
      return data.filter((item) => item.name.includes(condition))
    },
  },
  async created() {
    const { code, data } = await api.getAllAreaInfo()
    if (code === 200 && data.length > 0) {
      this.data = data
    }
  },
  methods: {
    ...mapActions('pageComList', ['changeComSetting']),
    parse: (value) => value.replace('%', ''),
    formatter: (value) => `${value}%`,
    // 添加指定区域样式
    addRegion() {
      this.geo.regions.push(DEFAULT_BASE_MAP_REGION_SETTING)
    },
    removeRegion(index) {
      this.geo.regions.splice(index, 1)
    },
    handleSearch: _.debounce(function(value) {
      this.condition = value
    }, 300),
    handleNameMapChange(code) {
      if (code) {
        this.$set(this.geo, 'nameMap', JSON.parse(code))
      } else {
        this.$set(this.geo, 'nameMap', {})
      }
    },
  },
  components: {
    CodeEditorOfAce,
    Slider,
    SvSelectOption,
    SvInput,
    EchartsPosition,
    SvColor,
    SvCheckbox,
    FoldIn,
    NumberInput,
    SvSelect,
    FormRow,
    Fold,
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.iconfont
  font-size 15px
  cursor pointer

  &:hover
    color theme-color

.slider
  width 150px
</style>
