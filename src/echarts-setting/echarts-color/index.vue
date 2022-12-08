<!-- echarts 全局color 配置 -->
<template>
  <fold-in label="颜色配置">
    <div slot="pane-right">
      <i class="iconfont sv-tianjia1" @click="addColor"></i>
    </div>
    <div slot="content">
      <div class="color-item" v-for="(item, index) in color" :key="index">
        <div class="color-left">
          <span class="index">{{ index + 1 }}</span>
          <sv-color
            :value="item"
            @input="handleInput($event, index)"
            horizontal="left"
          />
        </div>
        <i class="iconfont sv-jian" @click="removeColor(index)"></i>
      </div>
    </div>
  </fold-in>
</template>

<script>
import FoldIn from '@/setting-component/fold-in/index'
import SvColor from '@/setting-component/sv-color/index'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EchartsColor',
  computed: {
    ...mapState('echartsSetting', ['color']),
  },
  methods: {
    ...mapActions('echartsSetting', {
      addColorAction: 'addColor',
      removeColorAction: 'removeColor',
      updateColorAction: 'updateColor',
    }),
    ...mapActions('pageComList', ['changeComSetting']),
    handleInput(color, index) {
      this.updateColorAction({
        index,
        color,
      })
    },
    addColor() {
      this.addColorAction('#3896fe')
    },
    removeColor(index) {
      this.removeColorAction(index)
    },
  },
  components: { SvColor, FoldIn },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.iconfont
  font-size 15px
  cursor pointer

  &:hover
    color theme-color

.color-item
  display flex
  align-items center
  justify-content space-between
  margin-bottom 10px

  .color-left
    display flex
    align-items center

    .index
      margin 0 15px
</style>
