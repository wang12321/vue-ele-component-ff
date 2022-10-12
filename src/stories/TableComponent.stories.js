import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import Table from '../components/common/TableComponent/index.js';

const componentName = Table.name

export default {
    title: 'Table/TableComponent',
    component: Table,
    argTypes:{
        // props
        tableData:{description:'表格数据' },
        tableColumn:{description:'表头配置' },
        operates:{description:'操作按钮配置' },
        options:{description:'表格配置项' },
        // tableColumn
        label: {
            description: '列名称',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'string'}
        },
        props: {
            description: '列属性名',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'string'}
        },
        align: {
            description: '列对齐方式',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'string'}
        },
        width: {
            description: '列宽',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'string'}
        },
        slot: {
            description: '具名插槽,可自定义某一列的数据',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: 'slot:button' },
            },
            control: { type: 'string'}
        },

        formatter: {
            description: '对列表数据进行格式化，并把当前的row数据，和column数据返回给function中 (jsx))',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'function'}
        },
        render: {
            description: '对列表扩充展示，可以增加dom元素 (h函数)',
            table: {
                category: 'tableColumn',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'function'}
        },
        // operates
        list: {
            description: '按钮组',
            table: {
                category: 'operates',
                type: {
                    summary: 'array',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'array'}
        },
        height: {
            description: '一行模式下的行高度',
            table: {
                category: 'operates',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'boolean'}
        },
        isButton: {
            description: '是否文本时按钮格式',
            table: {
                category: 'operates',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'boolean'}
        },
        // isInline: {
        //     description: '是否一行显示 默认多行',
        //     table: {
        //         category: 'operates',
        //         type: {
        //             summary: 'boolean',
        //         },
        //         defaultValue: { summary: '' },
        //     },
        //     control: { type: 'boolean'}
        // },
        fixed: {
            description: '是否固定,可以填left和right',
            table: {
                category: 'operates',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'boolean'}
        },
        ':width': {
            description: '列宽',
            table: {
                category: 'operates',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'string'}
        },
        // operates-list

        ':type': {
            description: '显示提示类型：delete popconfirm dropdown',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: 'delete | popconfirm | dropdown' },
            },
            control: { type: 'string'}
        },
        icon: {
            description: '按钮图标',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: 'primary|success|warning|danger|info|text' },
            },
            control: { type: 'string'}
        },
        btnType: {
            description: '类型',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: 'primary|success|warning|danger|info|text' },
            },
            control: { type: 'string'}
        },
        show: {
            description: '是否显示',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean'}
        },
        ':lable': {
            description: '文本',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'string'}
        },
        method: {
            description: '回调方法',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'function'}
        },
        filter: {
            description: '过滤方法，根据每一行数据定义过滤条件',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'function'}
        },
        dropdownList: {
            description: '子集按钮组。下拉菜单',
            table: {
                category: 'operates-list',
                type: {
                    summary: 'Array',
                },
                defaultValue: { summary: '[{\n' +
                        '              name: \'更多1\',\n' +
                        '              method: (index, row) => {\n' +
                        '                console.log(index, row)\n' +
                        '                alert(\'更多1\')\n' +
                        '              }\n' +
                        '            }]' },
            },
            control: { type: 'string'}
        },


        // options
        loading: {
            description: '是否正在加载',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean'}
        },
        border: {
            description: '是否带有纵向边框',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean'}
        },
        stripe: {
            description: '是否为斑马纹 table',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean'}
        },
        fit: {
            description: '列的宽度是否自撑开',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean'}
        },
        showHeader: {
            description: '是否显示表头',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean'}
        },
        highlightCurrentRow: {
            description: '是否要高亮当前行',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean'}
        },
        mutiSelect: {
            description: '是否多项选择',
            table: {
                category: 'options',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean'}
        },

        //events
        sortchange:{
            description:'排序事件',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'sortchange'
        },
        handleSelectionChange:{
            description:'多行选中事件',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'handleSelectionChange'
        },

        slots:{
            description: '自定义插槽',
        }
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: Table },
    template: '<'+ componentName +'\n' +
        '        :table-data="tableData"\n' +
        '        :table-column="tableColumn"\n' +
        '        :options="options"\n' +
        '        :operates="operates"\n' +
        '        @handleSelectionChange="handleSelectionChange"\n' +
        '        @sortchange="sortchange"\n' +
        '      />',
});

export const TableComponent = Template.bind({});
TableComponent.args={
    tableData:[{
        tzmc:'游戏',
        lrsj:'2020-02-02',
        xgsj:'2020-03-03',
        gxlx:'全平台'
    }],
    tableColumn: [
        {
            label: '名称',
            prop: 'tzmc',
            align: 'left'
        }, {
            label: '权限',
            prop: 'gxlx',
            align: 'left',
            formatter:(row,column)=>{
                console.log(row,column)
                return `<span style="color: dodgerblue;">${row.gxlx}</span>`
            },
        }, {
            label: '创建时间',
            prop: 'lrsj'
        }, {
            label: '更新时间',
            prop: 'xgsj'
        }
    ],
    options: {
        loading: false,
        border: false,
        className: 'table-class'
    },
    operates: {
        isButton:false,
        label: '操作',
        list: [
            {
                label: '查看',
                show: true,
                btnType: 'primary',
                plain: true,
                method: (index, row) => {
                    console.log(index, row)
                }
            },
            {
                label: '编辑',
                show: true,
                btnType: 'danger',
                plain: true,
                method: (index, row) => {
                    console.log(index, row)
                }
            },
            {
                label: '都否删除当前数据?',
                show: true,
                type: 'delete',
                plain: true,
                method: (index, row) => {
                    console.log(index, row)
                }
            },
        ]
    },
}
