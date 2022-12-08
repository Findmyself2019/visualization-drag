<template>
  <div
    class="shape"
    :class="{ active }"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <span
      class="iconfont icon-xiangyouxuanzhuan"
      v-show="isActive()"
      @mousedown="handleRotate"
    ></span>
    <span class="iconfont icon-suo" v-show="element.isLock"></span>
    <div
      class="shape-point"
      v-for="item in isActive() ? pointList : []"
      @mousedown="handleMouseDownOnPoint(item, $event)"
      :key="item"
      :style="getPointStyle(item)"
    ></div>
    <slot></slot>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import eventBus from '@/utils/eventBus'
export default {
  name: 'Shape',
  data() {
    return {
      pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
      initialAngle: {
        // 每个点对应的初始角度
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315,
      },
      angleToCursor: [
        // 每个范围的角度对应的光标
        { start: 338, end: 23, cursor: 'nw' },
        { start: 23, end: 68, cursor: 'n' },
        { start: 68, end: 113, cursor: 'ne' },
        { start: 113, end: 158, cursor: 'e' },
        { start: 158, end: 203, cursor: 'se' },
        { start: 203, end: 248, cursor: 's' },
        { start: 248, end: 293, cursor: 'sw' },
        { start: 293, end: 338, cursor: 'w' },
      ],
      cursors: {},
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    element: {
      require: true,
      type: Object,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
    index: {
      require: true,
      type: [Number, String],
    },
  },
  methods: {
    ...mapActions('markline', ['guideLineBuilder']),
    isActive() {
      return this.active && !this.element.isLock
    },
    handleRotate() {},
    selectCurComponent(e) {
      // 阻止向父组件冒泡
      e.stopPropagation()
      e.preventDefault()
      this.$store.commit('hideContextMenu')
    },
    //组件拖拽事件
    handleMouseDownOnShape(e) {
      //组件选中事件一定要加在鼠标按下事件上，若加在click事件上右键事件组件无法选中
      //click事件也会触发mousedown事件
      this.$store.commit('setClickComponentStatus', true)
      this.$store.commit('setCurComponent', {
        component: this.element,
        index: this.index,
      })
      if (
        this.element.component != 'v-text' &&
        this.element.component != 'rect-shape'
      ) {
        e.preventDefault()
      }

      //阻止向父组件冒泡，防止触发鼠标选择区域事件
      e.stopPropagation()
      //组件被锁定，则无法移动
      if (this.element.isLock) return
      //获取组件放下后的坐标值
      const comPosition = { ...this.defaultStyle }

      //鼠标起始坐标
      const startY = e.clientY
      const startX = e.clientX

      //组件的起始坐标
      const comStartTop = Number(comPosition.top)
      const comStartLeft = Number(comPosition.left)

      // 如果元素没有移动，则不保存快照
      let hasMove = false

      //鼠标移动事件
      const move = (moveEvent) => {
        hasMove = true
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        comPosition.top = curY - startY + comStartTop
        comPosition.left = curX - startX + comStartLeft
        // this.guideLineBuilder()
        // 修改当前组件样式
        this.$store.commit('setShapeStyle', comPosition)
        this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // curY - startY > 0 true 表示向下移动 false 表示向上移动
          // curX - startX > 0 true 表示向右移动 false 表示向左移动
          eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
        })
      }

      //鼠标抬起事件
      const up = () => {
        hasMove && this.$store.commit('recordSnapshot')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    handleMouseDownOnPoint() {},
    getPointStyle(point) {
      const { width, height } = this.defaultStyle
      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = Math.floor(height / 2)
        }
      }

      const style = {
        marginLeft: hasR ? '-4px' : '-4px',
        marginTop: '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: this.cursors[point],
      }

      return style
    },
  },
}
</script>
<style lang="less" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 600;
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}
.icon-suo {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
