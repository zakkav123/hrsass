// 导出自定义事件
export const imgError = {
  inserted: function (el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}
