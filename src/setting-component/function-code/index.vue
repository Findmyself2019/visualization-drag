<template>
  <div class="fn-box" :style="{ fontSize: `${fontSize}px` }">
    <div class="fn-start" v-if="isFunction">
      <span class="fn">function</span>
      <span class="fn-name">{{ fnName }}(</span>
      <span class="fn-params">{{ fnParams.join(', ') }}</span>
      <span class="start-bracket">){</span>
    </div>
    <!--    <code-editor-->
    <!--      ref="editor"-->
    <!--      :font-size="fontSize"-->
    <!--      :code="fnBody"-->
    <!--      :language="isFunction ? 'javascript' : language"-->
    <!--      :read-only="!immEdit && readOnly"-->
    <!--      @change="handleChange($event)"-->
    <!--    />-->
    <code-editor-of-ace
      ref="editor"
      :code="fnBody"
      :options="{ readOnly: !immEdit && readOnly }"
      @change="handleChange($event)"
      :language="isFunction ? 'javascript' : language"
    />
    <div class="fn-end" v-if="isFunction">
      <span class="end-bracket">}</span>
    </div>
    <div class="operate" v-if="!immEdit">
      <el-tooltip v-if="!readOnly">
        <div slot="title">
          保存
        </div>
        <i class="save iconfont sv-baocun1" @click="toggleReadOnly(true)"></i>
      </el-tooltip>
      <el-tooltip v-if="readOnly">
        <div slot="title">
          编辑
        </div>
        <i
          class="edit iconfont sv-icon-bainji"
          @click="toggleReadOnly(false)"
        ></i>
      </el-tooltip>
      <el-tooltip>
        <div slot="title">
          放大
        </div>
        <i
          class="screen-full iconfont sv-quanping"
          @click="handleClick"
          v-if="showFull"
        ></i>
      </el-tooltip>
    </div>
    <sv-dialog
      title="代码编辑"
      class="dialog"
      v-if="showFull"
      v-model="visible"
      @ok="sure"
      @cancel="cancel"
    >
      <div class="fn-box" :style="{ fontSize: `${fontSize}px` }" slot="content">
        <div class="fn-start" v-if="isFunction">
          <span class="fn">function</span>
          <span class="fn-name">{{ fnName }}</span>
          <span class="fn-params">({{ fnParams.join(', ') }})</span>
          <span class="start-bracket">{</span>
        </div>
        <code-editor-of-ace
          :code="fnBody"
          @change="handleChange($event)"
          :height="400"
          :language="isFunction ? 'javascript' : language"
        />
        <div class="fn-end" v-if="isFunction">
          <span class="end-bracket">}</span>
        </div>
      </div>
    </sv-dialog>
  </div>
</template>

<script>
import SvDialog from '@/setting-component/sv-dialog'
import CodeEditorOfAce from '@/setting-component/code-editor-of-ace/index'

export default {
  name: 'FunctionCode',
  props: {
    fnName: {
      type: String,
      default: 'fn',
    },
    fnParams: {
      type: Array,
      default: () => [],
    },
    fnBody: {
      type: String,
      default: '',
    },
    fontSize: {
      type: Number,
      default: 13,
    },
    showFull: {
      // 可放大
      type: Boolean,
      default: true,
    },
    isFunction: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: '',
    },
    // 是否能够直接编辑
    immEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      readOnly: true,
      visible: false,
      editBody: this.fnBody,
    }
  },
  mounted() {
    this.editor = this.$refs.editor.editor
  },
  methods: {
    handleChange(val) {
      this.editBody = val
    },
    handleClick() {
      this.editBody = this.fnBody
      this.visible = true
    },
    toggleReadOnly(val) {
      this.readOnly = val
      if (val) {
        this.$emit('save', this.editBody)
      } else {
        this.$refs.editor.editor.focus()
      }
    },
    cancel() {
      this.editBody = this.fnBody
      this.readOnly = true
    },
    sure() {
      this.$emit('save', this.editBody)
      this.readOnly = true
    },
  },
  components: {
    CodeEditorOfAce,
    SvDialog,
    // CodeEditor
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"
.fn-box
  background-color form-bg-color
  font-family Menlo, Monaco, "Courier New", monospace
  position relative
  color #ffffff
  margin-bottom 10px

  .fn-start
    line-height 20px
    padding-left 4rem
    overflow hidden
    overflow-wrap break-word
    text-indent -2rem

    .fn
      font-style italic
      color #66D9EF

    .fn-name
      margin-left 7px

    .fn-params
      font-style italic
      color #FD971F

  .fn-end
    line-height 20px
    padding-left 42px

  .operate
    position absolute
    bottom 5px
    right 5px
    color #b9b9b9
    display flex
    justify-content space-evenly

    .iconfont
      margin 0 5px
      cursor pointer
      line-height 1

      &:hover
        color #ffffff
</style>
