<template>
  <div>
    <fold label="映射配置" :can-open="false">
      <div slot="content">
        <form-row dir="column">
          <div slot="label" class="label">
            <span>字段映射</span>
            <el-tooltip>
              <i class="explain iconfont sv-Group-"></i>
              <div slot="title">
                字段映射来源于数据处理器的返回结果
              </div>
            </el-tooltip>
          </div>
          <form-row label="经度">
            <sv-input v-model="curSeries.encode.lng" />
          </form-row>
          <form-row label="维度">
            <sv-input v-model="curSeries.encode.lat" />
          </form-row>
          <form-row label="文本">
            <sv-input v-model="curSeries.encode.label" />
          </form-row>
        </form-row>
      </div>
    </fold>
    <data-source-select />
  </div>
</template>

<script>
import Fold from '@/setting-component/fold/index'
import { EchartsSeriesRespondMixins } from '@/mixins'
import FormRow from '@/setting-component/form-row/index'
import SvInput from '@/setting-component/sv-input/index'
import DataSourceSelect from '@/setting-component/data-source-select/index'

export default {
  name: 'DataSourceSetting',
  mixins: [EchartsSeriesRespondMixins],
  components: {
    DataSourceSelect,
    SvInput,
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

.label
  display flex
  align-items center

  .explain
    margin-left 10px
    cursor pointer
    color theme-color

    &:hover
      opacity 0.8

.button
  transform scale(0.9)
</style>
