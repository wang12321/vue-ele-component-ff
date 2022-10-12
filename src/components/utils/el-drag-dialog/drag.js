
export default {
  bind(el, binding, vnode) {

    if (!binding.value) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      const dragDom = el.querySelector('.el-dialog')
      dialogHeaderEl.style.cssText += ';cursor:move;'
      dragDom.style.cssText += ';top:0px;'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const getStyle = (function() {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr]
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr]
        }
      })()

      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        const dragDomWidth = dragDom.offsetWidth
        const dragDomHeight = dragDom.offsetHeight

        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

        // 获取到的值带px 正则匹配替换
        let styL = getStyle(dragDom, 'left')
        let styT = getStyle(dragDom, 'top')

        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
        } else {
          styL = +styL.replace(/\px/g, '')
          styT = +styT.replace(/\px/g, '')
        }

        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY

          // 边界处理
          if (-(left) > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-(top) > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

          // emit onDrag event
          // vnode.child.$emit('dragDialog')
        }

        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    } else {
      // 弹框可拉伸最小宽高
      const minWidth = 400
      const minHeight = 300
      // 初始非全屏
      let isFullScreen = false
      // 当前宽高
      let nowWidth = 0
      // eslint-disable-next-line no-unused-vars
      let nowHight = 0
      // 当前顶部高度
      let nowMarginTop = 0
      // 获取弹框头部（这部分可双击全屏）
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      let hasSetBodyHight = false
      // 弹窗
      const dragDom = el.querySelector('.el-dialog')
      // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
      // dragDom.style.overflow = "auto";
      // 清除选择头部文字效果
      dialogHeaderEl.onselectstart = new Function('return false')
      // 头部加上可拖动cursor
      dialogHeaderEl.style.cursor = 'move'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

      // 头部插入最大化最小化元素
      const maxMin = document.createElement('button')
      maxMin.className += ' el-dialog__headerbtn el-dialog__minmax'
      maxMin.style.right = '40px'
      maxMin.style.color = '#909399'
      maxMin.title = '最大化'
      maxMin.innerHTML = '<i class="el-icon-full-screen" onMouseOver="this.style.color=\'#409EFF\'" onMouseOut="this.style.color=\'inherit\'"></i>'
      dialogHeaderEl.insertBefore(maxMin, dialogHeaderEl.childNodes[1])
      const moveDown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
        // 获取到的值带px 正则匹配替换
        let styL, styT

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
          styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
        } else {
          styL = +sty.left.replace(/\px/g, '')
          styT = +sty.top.replace(/\px/g, '')
        }

        // 鼠标按下，计算当前元素距离可视区的距离
        const dragDomWidth = dragDom.offsetWidth
        const dragDomHeight = dragDom.offsetHeight

        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          let l = e.clientX - disX
          let t = e.clientY - disY

          // 边界处理
          if (-(l) > minDragDomLeft) {
            l = -minDragDomLeft
          } else if (l > maxDragDomLeft) {
            l = maxDragDomLeft
          }

          if (-(t) > minDragDomTop) {
            t = -minDragDomTop
          } else if (t > maxDragDomTop) {
            t = maxDragDomTop
          }

          // 移动当前元素
          if((t + styT) < 0  &&  Math.abs(t + styT) > window.screen.availHeight * 0.15){
            dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${-(window.screen.availHeight * 0.15 -20)}px`
          }else {
            dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${t + styT}px`
          }

          // 将此时的位置传出去
          // binding.value({x:e.pageX,y:e.pageY})
        }

        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
      dialogHeaderEl.onmousedown = moveDown
      // eslint-disable-next-line no-unused-vars
      let bodyHeight = 'auto'
      // eslint-disable-next-line no-inner-declarations
      function setMaxMin() {
        if (isFullScreen == false) {
          const i = maxMin.querySelector('.el-icon-full-screen')
          i.classList.remove('el-icon-full-screen')
          i.classList.add('el-icon-crop')
          maxMin.title = '还原'
          bodyHeight = dragDom.querySelector('.el-dialog__body').offsetHeight + 'px'
          nowHight = dragDom.clientHeight
          nowWidth = dragDom.clientWidth
          nowMarginTop = dragDom.style.marginTop
          dragDom.style.left = 0
          dragDom.style.top = 0
          dragDom.style.height = '100VH'
          dragDom.style.width = '100VW'
          dragDom.style.marginTop = 0
          isFullScreen = true
          dialogHeaderEl.style.cursor = 'initial'
          dialogHeaderEl.onmousedown = null
          if (!hasSetBodyHight) {
            // dragDom.querySelector('.el-dialog__body').style.height = 'calc(100% - ' + (dialogHeaderEl.offsetHeight+140) + 'px)'
            hasSetBodyHight = true
          }
          vnode.child.$emit('dragDialog', isFullScreen)
        } else {
          const i = maxMin.querySelector('.el-icon-crop')
          i.classList.remove('el-icon-crop')
          i.classList.add('el-icon-full-screen')
          maxMin.innerHTML = '<i class="el-icon-full-screen"></i>'
          maxMin.title = '最大化'
          dragDom.style.height = 'auto'
          dragDom.style.width = nowWidth + 'px'
          dragDom.style.marginTop = nowMarginTop
          isFullScreen = false
          dialogHeaderEl.style.cursor = 'move'
          dialogHeaderEl.onmousedown = moveDown
          // dragDom.querySelector('.el-dialog__body').style.height = 'calc(100vh - 230px)'
          hasSetBodyHight = false
          vnode.child.$emit('dragDialog', isFullScreen)
        }
      }
      // 点击放大缩小效果
      maxMin.onclick = setMaxMin
      // 双击头部效果
      dialogHeaderEl.ondblclick = setMaxMin

      // 拉伸
      const resizeEl = document.createElement('div')
      dragDom.appendChild(resizeEl)
      // 在弹窗右下角加上一个10-10px的控制块
      resizeEl.style.cursor = 'se-resize'
      resizeEl.style.position = 'absolute'
      resizeEl.style.height = '10px'
      resizeEl.style.width = '10px'
      resizeEl.style.right = '0px'
      resizeEl.style.bottom = '0px'
      // 鼠标拉伸弹窗
      resizeEl.onmousedown = (e) => {
        // 记录初始x位置
        const clientX = e.clientX
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - resizeEl.offsetLeft
        const disY = e.clientY - resizeEl.offsetTop
        document.onmousemove = function(e) {
          e.preventDefault() // 移动时禁用默认事件
          // 通过事件委托，计算移动的距离
          const x = e.clientX - disX + (e.clientX - clientX)// 这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
          const y = e.clientY - disY
          // 比较是否小于最小宽高
          dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px'
          dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px'
          if (!hasSetBodyHight) {
            // dragDom.querySelector('.el-dialog__body').style.height = 'calc(100% - ' + dialogHeaderEl.offsetHeight + 'px)'
            hasSetBodyHight = true
          }
          vnode.child.$emit('dragDialog')
        }
        // 拉伸结束
        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
}
