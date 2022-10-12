import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI);
import Pagination from '../components/common/Pagination/index';

const componentName = Pagination.name

export default {
    title: 'Pagination/Pagination',
    component: Pagination,
    argTypes:{
        show:{description:'是否分页组件' },
        total:{description:'总数' },
        pageData:{ control: { type: 'object'},description:'分页数据' },
        backPosition:{description:'页码改变页面回滚到指定位置'},
        reloadData:{description:'页码改变后的回调函数',action: 'reloadAction'},
        nextText:{description:'下一页标签' },
        prevText:{description:'上一页标签' },
        layout:{description:'' },
    }
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { [componentName]: Pagination },
    template: '<'+ componentName +' :page-data="pageData" :show="show" :backPosition="backPosition" @reloadData="reloadData" :prevText="prevText" :nextText="nextText" :layout="layout"/>',
});

export const pagination = Template.bind({});
pagination.args={
    pageData:{total: 100, page: 1, rows: 20 },
}
