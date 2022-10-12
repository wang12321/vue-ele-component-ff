import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import DialogForm from '../components/common/DialogForm/index';
import provinceCity from '../components/utils/js/provinceCity.js';
import { REQUIRED } from '../components/utils/js/Reg/validate.js';

const componentName = DialogForm.name

export default {
    title: 'DialogForm/DialogForm',
    component: DialogForm,
    argTypes:{
        // props
        formData:{description:'表单数据存储对象' },
        formList:{description:'表单项，具体配置参数看formList' },
        rules:{description:'校验'},
        LabelWidth:{description:'表单label宽度'},
        //formList
        title: {
            type:{required: true},
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
        ':key': {
            type:{required: true},
            description: '表单项model，对应formData的key',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'text'}
        },
        placeholder: {
            description: '表单项placeholder',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '请填写{{title}}' },
            },
            control: { type: 'text'}
        },
        type: {
            type:{required: true},
            description: '表单项type',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'select',options:['input','select','month','year','cascader','date','daterange','datetimerange','dateH','time','datetime','radio','checkbox','inputNumber','switch','slot']}
        },
        options: {
            description: 'type为select,radio,checkbox有效',
            table: {
                category: 'formList',
                type: {
                    summary: 'array',
                },
                defaultValue: { summary: [] },
            },
            control: {type: 'array'}
        },
        label: {
            description: 'options有效,option label',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        value: {
            description: 'options有效,option label',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },

        clearable: {
            description: '是否开启清除，默认开启',
            table: {
                category: 'formList',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },
        change: {
            description: '@change回调事件',
            table: {
                category: 'formList',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            control: {type: 'function'}
        },
        inactiveText: {
            description: 'type为switch时有效,未选中文字',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        activeText: {
            description: 'type为switch时有效,选中文字',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        min: {
            description: 'type为inputNumber时有效，最小值',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        max: {
            description: 'type为inputNumber时有效，最大值',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        border: {
            description: 'checkbox 有效，显示边框',
            table: {
                category: 'formList',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },
        disabled: {
            description: 'disabled',
            table: {
                category: 'formList',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },
        limit: {
            description: 'type为uploadImg时有效，图片数量限制',
            table: {
                category: 'formList',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        multiple: {
            description: 'multiple',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },
        filterable: {
            description: 'filterable',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
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
        CANCEL:{
            description:'表单取消按钮',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'CANCEL'
        },

        formItem:{description:'formItem预留' , table: {
                type: {
                    summary: 'template',
                },
            }},



    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        :rules="rules"\n' +
        '        :LabelWidth="LabelWidth"\n' +
        '        @submit="submit"\n' +
        '        @CANCEL="CANCEL"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});

export const dialog_form = Template.bind({});
dialog_form.args={
    rules: {
        name:REQUIRED('请输入昵称'),
        yes: REQUIRED('请选择是否'),
        year: REQUIRED('请选择年份'),
        uploadImg: REQUIRED('请上传图片'),
    },
    formData: {
        number:50,
        sex:'男',
        region:['中国']
    },
    formList: [
        { title: '昵称', key: 'name', type: 'input' ,clearable:true},
        { title: '用户', key: 'user', type: 'input' ,clearable:true, disabled:true},
        { clearable:true, title: '是否', key: 'yes', type: 'select',options:[{value:'1',label: "是"},{value:'2',label: "否"}],label: 'label',value: 'value' },
        { clearable:true, title: '年份', key: 'year', type: 'year' },
        { clearable:true, title: '日期', key: 'date', type: 'date' },
        { clearable:true, title: '时间', key: 'time', type: 'time' },
        { title: '所属地区', key: 'city_name', type: 'cascader', options: provinceCity, props: { value: 'value', label: 'label', children: 'children' } },
        { clearable:true,title: '性别', key: 'sex', type: 'radio',options:[{value:'1',label: "男"},{value:'2',label: "女"}],label: 'label',value: 'value' },
        { clearable:true,title: '地区', key: 'region', type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
        { clearable:true,title: '数量', key: 'number', type: 'inputNumber',min:0,max: 100 },
        { clearable:true,title: '开关', key: 'switch', type: 'switch',inactiveText:'未选中',activeText: '选中' },
        { limit:2, clearable:true,title: '图片', key: 'uploadImg', type: 'uploadImg', change:(file,files)=>{
                console.log(file,files)
            }},
    ]
}
const Templateinput = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});

export const input = Templateinput.bind({});
input.args={
    formData: {
    },
    formList: [
        {title: '昵称', key: 'name', type: 'input' ,clearable:true},
    ]
}
const Templateselect = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const select = Templateselect.bind({});
select.args={
    formData: {
    },
    formList: [
        {clearable:true, title: '是否', key: 'yes', type: 'select',options:[{value:'1',label: "是"},{value:'2',label: "否"}],label: 'label',value: 'value' },
    ]
}

const Templateyear_month = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const year_month = Templateyear_month.bind({});
year_month.args={
    formData: {
    },
    formList: [
        { clearable:true, title: '年份', key: 'year', type: 'year' },
        { clearable:true, title: '月份', key: 'month', type: 'month' },

    ]
}

const Templatedate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const date = Templatedate.bind({});
date.args={
    formData: {
    },
    formList: [
        { clearable:true, title: '日期', key: 'date', type: 'date' },
        { clearable:true, title: '日期范围', key: 'daterange', type: 'daterange' },
    ]
}

const Templatetime = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const time = Templatetime.bind({});
time.args={
    formData: {
    },
    formList: [
        {clearable:true, title: '时间', key: 'time', type: 'time' },
        {clearable:true, title: '日期时间', key: 'datetime', type: 'datetime' },
        {clearable:true, title: '时间范围', key: 'datetimerange', type: 'datetimerange' },
    ]
}

const Templatecascader = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const cascader = Templatecascader.bind({});
cascader.args={
    formData: {
    },
    formList: [
        { title: '所属地区', key: 'city_name', type: 'cascader', options: provinceCity, props: { value: 'value', label: 'label', children: 'children' } },
    ]
}

const Templateradio = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const radio = Templateradio.bind({});
radio.args={
    formData: {
    },
    formList: [
        {clearable:true,title: '性别', key: 'sex', type: 'radio',options:[{value:'1',label: "男"},{value:'2',label: "女"}],label: 'label',value: 'value' },
    ]
}

const Templatecheckbox = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const checkbox = Templatecheckbox.bind({});
checkbox.args={
    formData: {
        region:[],
        regionB:[]
    },
    formList: [
        {border:true, clearable:true,title: '地区', key: 'regionB', type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
        {clearable:true,title: '地区', key: 'region', type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
    ]
}

const TemplateinputNumber = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const inputNumber = TemplateinputNumber.bind({});
inputNumber.args={
    formData: {
        number:50
    },
    formList: [
        {clearable:true,title: '数量', key: 'number', type: 'inputNumber',min:0,max: 100 },
    ]
}



const Templateswitch = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const Switch = Templateswitch.bind({});
Switch.args={
    formData: {
    },
    formList: [
        {clearable:true,title: '开关', key: 'switch', type: 'switch',inactiveText:'未选中',activeText: '选中' },
    ]
}

const TemplateuploadImg = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DialogForm },
    template: '<'+ componentName +'\n' +
        '        :form-list="formList"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const uploadImg = TemplateuploadImg.bind({});
uploadImg.args={
    formData: {
    },
    formList: [
        { limit:2, clearable:true,title: '图片', key: 'uploadImg', type: 'uploadImg', change:(file,files)=>{
                console.log(file,files)
            }},
    ]
}

const TemplateSlot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { [componentName]: DialogForm },
  template: '<'+ componentName +'\n' +
      '        :form-list="formList"\n' +
      '        :form-data="formData"\n' +
      '        @submit="submit"\n' +
      '      >\n' +
      '      </'+ componentName +'>',
});
export const Slot = TemplateSlot.bind({});
Slot.args={
  formData: {
    value:'ff'
  },
  formList: [
    {title: '名称', key: '12', type: 'slot' ,placeholder: "请输入内容",
    render: (h, params) => {
      //   return h('el-input', { props: { type:'text' },
      //     domProps:{
      //     },
      //     attrs: {
      //       value: '', // 处理默认显示的,
      //       placeholder:params.item.placeholder
      //     }
      //   })
      // }
        return (<el-input placeholder={params.item.placeholder} value= {''}  // value - props
        onInput={e => console.log(e)} ></el-input>)
      }
    }
  ]
}
