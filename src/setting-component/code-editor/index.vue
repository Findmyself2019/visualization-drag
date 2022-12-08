<template>
  <div
    ref="editor"
    class="editor-box"
    :style="style"
  ></div>
</template>

<script>
import * as monaco from 'monaco-editor'
const THEME_COLOR = '#292f3a'
export default {
  name: "CodeEditor",
  model: {
    prop: 'code',
    event: 'change'
  },
  props: {
    height: {
      type: [Number, String],
      default: 200
    },
    code: { // 内容
      type: String,
      default: ''
    },
    language: { // 语言
      type: String,
      default: 'javascript'
    },
    theme: { // 主题
      type: String,
      default: 'sv-dark'
    },
    showMiniMap: { // 是否显示缩略图
      type: Boolean,
      default: false
    },
    contextmenu: { // 显示右键菜单
      type: Boolean,
      default: false
    },
    fontSize: { // 默认字体大小
      type: Number,
      default: 13
    },
    quickSuggestions: {  // 智能提示
      type: Boolean,
      default: true
    },
    lineNumbers: { // 是否显示行数
      type: String,
      default: 'on'
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      const {height} = this
      return {
        height: typeof height === 'number' ? `${height}px` : height,
      }
    }
  },
  mounted() {
    const {language, code, showMiniMap, theme, contextmenu, fontSize, quickSuggestions, lineNumbers, readOnly} = this
    this.setTheme()
    if (language === 'console') {
      // 注册console language
      monaco.languages.register({ id: 'console' })
  
      // 为该语言注册一个颜色匹配正则
      monaco.languages.setMonarchTokensProvider('console', {
        tokenizer: {
          root: [
            [/\[error.*/, "custom-error"],
            [/\[notice.*/, "custom-notice"],
            [/\[info.*/, "custom-info"],
            [/\[[0-9\- 0-9:]+\]/, "custom-date"],
          ]
        }
      })
    }
  
    if (theme === 'console-theme') {
      // 定义一个只包含与该语言匹配的规则的新主题
      monaco.editor.defineTheme('console-theme', {
        base: 'vs-dark',
        inherit: false,
        rules: [
          { token: 'custom-info', foreground: '808080' },
          { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
          { token: 'custom-notice', foreground: 'FFA500' },
          { token: 'custom-date', foreground: '008800' },
        ]
      })
    }
    
    this.monacoEditor = monaco.editor.create(this.$refs['editor'], {
      theme,
      language,
      value: code,
      contextmenu,
      fontSize,
      quickSuggestions,
      lineNumbers,
      readOnly,
      fixedOverflowWidgets: true, // 智能提示不隐藏
      scrollBeyondLastLine: false,
      scrollbar: {
        verticalScrollbarSize: 7,
        horizontalScrollbarSize: 7,
      },
      minimap: {
        enabled: showMiniMap
      },
      automaticLayout: true // 自动布局
    })
    
    this.monacoEditor.onDidChangeModelContent(() => {
      let value = this.monacoEditor.getValue()
      if (this.code !== value) {
        this.$emit('change', value)
      }
    })
    
  },
  watch: {
    code(newValue) {
      if (this.monacoEditor) {
        if (newValue !== this.monacoEditor.getValue()) {
          this.monacoEditor.setValue(newValue)
        }
      }
    },
    readOnly(val) {
      this.monacoEditor.updateOptions({
        readOnly: val
      })
    }
  },
  methods: {
    setTheme() {
      monaco.editor.defineTheme('sv-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
        ],
        colors: {
          'editor.background': THEME_COLOR, // 背景色
          'editor.lineHighlightBackground': THEME_COLOR, //光标所在行高亮文本的背景颜色
        }
      })
    }
  },
  destroyed() {
    this.monacoEditor.dispose()
  }
}
</script>

<style lang="stylus">
  .editor-box
    min-height 200px
    
    .monaco-scrollable-element > .scrollbar > .slider
      border-radius 20px
</style>
