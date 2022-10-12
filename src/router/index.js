import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'
import { routerName, routerIcon } from './routerName'

Vue.use(VueRouter)

// 解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

// const NotFind = (resolve) => {
//     import('@/components/NotFind').then((module) => {
//         resolve(module);
//     });
// };

// 实现自动生成路由配置文件======================================
// 懒加载
const requireAllVueComponents = require.context('../components/autoRouter', true, /\.vue$/, 'lazy');
const routerList = [];

requireAllVueComponents.keys().forEach((allVueComponentItem) => {
    const completeName = allVueComponentItem.match(/\w+\.vue$/, '')[0];
    const routerObj = {};
    routerObj.path = '/'+allVueComponentItem.replace(/\./, 'autoRouter').replace(/.vue$/, '')
    routerObj.name = completeName.replace(/.vue$/, '');
    routerObj.component = () => requireAllVueComponents(allVueComponentItem).default || requireAllVueComponents(allVueComponentItem)

    //router 子路径
    const routerChildren = {
        path:'',
        component:  routerObj.component,
        name: routerObj.name,
        meta: {
            title: '',
            icon: ''
        }
    };

    //router 路径
    const router = {
        path: '',
        component: Layout,
        meta: {
            title: '',
            icon: '',
            roles: ['admin'] // you can set roles in root nav
        },
        children: []
    }

    let routerArr = routerObj.path.split('/');
    let bj = true
    switch (routerArr.length){
        case 3:
            // 当路由不是嵌套路径时 直接push到routerList中
            router.path = routerObj.path;
            router.meta.icon = (routerIcon[routerObj.name] && routerIcon[routerObj.name] !== '')? routerIcon[routerObj.name] :'component';
            router.children.push(routerChildren)
            routerChildren.meta.title = (routerName[routerObj.name] && routerName[routerObj.name] !== '')?routerName[routerObj.name] : routerObj.name;
            routerList.push(router)
            break
        case 4:
            // 当路由是嵌套路径时，如果routerList中包含改路径，则在children中加入子路径，否则在routerList中push。
            router.path = '/'+routerArr[1]+'/'+routerArr[2] ;
            router.name = routerArr[2] + "p";
            router.meta.icon = (routerIcon[routerArr[2]] && routerIcon[routerArr[2]] !== '')?routerIcon[routerArr[2]] :'component';
            router.meta.title = (routerName[routerArr[2]]&& routerName[routerArr[2]].title !== '')?routerName[routerArr[2]] : routerArr[2];
            routerList.forEach(item=>{
                routerChildren.path = '/'+routerArr[3];
                routerChildren.meta.icon = (routerIcon[routerObj.name] && routerIcon[routerObj.name] !== '')? routerIcon[routerObj.name] :'';
                routerChildren.meta.title = (routerName[routerObj.name] && routerName[routerObj.name] !== '')?routerName[routerObj.name] : routerObj.name;
                if(routerArr[2] + "p"  === item.name) {
                    item.children.push(routerChildren)
                    bj = false
                }
            })
            if(bj){
                router.children.push(routerChildren)
                routerList.push(router)
            }
            break
    }
})

export const constantRoutes = [
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
    ...routerList,
    // {
    //     path: '*',
    //     name: 'NotFind',
    //     component: NotFind,
    // },
];

const router = new VueRouter({
  routes:constantRoutes
})

export default router
