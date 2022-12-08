import { getComponentRotatedStyle } from '@/utils/style'
export default {
  namespaced:true,
  state: {
    lineStatus: {
      xt: false,
      xc: false,
      xb: false,
      yl: false,
      yc: false,
      yr: false,
    },
    diff: 3, // 相距 dff 像素将自动吸附
  },
  mutations: {
    guideLineBuilder () { },
    chooseTheTureLine (state, needToShow, isDownward, isRightward) {
      // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
      // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
      if (isRightward) {
          if (needToShow.includes('yr')) {
            state.lineStatus.yr = true
          } else if (needToShow.includes('yc')) {
            state.lineStatus.yc = true
          } else if (needToShow.includes('yl')) {
            state.lineStatus.yl = true
          }
      } else {
          // eslint-disable-next-line no-lonely-if
          if (needToShow.includes('yl')) {
            state.lineStatus.yl = true
          } else if (needToShow.includes('yc')) {
            state.lineStatus.yc = true
          } else if (needToShow.includes('yr')) {
            state.lineStatus.yr = true
          }
      }

      if (isDownward) {
          if (needToShow.includes('xb')) {
            state.lineStatus.xb = true
          } else if (needToShow.includes('xc')) {
            state.lineStatus.xc = true
          } else if (needToShow.includes('xt')) {
            state.lineStatus.xt = true
          }
      } else {
          // eslint-disable-next-line no-lonely-if
          if (needToShow.includes('xt')) {
            state.lineStatus.xt = true
          } else if (needToShow.includes('xc')) {
            state.lineStatus.xc = true
          } else if (needToShow.includes('xb')) {
            state.lineStatus.xb = true
          }
      }
    },
    CHANGEMARKLINESTATUS (state,{ line, status }) {
      state.lineStatus[line]  = status
    }
  },
  actions: {
    guideLineBuilder ({ commit, rootState, state }) {
      //获取当前激活的组件
      const curComponent = rootState.curComponent
      //获取当前画布内的所有组件
      const componentData = rootState.componentData
      const curComponentStyle = getComponentRotatedStyle(curComponent.style)
      const curComponentHalfwidth = curComponentStyle.width / 2
      const curComponentHalfHeight = curComponentStyle.height / 2
      componentData.forEach(component => {
        if (component == curComponent) return
        const componentStyle = getComponentRotatedStyle(component.style)
        const { left, right, top, bottom } = componentStyle
        const componentHalfwidth = componentStyle.width / 2
        const componentHalfHeight = componentStyle.height / 2
        const conditions = {
          top: [
            {
              isNearBy: isNearBy(curComponentStyle.top, top,state),
              lineName: 'xt',
              lineNode: '',
              dragPosition: top,
              linePosition: top,
            },
            {
              isNearBy: isNearBy(curComponentStyle.top, bottom,state),
              lineName: 'xt',
              lineNode: '',
              dragPosition: bottom,
              linePosition: bottom,
            },
            {
              isNearBy: isNearBy(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight,state),
              lineName: 'xc',
              lineNode: '',
              dragPosition: top + componentHalfHeight - curComponentHalfHeight,
              linePosition: top + componentHalfHeight,
            },
            {
              isNearBy: isNearBy(curComponentStyle.top,bottom,state ),
              lineName: 'xb',
              lineNode: '',
              dragPosition: bottom ,
              linePosition: bottom,
            },
            {
              isNearBy: isNearBy(curComponentStyle.bottom, bottom,state),
              lineName: 'xb',
              lineNode: '',
              dragPosition: bottom - curComponentStyle.height,
              linePosition: bottom,
            },
          ],
          left: [
            {
              isNearly: isNearBy(curComponentStyle.left, left,state),
              lineNode: '', // yl
              line: 'yl',
              dragShift: left,
              lineShift: left,
          },
          {
              isNearly: isNearBy(curComponentStyle.right, left,state),
              lineNode: '', // yl
              line: 'yl',
              dragShift: left - curComponentStyle.width,
              lineShift: left,
          },
          {
              // 组件与拖拽节点的中间是否对齐
              isNearly: isNearBy(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth,state),
              lineNode: '', // yc
              line: 'yc',
              dragShift: left + componentHalfwidth - curComponentHalfwidth,
              lineShift: left + componentHalfwidth,
          },
          {
              isNearly: isNearBy(curComponentStyle.left, right,state),
              lineNode: '', // yr
              line: 'yr',
              dragShift: right,
              lineShift: right,
          },
          {
              isNearly: isNearBy(curComponentStyle.right, right,state),
              lineNode: '', // yr
              line: 'yr',
              dragShift: right - curComponentStyle.width,
              lineShift: right,
          },
          ]
        }
        const showLinesArr = []
        Object.keys(conditions).forEach(key => { 
          conditions[key].forEach(condition => { 
            if (!condition.isNearBy) return
            showLinesArr.push(condition.lineName)
          })
        })
        console.log(showLinesArr);
        commit('chooseTheTureLine',showLinesArr,true,false)
      })
      commit('guideLineBuilder')
    },
    changeMarkLineStatus ({ commit }, { line, status }) {
      console.log(31233);
      commit('CHANGEMARKLINESTATUS',{ line, status })
    }
  }
}
function isNearBy (dragValue, targetValue,state) { 
  return Math.abs(dragValue - targetValue) <= state.diff
}