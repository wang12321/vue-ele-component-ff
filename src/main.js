import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import App from './App.vue'
//
// 一、使用本地未打包的
// eslint-disable-next-line
import plugins from '@/components/common/index.js'
Vue.use(ElementUI).use(plugins);
Vue.directive('elDragDialog', plugins.elDragDialog)

// // // 二、使用本地打包后的
// //  eslint-disable-next-line
// import  VueEleComponentFF from '../lib/index/index'
// import '../lib/index/style/index.css';
//
// Vue.use(ElementUI).use(VueEleComponentFF)
// // 设置对话框可拖拽
// Vue.directive('elDragDialog', VueEleComponentFF.elDragDialog)



Vue.config.productionTip = false

import './views/styles/element-variables.scss'
import './views/styles/index.scss' // global css

import './permission' // permission control
import './views/icons' // icon

import store from './views/store'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

new Vue({
    router,
    store,
   render: h => h(App),
}).$mount('#app')



