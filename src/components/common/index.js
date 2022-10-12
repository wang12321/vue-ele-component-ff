// import DatePickerHasOps from './DatePickerHasOps/DatePickerHasOps'
// import DatePickerLimit from './DatePickerLimit/DatePickerLimit'
// import DialogWithBtn from './DialogWithBtn/DialogWithBtn'
// import TablePage from './TablePage/TablePage'
// const componentArray=[DatePickerHasOps,DatePickerLimit,DialogWithBtn,TablePage]
import elDragDialog from "@/components/utils/el-drag-dialog";

let plugins={ elDragDialog };
const componentArray=[];
// 自动引入 https://webpack.js.org/api/module-methods/#requirecontext
const requireAllVueComponents = require.context('.', true, /\.vue$/);

requireAllVueComponents.keys().forEach((allVueComponentItem) => {
    // console.log(allVueComponentItem, 'allVueComponentItem')
    // (function (allVueComponentItem) {
    // const completeName = allVueComponentItem.match(/\w+\.vue$/, '')[0];

    // const routerObj = {};
    // routerObj.path = '/'+allVueComponentItem.replace(/\./, 'autoRouter').replace(/.vue$/, '')
    // routerObj.name = completeName.replace(/.vue$/, '');

    // 一、懒加载的实现
    // routerObj.component = () => requireAllVueComponents(allVueComponentItem).default || requireAllVueComponents(allVueComponentItem)


    // 二、非懒加载--同步的实现
    componentArray.push(requireAllVueComponents(allVueComponentItem).default || requireAllVueComponents(allVueComponentItem))
    // routerObj.component =

    // 三、import 方法 无效
    // routerObj.component = (resolve) => {
    // import里不能是变量 否则报Critical dependency: the request of a dependency is an expression 错误
    //   // import(componentName).then((module) => {
    //   //   resolve(module);
    //   // });
    //   import('../components/autoRouter/supeSign/supeSignn1').then((module) => {
    //     resolve(module);
    //   });
    // }
    // routerList.push(routerObj)

})

plugins.install=function (Vue) {
    // 判断是否安装过
    if(plugins.installed) return;
    plugins.installed=true
    console.log('plugins.installed==========',plugins.installed)
    console.log('componentArray==========',componentArray)
    // 获取地址栏特定搜索串内容
    // Vue.prototype.$getSearchParam=function(name){
    //     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    //     const r = window.location.search.substr(1).match(reg);
    //     if (r != null) {
    //         return decodeURIComponent(r[2]);
    //     }
    //     return '';
    // }

    componentArray.forEach((item)=>{
        Vue.component(item.name,item)
    })

}
// /* 支持使用标签的方式引入 */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue);
// }
// 也可参考 https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html

export default plugins
