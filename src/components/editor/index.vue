<template>
  <div
    :class="{ edit: isEdit, editor: true }"
    id="editor"
    :style="{
      width: changeStyleWithScale(canvasStyleData.width) + 'px',
      height: changeStyleWithScale(canvasStyleData.height) + 'px',
    }"
    @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown"
  >
    <!--网格线-->
    <Grid></Grid>
    <!-- 选择框 -->
    <Shape
      v-for="(item, index) in componentData"
      :style="getShapeStyle(item.style)"
      :defaultStyle="item.style"
      :key="item.id"
      :active="item.id === (curComponent || {}).id"
      :index="index"
      :element="item"
      :class="{ lock: item.isLock }"
    >
      <component
        :is="item.component"
        class="component"
        :style="getComponentStyle(item.style)"
        :setting="item.setting"
        :element="item"
        v-if="item.component != 'v-text'"
        :id="'component' + item.id"
      />
      <component
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :setting="item.setting"
        :element="item"
        class="component"
        v-else
        :id="'component' + item.id"
      />
    </Shape>
    <Contextmenu />
    <Area
      :start="selectAreaStart"
      :width="selectAreaWidth"
      :height="selectAreaHeight"
      v-show="isShowArea"
    />
    <MarkLine />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Grid from './grid'
import Shape from '@/components/shape/index'
import Area from '@/components/area/index' //选择区域
import Contextmenu from '@/components/contextmenu/index'
import MarkLine from '@/components/markline/index'
import { changeStyleWithScale } from '@/utils/translate'
import { getStyle } from '@/utils/style'
export default {
  name: 'Editor',
  components: {
    Grid,
    Shape,
    Area,
    Contextmenu,
    MarkLine
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      selectAreaStart: {
        x: '',
        y: ''
      },
      selectAreaWidth: 0,
      selectAreaHeight: 0,
      isShowArea: false,
      isShowContextmenu: false,
    }
  },
  mounted () {
    // 获取编辑器元素
    this.$store.commit('getEditor')
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'canvasStyleData',
    'editor',
  ]),
  methods: {
    changeStyleWithScale,
    handleContextMenu (e) {
      e.stopPropagation()
      e.preventDefault()
      const { clientX, clientY } = e
      const rectInfo = this.editor.getBoundingClientRect()
      this.isShowContextmenu = true
      const top = clientY - rectInfo.y, left = clientX - rectInfo.x
      this.$store.commit('showContextMenu', { top, left })
    },
    //鼠标选取事件
    handleMouseDown (e) {
      if (!this.curComponent || (this.curComponent.component != 'v-text' && this.curComponent.component != 'rect-shape')) {
        e.preventDefault()
      }
      this.hideArea()
      this.$store.commit('hideContextMenu')
      const rectInfo = this.editor.getBoundingClientRect()
      this.editorX = rectInfo.x
      this.editorY = rectInfo.y
      const { clientX, clientY } = e
      const startX = clientX, startY = clientY
      this.selectAreaStart.x = startX - this.editorX
      this.selectAreaStart.y = startY - this.editorY
      // 展示选中区域
      this.isShowArea = true
      const move = (event) => {
        this.selectAreaWidth = Math.abs(event.clientX - startX)
        this.selectAreaHeight = Math.abs(event.clientY - startY)
        if (event.clientX < startX) {
          this.selectAreaStart.x = event.clientX - this.editorX
        }
        if (event.clientY < startY) {
          this.selectAreaStart.y = event.clientY - this.editorY
        }
      }
      const up = (e) => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        if (e.clientX == startX && e.clientY == startY) {
          this.hideArea()
          return
        }
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    getShapeStyle (style) {
      const result = {};
      ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        attr !== 'rotate' ? result[attr] = style[attr] + 'px' :
          result.transform = 'rotate(' + style[attr] + 'deg)'
      })
      return result
    },
    getComponentStyle (style) {
      return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
    },
    hideArea () {
      this.isShowArea = false
      this.selectAreaWidth = 0
      this.selectAreaHeight = 0
    }
  },
}
</script>

<style scoped lang="less">
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
