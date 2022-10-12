import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import InputMoney from '../components/common/InputMoney/index.js';

const componentName = InputMoney.name

export default {
    title: 'InputMoney/Inputmoney',
    component: InputMoney,
    argTypes:{
        formData:{description:'InputMoney数据存储对象，使用v-model绑定，组件内部实现双向绑定数据' },
        'v-model':{description:'传入数据' },
        disabled: {
            description: 'disabled',
            table: {
                type: {
                    summary: 'boolean',
                },
                defaultValue: { summary: 'false' },
            },
            control: {type: 'boolean'}
        },
        placeholder: {
            description: 'placeholder',
            table: {
                type: {
                    summary: 'string',
                },
            },
            control: { type: 'text'}
        },
        clearable: {
            description: '是否开启清除，默认开启',
            table: {
                type: {
                    summary: 'boolean',
                },
            },
            control: {type: 'boolean'}
        },
        //events
        input:{
            description:'绑定数据',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'input'
        },
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: InputMoney },
    template: '<'+ componentName +' v-model="formData.money" :clearable="clearable" :placeholder="placeholder" :disabled="disabled"/>',
});

export const inputmoney = Template.bind({});
inputmoney.args={
    formData:{
        money:0
    }

}
