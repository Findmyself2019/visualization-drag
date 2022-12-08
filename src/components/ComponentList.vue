<template>
  <div class="component-wrapper" @dragstart="dragstartHandler">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="component-item"
      :data-index="index"
      draggable
    >
      <span class="iconfont" :class="'icon-' + item.icon"></span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from '@/common-component/component-list.js'
export default {
  name: 'ComponentList',
  data() {
    return {
      componentList,
    }
  },
  methods: {
    dragstartHandler(e) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    },
  },
}
</script>

<style scoped lang="less">
.component-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  .component-item {
    width: 42%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      cursor: grabbing;
    }
    .iconfont {
      margin-right: 4px;
      font-size: 20px;
    }
    .icon-wenben,
    .icon-tupian {
      font-size: 18px;
    }
  }
}
</style>
