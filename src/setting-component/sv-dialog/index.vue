<!-- 对话框 -->
<template>
  <transition
    name="fade"
    @after-leave="$emit('stop')"
  >
    <div class="dialog-box" v-show="visible">
      <transition name="move">
        <div class="dialog-wrapper" v-if="visible">
          <div class="dialog-header">
            <div class="title" v-if="!this.$slots.title">
              {{ title }}
            </div>
            <slot name="title" v-else></slot>
            <i
              class="close iconfont sv-guanbi1"
              v-if="showClose"
              @click="close"
            ></i>
          </div>
          <div class="dialog-content">
            <slot name="content"></slot>
          </div>
          <div class="dialog-footer">
            <button
              class="btn cancel"
              v-if="showCancelButton"
              @click="cancel"
            >
              取消
            </button>
            <button
              class="btn sure"
              v-if="showOkButton"
              @click="sure"
            >
              确定
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SvDialog",
  model: {
    prop: 'visible',
    event: 'close'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    showOkButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // 挂载到body下
    this.$nextTick(() => {
      document.body.appendChild(this.$el)
      this.$emit('init')
    })
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    cancel() {
      this.close()
      this.$emit('cancel')
    },
    sure() {
      this.close()
      this.$emit('ok')
    }
  },
  beforeDestroy() {
    this.$el.remove()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .fade-enter, .fade-leave-to
    opacity 0
    
  .fade-enter-active, .fade-leave-active
    transition all .3s ease-out
  
  .dialog-box
    color #000000
    position fixed
    z-index 99
    top 0
    left 0
    right 0
    bottom 0
    overflow hidden
    background rgba(0, 0, 0, 0.3)
    
    .move-enter, .move-leave-to
      transform translateY(-100px)
      opacity 0
      
    .move-enter-active, .move-leave-active
      transition all .3s ease-out
      
    &.alert

      .dialog-wrapper
        width 450px
  
    .dialog-wrapper
      margin 100px auto
      width 50%
      background #ffffff
      border-radius 3px
      
      .dialog-header
        padding 10px 15px
        display flex
        align-items center
        justify-content space-between
        font-size 15px
        
        .close
          font-size 14px
          
          &:hover
            color theme-color
            cursor pointer
  
      .dialog-content
        box-sizing border-box
        padding 10px 15px
      
      .dialog-footer
        padding 10px 15px
        display flex
        justify-content flex-end
      
        .btn
          border-radius 3px
          padding 6px 10px
          font-size 13px
          cursor pointer
          margin-left 15px
        
          &:focus
            outline 0
        
          &.cancel
            border 1px solid #dcdfe6
            color #606266
          
            &:hover
              border-color rgba(82, 157, 255, 0.81)
              color rgba(82, 157, 255, 0.81)
        
          &.sure
            background-color theme-color
            color #ffffff
            border 1px solid theme-color
          
            &:hover
              background-color rgba(82, 157, 255, 0.81)
              border 1px solid rgba(82, 157, 255, 0.81)
</style>
