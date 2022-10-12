// 全局自动引入组件 组件免手动引入  该文件需要在new Vue 前运行
import Vue from 'vue';

const globalComponent = ['TablePage', 'SearchParame'];

// function upperCaseFirstString(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }


function isGlobalComponent(Component) {
  return globalComponent.indexOf(Component) !== -1
}

const requireComponents = require.context('..', false, /\.vue$/);
// console.error('requireComponents', requireComponents.resolve(requireComponents.keys()[0]))
// console.error('requireComponents', requireComponents.id)

requireComponents.keys().forEach((requireComponentItem) => {
  const componentName = requireComponentItem.replace(/^\.\//g, '').replace(/\.vue/g, '');
  const config = requireComponents(requireComponentItem);
  console.log('封装的组件名',componentName)
  if (isGlobalComponent(componentName)) {
    // console.error('componentName', componentName)
    // console.error('config', config.default)
    Vue.component(componentName, config.default || config)
  }
})

// console.error('requireComponent', requireComponents.keys())
