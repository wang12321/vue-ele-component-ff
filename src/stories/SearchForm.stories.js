import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import SearchForm from '../components/common/SearchForm/index';
import provinceCity from '../components/utils/js/provinceCity.js';


const componentName = SearchForm.name

export default {
    title: 'SearchForm/SearchForm',
    component: SearchForm,
    argTypes:{
        // props
        formData:{description:'表单数据存储对象' },
        formOptions:{description:'表单项，具体配置参数看FORMOPTIONS' },
        isAdvanced:{description:'是否开启高级搜索，默认关闭' },
        mode:{description:'开启高级组件时有效，值为[\'normal\':正常模式, \'special\':特殊模式,只显示一个关键字搜索框在外面]，默认为normal模式' },
        submitBtn:{description:'提交按钮'},
        rules:{description:'校验'},
        labelWidth:{description:'表单label宽度'},
        isSearch:{description:'是否显示高级搜索'},
        //FORMOPTIONS
        titleShow: {
            description: '表单项label是否显示，为true时显示，默认false',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean'}
        },
        title: {
            type:{required: true},
            description: '表单项label',
            table: {
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: { type: 'select',options:['input','select','month','year','cascader','date','daterange','datetimerange','dateH','time','datetime','datePicker','radio','checkbox','inputNumber','switch']}
        },
        options: {
            description: 'type为select,radio,checkbox有效',
            table: {
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },

        width: {
            description: '设置input宽度',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'string',
                },
                defaultValue: { summary: '' },
            },
            control: {type: 'text'}
        },
        ':isAdvanced': {
            description: '当mode为normal时有效，为true时显示在高级搜索外面',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },
        hidden: {
            description: '是否显示当前表单项',
            table: {
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
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
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
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
        remote: {
            description: 'remote',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },

        remoteMethod: {
            description: 'remoteMethod远程搜索方法',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            control: {type: 'function'}
        },
        filterMethod: {
            description: 'filterMethod自定义过滤方法',
            table: {
                category: 'formOptions',
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            control: {type: 'function'}
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
        reset:{
            description:'表单重置方法,不传没有重置按钮',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'reset'
        },

        // slots
        button:{description:'按钮slots预留:使用',
            table: {
                type: {
                    summary: 'template',
                },
                defaultValue: { summary: '<template v-slot:button>\n' +
                        '          <DownLoad ref="download" size="" @downloadAction="downloadData"></DownLoad>\n' +
                        '        </template>' },
            },
        },
        button1:{description:'按钮slots预留1,以保万一，多预留了点' , table: {
                type: {
                    summary: 'template',
                },
            }
            },
        button2:{description:'按钮slots预留2，以保万一，多预留了点', table: {
                type: {
                    summary: 'template',
                },
            } },
        formItem:{description:'formItem预留，以保万一，多预留了点' , table: {
                type: {
                    summary: 'template',
                },
            }},
        formItem1:{description:'formItem预留1，以保万一，多预留了点', table: {
                type: {
                    summary: 'template',
                },
            } },
        formItem2:{description:'formItem预留2，以保万一，多预留了点', table: {
                type: {
                    summary: 'template',
                },
            } },
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        :isAdvanced="isAdvanced"\n' +
        '        :mode="mode"\n' +
        '        :rules="rules"\n' +
        '        :labelWidth="labelWidth"\n' +
        '        :isSearch="isSearch"\n' +
        '        @submit="submit"\n' +
        '        @reset="reset"\n' +
        '      >\n' +
        '      </'+componentName+'>',
});

export const searchForm = Template.bind({});
searchForm.args={
    isAdvanced:true,
    formData: {
        number:50,
        sex:'男',
        region:['中国']
    },
    formOptions: [
        {title: '昵称', key: 'name', type: 'input' ,clearable:true,isAdvanced:true},
        {titleShow:true, clearable:true, title: '是否', key: 'yes', type: 'select',options:[{value:'1',label: "是"},{value:'2',label: "否"}],label: 'label',value: 'value' },
        {titleShow:true, clearable:true, title: '年份', key: 'year', type: 'year' },
        {titleShow:true, clearable:true, title: '日期', key: 'date', type: 'date' },
        {titleShow:true, clearable:true, title: '时间', key: 'time', type: 'time' },
        {titleShow:true, title: '所属地区', key: 'city_name', type: 'cascader', options: provinceCity, props: { value: 'value', label: 'label', children: 'children' } },
        {titleShow:true, clearable:true,title: '性别', key: 'sex', type: 'radio',options:[{value:'1',label: "男"},{value:'2',label: "女"}],label: 'label',value: 'value' },
        {border:true,titleShow:true, clearable:true,title: '地区', key: 'region', type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
        {titleShow:true, clearable:true,title: '数量', key: 'number', type: 'inputNumber',min:0,max: 100 },
        {titleShow:true, clearable:true,title: '开关', key: 'switch', type: 'switch',inactiveText:'未选中',activeText: '选中' },
    ]
}
const Templateinput = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const input = Templateinput.bind({});
input.args={
    isAdvanced:true,
    formData: {

    },
    formOptions: [
        {title: '昵称',titleShow:true, key: 'name', type: 'input' ,clearable:true,isAdvanced:true},
    ]
}
const Templateselect = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const select = Templateselect.bind({});
select.args={
    formData: {
    },
    formOptions: [
        {titleShow:true, clearable:true, title: '是否', key: 'yes', type: 'select',options:[{value:'1',label: "是"},{value:'2',label: "否"}],label: 'label',value: 'value' },
    ]
}

const Templateyear_month = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const year_month = Templateyear_month.bind({});
year_month.args={
    formData: {
    },
    formOptions: [
        { clearable:true,titleShow:true,title: '年份', key: 'year', type: 'year' },
        { clearable:true,titleShow:true,title: '月份', key: 'month', type: 'month' },

    ]
}

const Templatedate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const date = Templatedate.bind({});
date.args={
    formData: {
    },
    formOptions: [
        { clearable:true,titleShow:true,title: '日期', key: 'date', type: 'date' },
        { clearable:true,titleShow:true,title: '日期范围', key: 'daterange', type: 'daterange' },
        { titleShow: true, title: '', key: 'datePicker', type: 'datePicker', change: (mutableSearchDateRange)=>{
          alert(mutableSearchDateRange)
        }
       },
    ]
}

const Templatetime = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const time = Templatetime.bind({});
time.args={
    formData: {
    },
    formOptions: [
        {clearable:true,titleShow:true,title: '时间', key: 'time', type: 'time' },
        {clearable:true,titleShow:true,title: '日期时间', key: 'datetime', type: 'datetime' },
        {clearable:true,titleShow:true,title: '时间范围', key: 'datetimerange', type: 'datetimerange' },
    ]
}

const Templatecascader = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const cascader = Templatecascader.bind({});
cascader.args={
    formData: {
    },
    formOptions: [
        { titleShow: true, title: '所属地区', key: 'city_name', type: 'cascader', options: provinceCity, props: { value: 'value', label: 'label', children: 'children' } },
    ]
}

const Templateradio = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const radio = Templateradio.bind({});
radio.args={
    formData: {
    },
    formOptions: [
        {clearable:true,titleShow:true,title: '性别', key: 'sex', type: 'radio',options:[{value:'1',label: "男"},{value:'2',label: "女"}],label: 'label',value: 'value' },
    ]
}

const Templatecheckbox = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
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
    formOptions: [
        {border:true, clearable:true,titleShow:true,title: '地区', key: 'regionB', type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
        {clearable:true,titleShow:true,title: '地区', key: 'region', type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
    ]
}

const TemplateinputNumber = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
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
    formOptions: [
        {clearable:true,titleShow:true,title: '数量', key: 'number', type: 'inputNumber',min:0,max: 100 },
    ]
}



const Templateswitch = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: SearchForm },
    template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
        '        :form-data="formData"\n' +
        '        @submit="submit"\n' +
        '      >\n' +
        '      </'+ componentName +'>',
});
export const Switch = Templateswitch.bind({});
Switch.args={
    formData: {
    },
    formOptions: [
        {clearable:true,titleShow:true,title: '开关', key: 'switch', type: 'switch',inactiveText:'未选中',activeText: '选中' },
    ]
}
const TemplateSlot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { [componentName]: SearchForm },
  template: '<'+ componentName +'\n' +
        '        :form-options="formOptions"\n' +
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
  formOptions: [
    {title: '名称', key: '12', type: 'slot' ,placeholder: "请输入内容",
    render: (h, params) => {
        return h('el-input', { props: { type:'text' },
          domProps:{
          },
          attrs: {
            value: '', // 处理默认显示的,
            placeholder:params.item.placeholder
          }
        })
      }
        // return (<el-input placeholder={params.item.placeholder} value= {''}  // value - props
        // onInput={e => console.log(e)} ></el-input>)
      // }
    }
  ]
}
