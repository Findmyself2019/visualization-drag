<template>
  <div
    class="editor-box"
    :style="{
      height: `${height}` !== height ? `${height}px` : height,
      width: `${width}` !== width ? `${width}px` : width,
    }"
  >
    <editor
      ref="editor"
      :value="code"
      @input="handleInput"
      @init="editorInit"
      :theme="theme"
      :lang="language"
      :width="width"
      :height="height"
      :options="{ ...defaultOptions, ...options }"
    />
    <div class="operate-icons">
      <el-tooltip>
        <div slot="title">
          放大
        </div>
        <i class="iconfont sv-quanping" @click="showModal" v-if="showFull"></i>
      </el-tooltip>
    </div>
    <a-modal
      title="代码编辑"
      v-if="showFull"
      v-model="visible"
      :width="800"
      @ok="sure"
    >
      <editor
        ref="editor2"
        v-model="code2"
        @init="editorInit"
        :theme="theme"
        :lang="language"
        :width="width"
        :height="height"
        :options="{ ...defaultOptions, ...options }"
      />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'CodeEditorOfAce',
  model: {
    prop: 'code',
    event: 'change',
  },
  props: {
    height: {
      type: [Number, String],
      default: 200,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    code: {
      // 内容
      type: String,
      default: '',
    },
    language: {
      // 语言
      type: String,
      default: 'javascript',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    theme: {
      // 主题
      type: String,
      default: 'sv-dark',
    },
    showFull: {
      // 显示放大图标
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultOptions: {
        readOnly: false, // 是否只读
        fontSize: 13,
        tabSize: 2,
        displayIndentGuides: false,
        showLineNumbers: true,
        enableSnippets: true, // 提示代码片段
        enableLiveAutocompletion: true, // 代码提示
      },
      visible: false,
      code2: '',
    }
  },
  watch: {
    code: {
      immediate: true,
      handler(value) {
        this.code2 = value
      },
    },
  },
  methods: {
    editorInit() {
      const { language, theme } = this
      if (theme === 'sv-dark') {
        require('./theme/sv-dark')
      } else {
        require(`brace/theme/${theme}`)
      }
      require('brace/ext/language_tools')
      // 搜索
      require('brace/ext/searchbox')
      require(`brace/mode/${language}`)
      require(`brace/snippets/${language}`)
      this.editor = this.$refs.editor.editor
      this.editor.setKeyboardHandler('brace/keybinding/vim')
      this.editor.on('blur', () => {
        this.$emit('blur')
      })
      this.editor.on('focus', () => {
        this.$emit('focus')
      })
    },
    handleInput(value) {
      this.$emit('change', value)
    },
    showModal() {
      this.visible = true
    },
    sure() {
      this.$emit('change', this.code2)
      this.visible = false
    },
  },
  components: {
    editor: require('vue2-ace-editor'),
  },
}
</script>

<style scoped lang="stylus">
.editor-box
  position relative
  width 100%

  .operate-icons
    position absolute
    right 0
    bottom 0
    display flex
    justify-content  flex-end
    color #b9b9b9
    z-index 9

    .iconfont
      margin 5px
      cursor pointer
      line-height 1

      &:hover
        color #ffffff
</style>
