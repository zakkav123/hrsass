import PageTools from './PageTools/index.vue'
import UpdataExcel from './UpdataExcel'

export default {
  install(vue) {
    vue.component('PageTools', PageTools)
    vue.component('UpdataExcel', UpdataExcel)
  }
}
