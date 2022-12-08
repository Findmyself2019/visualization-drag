import SvDialog from "@/setting-component/sv-dialog/index.vue"
import Vue from 'vue'

SvDialog.warning = (message, title, config = {
  visible: false,
  showCancelButton: false,
  showClose: false
}) => {
  let instance = null
  
  function render() {
    return new Vue({
      el: document.createElement('div'),
      components: {
        SvDialog
      },
      data() {
        return {
          props: {...config},
          on: {
            close: this.close,
            stop:() => {
              this.$destroy()
            }
          }
        }
      },
      mounted() {
        this.$nextTick(() => this.props.visible = true)
      },
      methods: {
        close() {
          this.props.visible = false
        }
      },
      render() {
        const iconfontStyle = {
          fontSize: '22px',
          color: '#faad14',
          marginRight: '10px'
        }
        const titleStyle = {
          display: 'flex',
          alignItems: 'center'
        }
        const contentStyle = {
          fontSize: '13px'
        }
    
        return (
          <sv-dialog {...{props: {...this.props}, on: {...this.on}}} class="alert">
            <div slot="title" style={titleStyle}>
              <i class="iconfont sv-tixing" style={iconfontStyle}></i>
              {title}
            </div>
            <div slot="content" style={contentStyle}>{ message }</div>
          </sv-dialog>
        )
      }
    })
  }
  
  instance = render()
  
  return {
    destroy: instance.$destroy
  }
}

export default SvDialog
