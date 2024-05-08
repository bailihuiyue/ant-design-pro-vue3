import { isDev } from '@/utils/util'

export default {
  mounted(el: HTMLElement, binding, vnode, prevVnode) {
    let distance = 0
    // 开发模式高度直接定位450,防止影响开发
    if (isDev) {
      distance = 470
    } else {
      // restBottomHeight 剩余底部留出的高度
      const restBottomHeight = 120
      // 视口高度
      let clientHeight =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      // tableRef
      // 得到table表格距离视口顶部高度
      let domToTop = el.getBoundingClientRect().top
      // 剩余底部留出的高度和其他高度总和
      // 用视口高度-表格距离视口高度-restBottomHeight得到一个动态表格最大高度值（用以固定表头，使表格内容超出可滚动）
      distance = Math.ceil(clientHeight) - Math.ceil(domToTop) - restBottomHeight
    }

    if (vnode.ctx.props.hasOwnProperty('height')) {
      vnode.ctx.props.height = distance
    } else {
      el.style.height = distance + 'px'
      el.style.overflow = 'auto'
    }
  }
}

export const calcHeight = (el, restBottomHeight = 15) => {
  let clientHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  let domToTop = el.getBoundingClientRect().bottom
  return Math.ceil(clientHeight) - Math.ceil(domToTop) - restBottomHeight
}
