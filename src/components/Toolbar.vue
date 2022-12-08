<template>
  <div>
    <div class="toolbar">
      <el-button @click="undo">撤消</el-button>
      <el-button @click="redo">重做</el-button>
      <label for="input" class="insert">插入图片</label>
      <input type="file" @change="handleFileChange" id="input" hidden />
      <el-button @click="preview" style="margin-left: 10px;">预览</el-button>
      <el-button @click="save">保存</el-button>
      <el-button @click="clearCanvas">清空画布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data() {
    return {}
  },
  methods: {
    undo() {
      this.$store.commit('undo')
    },
    redo() {},
    handleFileChange() {},
    preview() {},
    save() {},
    clearCanvas() {},
  },
}
</script>

<style scoped lang="less">
.toolbar {
  height: 64px;
  line-height: 64px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
  .insert {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 10px;
    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: 0;
    }

    &:hover {
      background-color: #ecf5ff;
      color: #3a8ee6;
    }
  }
}
</style>
