<!--  -->
<template>
  <div>
    <div class="detail-review">
      <div
        class="isDetail"
        @click="openDetail"
        :style="{cursor: canOpen ? 'pointer' : 'default'}"
      >
        <span :class="['arrow', {rotate: isShow}]" v-if="canOpen">
          <i class="iconfont sv-iconfontjiantou5"></i>
        </span>
        <span>{{ label }}</span>
      </div>
      <div class="show">
        <slot name="pane-right"></slot>
      </div>
    </div>
    <collapse-transition>
      <div class="slot-content" v-show="!canOpen || isShow">
        <slot name="content"></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from "@/animate"
export default {
  name: 'Fold',
  props: {
    label: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    },
    canOpen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: this.open
    }
  },
  methods:{
    // 切换列表状态
    openDetail() {
      this.canOpen && (this.isShow = !this.isShow)
    }
  },
  components: {CollapseTransition}
}
</script>

<style scoped lang="stylus">
  .detail-review
    height 30px
    background #efefef
    border-bottom 1px solid #efefef
    display flex
    justify-content space-between
    align-items center
    padding 0 10px
    
    .isDetail
      height 100%
      display flex
      align-items center
      cursor pointer

      .arrow
        margin-right 5px
        transition all .2s linear
        
        &.rotate
          transform rotate(90deg)
          
        i
          font-size 12px

  .slot-content
    padding 10px 12px 0 0
  
</style>
