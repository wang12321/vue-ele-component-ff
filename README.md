
# vue-ele-component-ff
# 一、简介
封装了管理后台常用的一些组件并采用storybook作为文档管理工具；

![https://www.npmjs.com/package/vue-ele-component-ff](https://img.shields.io/npm/v/vue-ele-component-ff)
![https://www.npmjs.com/package/vue-ele-component-ff](https://img.shields.io/npm/dt/vue-ele-component-ff)
![https://www.npmjs.com/package/vue-ele-component-ff](https://img.shields.io/badge/maintained%20with-storybook-cc00ff.svg)



# 二、部分组件功能说明
1、date-picker-has-ops 组件
```html
       
            <li>选择单个日期或日期区间</li>
            <li>支持多种常用快捷，如‘上线至今、本年、去年’</li>
            <li>支持原有基础的所有属性和事件</li>
       
```
2、date-picker-limit 组件

```html
       
            <li>支持指定的日期间隔天数 dateIntervalMax ，超过该间隔的日期区间将不可选择</li>
            <li>支持常用快捷</li>
            <li>支持原有基础的所有属性和事件</li>
      
```
3、dialog-with-btn 组件

```html
       
            <li>在原有dialog基础上底部增加‘确定’和‘取消’按钮</li>
            <li>支持dialog所有属性和事件</li>
       
```
4、table-page 组件

```html
          
                <li>在原有基础上增加分页组件(分页组件可选)</li>
                <li>支持table及pagination所有属性和事件</li>
                <li>支持某一列累计，某一列计算平均值</li>
                <li>具体用法 请见前端优化交付说明第五点 </li>
          
```
5、其他组件详见 `三、查看所有组件使用文档(可实时编辑组件)`

# 三、查看所有组件使用文档(支持实时编辑组件)
见前端项目汇总中的网址(网址提示 http://test.vue-ele-sb.xxxxxx) 或者在本项目运行指令`npm run storybook`

# 四、查看组件样例
见前端项目汇总中的网址(网址提示 http://test.vue-ele.xxxxxx) 或者在本项目运行指令`npm run dev`



# 五、如何使用该npm包
使用步骤:

### (一)、安装  `npm i vue-ele-component-ff`

### (二)、引入npm包

#### 1、按需引用的步骤

 1.1、安装 `babel-plugin-import`  https://www.npmjs.com/package/babel-plugin-import
```
npm install babel-plugin-import --save-dev
```
 1.2、配置 .babelrc 或babel-loader 或babel.config.js
 ```javascript
module.exports = {
  plugins:[
    ["import",
      {
        "libraryName": "vue-ele-component-ff",
        "libraryDirectory":"lib",
        "camel2DashComponentName": false,
      }
    ]
  ]

}
```
 1.3、main.js文件 中按需引入
 ```javascript
 import Vue from 'vue'
 import ElementUI from 'element-ui';
 import 'element-ui/lib/theme-chalk/index.css';
 // 引入 vue-ele-component-ff  css文件(如果后续css文件越来越大 将支持自动按需引入对应的css) 
import 'vue-ele-component-ff/lib/index/style/index.css'
 // 按需引入  vue-ele-component-ff 组件
import { DialogWithBtn } from 'vue-ele-component-ff';
 import App from './App.vue'
 Vue.config.productionTip = false
 // 在ElementUI后调用 vue-ele-component-ff 按需引入的组件
 Vue.use(ElementUI).use(DialogWithBtn);
 
 
 new Vue({
   render: h => h(App),
 }).$mount('#app')
 
 ```


#### 2、完整引用的步骤

main.js文件
```javascript
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 vue-ele-component-ff css
import 'vue-ele-component-ff/lib/index/style/index.css'
// 全部引入 vue-ele-component-ff js
import VueEleComponentFF from 'vue-ele-component-ff'
import App from './App.vue'
Vue.config.productionTip = false
// 在ElementUI后调用
Vue.use(ElementUI).use(VueEleComponentFF);




new Vue({
  render: h => h(App),
}).$mount('#app')

```



# 六、如何维护该项目


#### 0、本项目npm 指令说明
a、npm run dev  启动样例项目

b、npm run storybook 启动storybook查看文档等

c、npm run build:dist 打包样例项目生成静态文件

d、npm run build:npm 生成npm包

e、npm run build:storybook 打包storybook生成静态文件

#### 1、目录介绍

vue-element-component

├─src

|  ├─views                          界面架构文件（layout）

|  ├─stories                        组件生成文档文件

|  ├─router    

|  |   ├─index.js                    路由文件

|  |   └routerName.js            路由菜单配置中文文件

|  ├─components

|  |     ├─common                组件文件

|  |     ├─autoRouter            dev运行路由文件

├─.storybook                     storybook 配置文件


#### 2、运行项目示例界面   npm run  dev
![截屏2021-04-21 上午9.33.43.png](https://upload-images.jianshu.io/upload_images/26056473-19250f8a72061de8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.1、组件写在common文件中
需要注意的是：
a、 .vue文件名不要用index.vue,因为在写单元测试的时候，覆盖率测试会检测不到，建议和文件目录名一样。
b、在每个组件下面写index.js文件，npm打包需要用到

#### 2.2、 组件的示例(展示)界面写在autoRouter文件中
2.2.1、路由是根据autoRouter文件自动生成的，目前支持一级路由和二级路由。一级路由直接在autoRouter下建立.vue，二级路由需要在autoRouter下建文件目录。

eg:
![截屏2021-04-21 上午9.46.48.png](https://upload-images.jianshu.io/upload_images/26056473-cef02d6f82029d3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

生成路由的格式如下
```
{
        path: '/',
        component: Layout,
        redirect: '',
        children: [
            {
                path: 'dashboard',
                component: () => import('../components/Home.vue'),
                name: 'Dashboard',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
```

路由路径根据autoRouter文件目录来解析

2.2.2、左侧菜单是根据路由来生成的。左侧菜单显示的名称就是解析autoRouter文件目录得来的。
如果是一级路由，显示的就是组件的名称。
如果是二级路由，父菜单名称对应的是组件在autoRouter目录下的文件夹名称。子菜单是组件的名称。

2.2.3、 配置左侧菜单名称和icon
左侧菜单显示想自定义名称，可以在router/routerName.js文件中配置，

```
export const routerName = {
    TablePageExample:'Table 合计',
    Date:'日期组件'
}
说明：TablePageExample：是组件的名称
Date:是组件所在的目录文件夹名称

```
自定义图标

```
export const routerIcon = {
    TablePageExample:'form',
    Date:'form'
}
```
默认是一级路由显示icon(component),二级路由不显示icon。

icon可以是svg图片 ，项目已经支持了svg图片格式，具体配置在vue.config.js里面。icon也可以是element-ui 的icon
```
chainWebpack(config) {
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/views/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/views/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  }
```

#### 2.3、views 文件

该文件下的内容是构建运行界面的Layout。包含了左侧菜单，顶部头导航，主内容展示。如果只需要写组件测试，生成文档，这个文件可以不需要改动。


#### 3、运行项目文档 npm run  storybook
![截屏2021-04-21 上午10.37.55.png](https://upload-images.jianshu.io/upload_images/26056473-02aa17d8994a63a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3.1、文档支持scss配置
```
npm install sass-loader
```
在.storybook/main.js文件下配置
```
// 配置scss
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
```

#### 3.2、配置storybook 左侧菜单以文件夹的形式展示
在.storybook/manager.js 下配置
```
import { addons } from '@storybook/addons';
addons.setConfig({
    sidebar: {
        showRoots: false,
    },
});
```

#### 3.3、组件生成文档
需要在stories文件下写对应的组件.stories.js 文件
3.3.1、属性介绍，可以快速上手，可查看[storybook官网](https://storybook.js.org/docs/vue/get-started/introduction)
常用属性：
title：对应左侧菜单
component：组件本身
argTypes：对应props 和 events 属性名称 （需要保持一致）

如果需要配置formList里面的属性，需要在table中配置category：formList。
这时候doc界面展示就会分组
![截屏2021-04-21 上午11.00.33.png](https://upload-images.jianshu.io/upload_images/26056473-fda1e72e02b0355f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
    argTypes:{
        // props
        formList:{
             description:'表单项，具体配置参数看formList'
       },
        //formList
        title: {
            type:{required: true}, // 校验参数是否必填项（*）
            description: '表单项label',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'text'}
        },
       //events
        submit:{
            description:'表单提交',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'submitAction'
        },
}

```

args：设置参数数据(有些组件需要必传一些props,需要用到args)

```
dialog_form.args={
    rules: {
        name:REQUIRED('请输入昵称')
    },
    formData: {
    },
    formList: [
        { title: '昵称', key: 'name', type: 'input' ,clearable:true},
    ]
}
```
Template.bind({}):复制功能技术

#### 4、在本项目上测试本npm插件

 4.1 使用本地未打包的
```javascript
// eslint-disable-next-line
import plugins from '@/components/common/index.js'
Vue.use(ElementUI).use(plugins);
// 设置对话框可拖拽
Vue.directive('elDragDialog', plugins.elDragDialog)
```


 4.2 使用本地打包后的
 ```javascript
//  eslint-disable-next-line
import  VueEleComponentFF from '../lib/index/index'
import '../lib/index/style/index.css';

Vue.use(ElementUI).use(VueEleComponentFF)
// 设置对话框可拖拽
Vue.directive('elDragDialog', VueEleComponentFF.elDragDialog)
```

 4.3 使用`npm link`方法






