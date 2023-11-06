<template>
  <div class="vd-home-container">
    <Toolbar />
    <main>
      <!--左侧组件栏-->
      <section class="com-list">
        <ComponentList />
      </section>
      <section class="canvas-wrap">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <section class="right">
        <RightSide></RightSide>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import componentListData from '@/common-component/component-list' // 左侧列表数据
import generateID from '@/utils/generateID'
import Toolbar from '@/components/Toolbar'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import Editor from '@/components/editor/index.vue'
import RightSide from '@/components/right-side/index.vue'
export default {
  name: 'Home',
  components: {
    Toolbar,
    ComponentList,
    Editor,
    RightSide,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'componentData',
      'curComponent',
      'isClickComponent',
      'canvasStyleData',
      'editor',
    ]),
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      // this.$store.commit('hideContextMenu')
      const index = e.dataTransfer.getData('index')
      const rectInfo = this.editor.getBoundingClientRect()
      if (index) {
        const component = deepCopy(componentListData[index])
        //拖拽到编辑区的位置计算：top：clientY - 编辑区距离页面顶部 - 组件自身高度一半
        component.style.top =
          e.clientY - rectInfo.y - component.style.height / 2
        component.style.left =
          e.clientX - rectInfo.x - component.style.width / 2
        component.id = generateID()
        this.$store.commit('addComponent', { component })
        //拖拽至编辑区的组件应为选中状态
        this.$store.commit('setCurComponent', { component, index, id:component.id})
        this.$store.commit('setCurrentSettingPath', component.settingPath)
        this.$store.commit('changeComSizeAndPos', {id:component.id, sizeAndPos: {left:component.style.left, top:component.style.top, width: component.style.width, height: component.style.height}})
      }
    },
    handleMouseDown() {
      console.log('down')
      this.$store.commit('setClickComponentStatus', false)
    },
    deselectCurComponent(e) {
      console.log('up')
      if (!this.isClickComponent) {
        this.$store.commit('setCurComponent', {
          component: null,
          index: null,
        })
      }
      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit('hideContextMenu')
      }
    },
  },
}
</script>

<style scoped lang="less">
.vd-home-container {
  height: 100%;
  background: #fff;

  main {
    height: calc(~'100% - 65px');
    position: relative;

    .com-list {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
      box-sizing: border-box;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .canvas-wrap {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;
      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
