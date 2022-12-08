<template>
  <div class="box" ref="projectButton">
    <input
      class="sv-select"
      :value="inputVal"
      @click="blur($event)"
      :class="{active:!arrowsShow}"
      ref="input"
      readonly
    />
    <span class="arrows">
      <i
        :class="['iconfont', 'sv-below-s', {bottom: arrowsShow}]"
        @click="blur"
      ></i>
    </span>
    <transition name="show">
      <ul
        v-show="!arrowsShow"
        ref="ul"
      >
        <li
          v-for="(item, index) in dataArray"
          :key="index"
          @mousedown="selectOption(item.value)"
          :class="{active:item.value === value}"
        >
          {{ item.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SvSelectOld",
  props: {
    dataArray: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: [Number, String, Boolean],
      default: ''
    }
    
  },
  data() {
    return {
      arrowsShow: true,//控制下拉框箭头的显示与否
    }
  },
  //修改默认值取得是value值而不是label值
  computed:{
    inputVal(){
      let str = ''
      this.dataArray.forEach(item =>{
        if(item.value === this.value){
          str = item.label
        }
      })
      return str
    }
    
  },
  methods: {
    //下拉option选中
    selectOption(value) {
      this.arrowsShow = !this.arrowsShow
      this.$emit('input', value)
    },
    blur(e) {
      this.arrowsShow = !this.arrowsShow
      if(!this.arrowsShow){
        const bodyHeight = document.body.offsetHeight,
          mouseY = e.clientY,
          inputY = this.$refs.input.clientHeight - e.offsetY,
          diffY = bodyHeight - mouseY - inputY - 10
        this.getOuterSizes(this.$refs.ul,diffY)
      }
      document.addEventListener('click', this.hidePanel, false)//点击空白处事件
      return false
    },
    //空白处事件
    hidePanel(e) {
      if (this.$refs.projectButton && !this.$refs.projectButton.contains(e.target)) {
        this.arrowsShow = true
        document.removeEventListener('click', this.hidePanel, false)
      }
    },
    //
    getOuterSizes(element,diffY) {
      //先下拉框透明显示 获取他的高度
      element.style.display = 'block'
      element.style.visibility = 'hidden'
      let styles = document.defaultView.getComputedStyle(element, null)
      let ulHeight = parseFloat(styles.height)
      const upOffset = ulHeight + 10
      //判断如果input框距离页面最底部的距离小于下拉ul的高度,让他向上展开
      if (diffY < ulHeight) {
        let child = this.$refs.projectButton.childNodes
        this.$refs.projectButton.append(child[2])
        this.$refs.ul.style.top = -upOffset + 'px'
      }else{
        let child = this.$refs.projectButton.childNodes
        this.$refs.projectButton.append(child[2])
        this.$refs.ul.style.top = 35 + 'px'
      }
      //计算完之后让他显示出来
      element.style.display = 'block'; element.style.visibility = 'visible'
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/stylus/index.styl"
  .box
    height form-height
    box()
    position relative
    user-select none
    
    .arrows
      position absolute
      top 0
      right 4px
      width 18px
      bottom 0
      display flex
      align-items center
      justify-content center
      cursor pointer
      
      .sv-below-s
        font-size 12px
        transition all .3s linear
        transform scale(0.9) rotate(180deg)
        
        &.bottom
          transform rotate(0deg)
    
    .sv-select.active
      border 1px solid rgba(80, 185, 249, 1)
    
    .sv-select
      box()
      width 100%
      height form-height
      color #fff
      padding 0 22px 0 10px
      border 1px solid form-bg-color
      background-color rgba(41, 47, 58, 1)
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      outline none
      cursor pointer
      
      &:focus
        border 1px solid rgba(80, 185, 249, 1)
  
  .show-enter, .show-leave-to
    opacity 0
    transform translateY(10px)
  
  .show-enter-active, .show-leave-active
    transition all .2s ease-in
  
  .show-leave, .show-enter-to
    opacity 1
    transform translateY(0)
  ul
    box()
    width 100%
    position absolute
    max-height 174px
    overflow-y auto
    background-color rgba(41, 47, 58, 1)
    border 1px solid rgba(80, 185, 249, 1)
    color #fff
    top 35px
    z-index 999
    
    li
      padding: 6px 0 6px 10px;
      cursor pointer
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-family fonts
      font-size font-size-default
      
      &:hover
        background rgba(78, 161, 255, 0.75)
    
    li.active
      background #4F9AF8
  
  ul::-webkit-scrollbar
    width: 0


</style>
