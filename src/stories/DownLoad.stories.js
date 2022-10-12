import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import DownLoad from '../components/common/DownLoad/index.js';

const componentName = DownLoad.name

export default {
    title: 'DownLoad/Download',
    component: DownLoad,
    argTypes:{

        //events
        downloadAction:{
            description:'下载按钮',
            table: {
                type: {
                    summary: 'function',
                },
                defaultValue: { summary: 'function' },
            },
            action: 'downloadAction'
        },

    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: DownLoad },
    template: `<DownLoad ref="download" @downloadAction="downloadAction"></DownLoad>`,
});

export const download = Template.bind({});
download.args={
    downloadAction(){
        console.log('请调用',`this.$refs.download.aHrefAction('#', '测试.xlsx')`)
    }
}
