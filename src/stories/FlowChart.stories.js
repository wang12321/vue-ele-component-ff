import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import FlowChart from '../components/common/FlowChart/index.js';

const componentName = FlowChart.name

export default {
    title: 'FlowChart/FlowChart',
    component: FlowChart,
    argTypes:{
        convertData:{description:'数据是数组格式，并且只能包含一个根节点' },
        direction:{
            description:'流程图的方向,默认向右',
            control: { type: 'select',options:['Right','Left','Top','Bottom']}
        },
        bgColor:{description:'节点颜色' },
        fontSize:{description:'节点字体大小,默认14px'},
        content:{description:'内容对齐，默认居中，只对左右方向有用， 左中右对齐',
            control: { type: 'select',options:['Right','Left','center']}
        },
        width:{description:'节点宽度，默认100px' },
        nodekKey:{description:'节点支持的key,默认是name。如果后台返回的数据不是name,可以设置nodekKey' },
        directionKey:{description:'节点描述支持的key,默认是text。如果后台返回的数据不是text,可以设置nodekKey' },

        nodehide: {
            description: '是否隐藏跟节点',
            table: {
                category: 'convertData',
                type: {
                    summary: 'boolean',
                },
            }
        },
        linehide: {
            description: '是否隐藏跟节点的连线',
            table: {
                category: 'convertData',
                type: {
                    summary: 'boolean',
                },
            }
        },
        description: {
            description: '节点下的附属说明',
            table: {
                category: 'convertData',
                type: {
                    summary: '{text:"节点说明"}',
                },
            }
        },
        borderBottomColor: {
            description: 'description节点下的分割线颜色',
            table: {
                category: 'convertData--description',
                type: {
                    summary: '默认#e1e1e1',
                },
            }
        },
        textColor: {
            description: '节点字体颜色',
            table: {
                category: 'convertData',
                type: {
                    summary: '默认#333 节点说明#666',
                },
            }
        },
        click: {
            description: '节点的点击事件',
            table: {
                category: 'convertData',
                type: {
                    summary: 'click:this.click',
                },
            }
        },

        '说明': {
            description: '组件的传值属性，在convertData--description数据中支持（direction，bgColor，fontSize，textColor）',
            table: {
                category: 'convertData--description',
                type: {
                    summary: 'boolean',
                },
            }
        },
        '说明2': {
            description: '组件的传值属性，在convertData数据中支持（direction，bgColor，fontSize，textColor）',
            table: {
                category: 'convertData',
                type: {
                    summary: 'boolean',
                },
            }
        },

    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: FlowChart },
    template: '<'+ componentName +' :convertData="convertData"  direction="Right"/>',
});

export const flowchart = Template.bind({});
flowchart.args={
    convertData: [
        {
            name: '节点1',
            // nodehide: true,
            linehide: true,
            children: [
                {name: '节点2',children: [
                        {name: '节点3'},
                        {name: '节点3'},
                        {name: '节点3'},
                        {name: '节点3'}
                    ]}
            ]
        }
    ]
}
