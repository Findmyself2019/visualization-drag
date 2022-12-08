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
        <slot name="label" v-if="labelSlot"></slot>
        <span v-else>{{ label }}</span>
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
  name: 'FoldIn',
  components: {CollapseTransition},
  props: {
    label: {
      type: String,
      default: ''
    },
    open: { // 默认打开状态
      type: Boolean,
      default: false
    },
    canOpen: { // 是否可折叠
      type: Boolean,
      default: true
    }
  },
  computed: {
    labelSlot() {
      return this.$slots.label
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
  }
}
</script>

<style scoped lang="stylus">
  .detail-review
    height 25px
    display flex
    justify-content space-between
    align-items center
    padding-left 12px
    margin-bottom 10px
    
    .isDetail
      height 100%
      display flex
      align-items center
  
      .arrow
        margin-right 5px
        transition all .2s linear
    
        &.rotate
          transform rotate(90deg)
    
        i
          font-size 12px

  .slot-content
    margin-left 19px
    margin-bottom 3px
    border-left 1px dotted #575759
  
</style>
