<!-- 颜色滑块  -->
<template>
  <div>
    <div
      class="mo-color-hue"
      ref="slideWrap"
      @click="clickHandler($event)"
    >
      <div class="mo-color-rail"></div>
      <div
        class="mo-color-thumb"
        role="slider"
        tabindex="0"
        :style="{left: currentPosition}"
      >
        <span
          @mousedown="mousedownHandler($event)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorSlide',
  model: {
    prop: 'value',
    event: 'handleColor'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      isClick: true,
      startX: 0,
      currentX: 0,
      startPosition: 0,
      dragging: false,
      newPosition: 100,
      precision: 0,
      slideWidth: 0
    }
  },
  computed: {
    currentPosition() {
      return `${this.newPosition}%`
    },
  },
  mounted() {
    this.newPosition = this.value / 360 * 100
  },
  methods: {
    mousedownHandler(event) {
      this.onDragStart(event)
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.onDragEnd)
    },
    onDragStart(event) {
      this.isClick = true
      this.dragging = true                               // 是否可拖拽
      this.slideWidth = this.$refs.slideWrap.clientWidth // 滑块父容器宽度
      this.startX = event.clientX                        // 开始位置
      this.startPosition = parseFloat(this.currentPosition) // 当前位置
    }, 
    onDragging(event) {
      if (this.dragging) {
        this.currentX = event.clientX
        const diff = (this.currentX - this.startX) / this.slideWidth * 100
        this.newPosition = this.startPosition + diff
        if (this.newPosition <= 0) {
          this.newPosition = 0
          this.$emit('handleColor', 0)
        } else if (this.newPosition >= 100) {
          this.newPosition = 100
          this.$emit('handleColor', 0)
        } else {
          this.$emit('handleColor', this.newPosition / 100 * 360)
        }
      }
    },
    onDragEnd() {
      // 防止鼠标松开跟着鼠标走
      if (this.dragging) {
        this.isClick = false
        this.dragging = false
        window.removeEventListener('mousemove', this.onDragging)
        window.removeEventListener('mouseup', this.onDragEnd)
      }
      // 解决拖动完成后会触发click事件
      setTimeout(() => this.isClick = true, 0)
    },
    clickHandler(e) {
      if (this.isClick) {
        this.slideWidth = this.$refs.slideWrap.clientWidth
        this.startX = 0
        this.startPosition = 0
        this.currentX = e.offsetX
        this.newPosition = (this.currentX - this.startX) / this.slideWidth * 100
        this.$emit('handleColor', this.newPosition / 100 * 360)
      }
    },
  },
  components: {}
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  
  input
    display none
  
  .mo-color-hue
    position relative
    width 100%
    height 10px
    cursor pointer
    
    .mo-color-rail
      position: absolute;
      top 0
      left 0
      width 100%
      height 100%
      overflow hidden
      background linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)
  
  .mo-color-alpha
    position relative
    width 100%
    height 10px
    margin 10px 0 0
    cursor pointer
    background-color: #fff;
    background-image: linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5), linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5);
    background-size: 10px 10px;
    background-position: 0 0, 5px 5px;
  
  .mo-color-thumb
    position absolute
    z-index 1
    outline none
  
  .mo-color-thumb > span
    display block
    width 6px
    height 10px
    background-color #fff
    box-shadow 0 0 2px rgba(0, 0, 0, .6)
    transform: translateX(-2px)
</style>
