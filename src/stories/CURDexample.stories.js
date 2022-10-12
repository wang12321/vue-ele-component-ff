import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import CURDexample from '../components/common/CURDexample/index';

const componentName = CURDexample.name

export default {
    title: 'Curdexample/Curdexample',
    component: CURDexample,
    argTypes:{
        search:{description:'表单项，配置是否需要在搜索组件中展示' },
        add:{description:'表单项，配置是否需要在新增编辑组件中展示' },
        rules:{description:'表单项，配置是否需要在新增编辑组件中展示必填' },

        tableData:{description:'表格数据' },
        tableColumn:{description:'表头配置' },
        operates:{description:'操作按钮配置' },
        options:{description:'表格配置项' },
        pageData:{ control: { type: 'object'},description:'分页数据' },
        formData:{description:'表单数据存储对象' },
        isAdvanced:{description:'是否开启高级搜索，默认关闭' },
        dialogFormData:{description:'新增编辑表单存储对象' },
        formlist:{description:'表单项，具体配置参数看formList' },
        spanToView:{description:'查看详情列数' },
        AddShow:{description:'是否需要新增按钮' },
        optionsShow:{description:'是否需要操作栏' },
        spanForm:{description:'表单项列数' },
        dialogWidthAdd:{description:'新增dialog宽度' },
        dialogWidthEdit:{description:'编辑dialog宽度' },
        dialogWidthToView:{description:'查看dialog宽度' },
        //events
        searchSubmit:{
            description:'查询表单提交',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'searchSubmitAction'
        },
        sortchange:{
            description:'排序方法',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'sortchangeAction'
        },
        submitAdd:{
            description:'新增表单提交',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'submitAddAction'
        },
        submitEdit:{
            description:'编辑表单提交',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'submitEditAction'
        },
        reloadData:{
            description:'分页方法',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'reloadDataAction'
        },
        deleteData:{
            description:'删除方法',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'deleteDataAction'
        },



    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: CURDexample },
    template: '<'+ componentName +'\n' +
        '      :tableColumn="tableColumn"\n' +
        '      :tableData="tableData"\n' +
        '      :formlist="formlist"\n' +
        '      :formData="formData"\n' +
        '      :dialogFormData="dialogFormData"\n' +
        '      :isAdvanced="isAdvanced"\n' +
        '      :pageData="pageData"\n' +
        '      :spanToView="spanToView"\n' +
        '      :spanForm="spanForm"\n' +
        '      :AddShow="AddShow"\n' +
        '      :optionsShow="optionsShow"\n' +
        '      :dialogWidthAdd="dialogWidthAdd"\n' +
        '      :dialogWidthEdit="dialogWidthEdit"\n' +
        '      :dialogWidthToView="dialogWidthToView"\n' +
        '      @searchSubmit="searchSubmit"\n' +
        '      @sortchange="sortchange"\n' +
        '      @submitAdd="submitAdd"\n' +
        '      @submitEdit="submitEdit"\n' +
        '      @reloadData="reloadData"\n' +
        '      @deleteData="deleteData"\n' +
        '  ></'+ componentName +'>',
});

export const curdexample = Template.bind({});
curdexample.args={
    pageData:{total: 100, page: 1, rows: 20 },
    isAdvanced:true,
    spanToView:12,
    spanForm:24,
    optionsShow:true,
    AddShow:false,
    dialogWidthAdd:'50%',
    dialogWidthEdit:'50%',
    dialogWidthToView:'60%',
    formData:{},
    dialogFormData:{},
    formlist:[
        {search:true,titleShow:true, clearable:true, title: '年份', key: 'year', type: 'year' },
        {search:true,titleShow:true, clearable:true, title: '日期', key: 'date', type: 'date' }
    ],
    tableColumn: [
        {
            label: '名称',
            prop: 'tzmc',
            align: 'left',
            add:true,
            search:true,
            rules:true,
            placeholder: '请输入名称',
            type: 'input',
            isAdvanced:true
        }, {
            label: '权限',
            prop: 'gxlx',
            align: 'left',
            add:true,
            search:true,
            type: 'select',
            options:[{value:'1',label: "是"},{value:'2',label: "否"}],
            optionLabel: 'label',
            optionValue: 'value',
            render: (h, params) => {
                return h('span', {style:"color: dodgerblue"}, params.row.gxlx)
            }
        }, {
            label: '创建时间',
            prop: 'lrsj',
            formatter:(row)=>{
                return `<span style="color: dodgerblue;">${row.lrsj}</span>`
            },
        }, {
            label: '更新时间',
            prop: 'xgsj'
        }
    ],
    tableData:[{
        tzmc:'游戏',
        lrsj:'2020-02-02',
        xgsj:'2020-03-03',
        gxlx:'全平台'
    }, {
        tzmc:'游戏1',
        lrsj:'2020-02-02',
        xgsj:'2020-03-03',
        gxlx:'全平台'
    }],
}
