<template>
  <div class="upload-box">
    <div class="show-url">
      <input class="input" :value="value" @input="inputHandler($event)" />
    </div>
    <div class="upload-area" ref="box">
      <div class="upload-tooltip" v-if="!showImg">
        点击或拖拽图片到此上传
      </div>
      <input
        type="file"
        class="upload-input"
        :multiple="multiple"
        :accept="accept"
        @change="changeHandler($event)"
      />
      <div class="operate-btns" v-if="showImg" @click="removeImg">
        <i class="iconfont sv-guanbi"></i>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import debounce from '@/utils/debounce'
export default {
  name: 'Upload',
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showImg: false,
    }
  },
  methods: {
    async changeHandler(e) {
      const { files } = e.target
      let data = new FormData()
      if (this.multiple) {
        // console.log('多文件')
      } else {
        if (files.length > 0) {
          data.append('file', files[0])
          const result = await api.upload(data)
          if (result.code === 200) {
            this.$emit('input', result.data.path)
          }
        }
      }
    },
    inputHandler: debounce(function(e) {
      this.$emit('input', e.target.value)
    }),
    removeImg() {
      const boxDom = this.$refs.box
      const imgDom = boxDom.querySelector('.upload-show')
      imgDom && boxDom.removeChild(imgDom)
      this.$emit('input', '')
    },
    appendImg(value) {
      const boxDom = this.$refs.box
      const imgDom = boxDom.querySelector('.upload-show')
      imgDom && boxDom.removeChild(imgDom)
      if (value != '') {
        const img = new Image()
        img.src = value
        img.className = 'upload-show'
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.objectFit = 'contain'
        img.onerror = () => {
          this.showImg = false
        }
        img.onload = () => {
          this.$refs.box.appendChild(img)
          this.showImg = true
        }
      } else {
        this.showImg = false
      }
    },
  },
  watch: {
    value(value) {
      this.appendImg(value)
    },
  },
  mounted() {
    const { value } = this
    this.appendImg(value)
  },
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/index.styl"

.upload-box
  display flex
  flex-direction column
  justify-content flex-start
  align-content stretch
  min-height 200px

  .show-url

    .input
      box()
      background-color form-bg-color
      border 1px solid form-bg-color
      color #ffffff
      padding 0 7px
      height form-height
      width 100%

      &:focus
        outline 0
        border 1px solid theme-color

  .upload-area
    box()
    padding 10px
    flex 1
    margin-top 10px
    position relative
    border 1px dashed #b0b0b0
    border-radius 2px
    display flex
    align-items center
    justify-content center
    height 150px

    .upload-tooltip
      color #b0b0b0
      height 100%
      display flex
      align-items center
      justify-content center

    .upload-input
      position absolute
      top 0
      height 100%
      width 100%
      opacity 0
      cursor pointer

      &:focus
        outline 0

    .operate-btns
      position absolute
      top 3px
      right 3px
      cursor pointer

      .iconfont
        font-size 12px
        font-weight bolder
        color #e0e0e0

        &:hover
          color #ffffff
</style>
