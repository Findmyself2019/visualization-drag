<template>
  <div class="mark-line">
    <div
      v-for="line in markLines"
      :key="line"
      :class="['line', line.includes('x') ? 'xline' : 'yline']"
      :ref="line"
      v-show="lineStatus[line] || false"
    ></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import eventBus from '@/utils/eventBus'
import { getComponentRotatedStyle } from '@/utils/style'
export default {
  name: 'MarkLine',
  data() {
    return {
      markLines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'], // 分别对应三条横线和三条竖线,
    }
  },
  mounted() {
    // 监听元素移动和不移动的事件
    eventBus.$on('move', (isDownward, isRightward) => {
      this.showLine(isDownward, isRightward)
    })

    eventBus.$on('unmove', () => {
      this.hideLine()
    })
  },
  computed: {
    ...mapState('markline', ['lineStatus', 'diff']),
    ...mapState(['curComponent', 'componentData']),
  },
  methods: {
    ...mapActions('markline', ['changeMarkLineStatus']),
    showLine(isDownward, isRightward) {
      const lines = this.$refs
      const curComponentStyle = getComponentRotatedStyle(
        this.curComponent.style
      )
      console.log(isDownward, isRightward)
      const curComponentHalfwidth = curComponentStyle.width / 2
      const curComponentHalfHeight = curComponentStyle.height / 2
      this.hideLine()
      this.componentData.forEach((component) => {
        //排除本身
        if (component === this.curComponent) return
        const componentStyle = getComponentRotatedStyle(component.style)
        const { top, left, bottom, right } = componentStyle
        const componentHalfwidth = componentStyle.width / 2
        const componentHalfHeight = componentStyle.height / 2
        const conditions = {
          top: [
            {
              isNearly: this.isNearly(curComponentStyle.top, top),
              lineNode: lines.xt[0], // xt
              line: 'xt',
              dragShift: top,
              lineShift: top,
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt[0], // xt
              line: 'xt',
              dragShift: top - curComponentStyle.height,
              lineShift: top,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.top + curComponentHalfHeight,
                top + componentHalfHeight
              ),
              lineNode: lines.xc[0], // xc
              line: 'xc',
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: top + componentHalfHeight,
            },
            {
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb[0], // xb
              line: 'xb',
              dragShift: bottom,
              lineShift: bottom,
            },
            {
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb[0], // xb
              line: 'xb',
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom,
            },
          ],
          left: [
            {
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl[0], // yl
              line: 'yl',
              dragShift: left,
              lineShift: left,
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl[0], // yl
              line: 'yl',
              dragShift: left - curComponentStyle.width,
              lineShift: left,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: this.isNearly(
                curComponentStyle.left + curComponentHalfwidth,
                left + componentHalfwidth
              ),
              lineNode: lines.yc[0], // yc
              line: 'yc',
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth,
            },
            {
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr[0], // yr
              line: 'yr',
              dragShift: right,
              lineShift: right,
            },
            {
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr[0], // yr
              line: 'yr',
              dragShift: right - curComponentStyle.width,
              lineShift: right,
            },
          ],
        }
        const { rotate } = this.curComponent.style
        Object.keys(conditions).forEach((key) => {
          // 遍历符合的条件并处理
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return
            // 修改当前组件位移
            this.$store.commit('setShapeSingleStyle', {
              key,
              value:
                rotate != 0
                  ? this.translatecurComponentShift(
                      key,
                      condition,
                      curComponentStyle
                    )
                  : condition.dragShift,
            })
            //显示辅助线
            condition.lineNode.style[key] = `${condition.lineShift}px`
            this.changeMarkLineStatus({ line: condition.line, status: true })
          })
        })
      })
    },
    hideLine() {
      Object.keys(this.lineStatus).forEach((line) => {
        this.changeMarkLineStatus({ line: line, status: false })
      })
    },
    isNearly(dragValue, targetValue) {
      console.log(Math.abs(dragValue - targetValue) <= this.diff)
      return Math.abs(dragValue - targetValue) <= this.diff
    },
  },
}
</script>

<style scoped lang="less">
.mark-line {
  height: 100%;
  .line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
  }
  .xline {
    width: 100%;
    height: 1px;
  }
  .yline {
    height: 100%;
    width: 1px;
  }
}
</style>
