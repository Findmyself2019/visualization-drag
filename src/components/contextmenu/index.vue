<template>
  <div class="contextmenu" :style="{ top: contextmenuTop + 'px', left: contextmenuLeft + 'px' }" v-show="contextmenuShow">
    <ul class="contextmenu-wrap">
      <template v-if="curComponent">
        <li class="contextmenu-list" v-for="li in contextmenuList" :key="li.value">{{ li.label }}</li>
      </template>
      <template v-else>
        <li class="contextmenu-list">粘贴</li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'ContextMenu',
  data () {
    return {
      contextmenuList: [
        {
          label: '复制',
          value: 'copy'
        },
        {
          label: '粘贴',
          value: 'paste'
        },
        {
          label: '剪贴',
          value: 'cut'
        },
        {
          label: '删除',
          value: 'delete'
        },
      ]
    }
  },
  computed: {
    ...mapState(['contextmenuTop',
      'contextmenuLeft',
      'contextmenuShow',
      'curComponent',])
  }
}
</script>

<style scoped lang="less">
.contextmenu {
  position: absolute;
  z-index: 10000;
  .contextmenu-wrap {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;
    .contextmenu-list {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
