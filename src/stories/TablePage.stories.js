import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI)
import MyTablePage from '../components/common/TablePage/TablePage';

const componentName = MyTablePage.name

export default {
  title: 'table/TablePage',
  component: MyTablePage,
  argTypes: {
    pageChange:{description:'页码改变后的回调函数',action: 'pageChangeAction'},
    // 'cell-click':{description:'表格被点击后的回调函数',action: 'cellClickAction'},
    showSummary:{ control: { type: 'boolean'},description:'是否显示合计栏' },
    isGetTheSumAvg: { control: { type: 'boolean'},description:'整个表格合计栏是否为计算平均值,false或者不传该参数则默认是求和值' },
    'xxxxx_get_the_avg':{description:'在后端返回的某个属性名后加 `_get_the_avg`并在`<el-table-column>`上添加相应prop,则会在合计栏自动计算该属性的平均值'},
    tableData:{ control: { type: 'array'},description:'表格数据' },
    curPage:{ control: { type: 'number'},description:'当前页码' },
    pageSize:{ control: { type: 'number'},description:'每页条数' },
    pageTotal:{ control: { type: 'number'},description:'总条数' },
    isTableDataLoading:{ control: { type: 'boolean'},description:'表格是否正在加载' },
    hasPage:{ control: { type: 'boolean'},description:'是否有分页器' },
    default:{description:'默认插槽（该参数不涉及修改，可忽略）'},
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { [componentName]: MyTablePage },
  template: '<div>' +
      '        <'+ componentName +'\n' +
      '                :tableData="tableData"\n' +
      '                :hasPage="hasPage"\n' +
      '                :curPage="curPage"\n' +
      '                :pageSize="pageSize"\n' +
      '                :pageTotal="pageTotal"\n' +
      '                @pageChange="pageChange"\n' +
      '                @cell-click="cell-click"\n' +
      '                :showSummary="showSummary"\n' +
      '                :isGetTheSumAvg="isGetTheSumAvg"\n' +
      '                :isTableDataLoading="isTableDataLoading"\n' +
      '        >\n' +
      '            <el-table-column align="center" prop="id" label="ID"></el-table-column>\n' +
      '            <el-table-column align="center" prop="name" label="姓名"></el-table-column>\n' +
      '            <el-table-column align="center" prop="age" label="计算累计"></el-table-column>\n' +
      '            <el-table-column align="center" prop="num_get_the_avg" label="计算平均值"></el-table-column>\n' +
      '        </'+ componentName +'>' +
      '</div>',
  data(){
   return{
     // visible:'',
   }
  },
  methods:{
    onShowDialog(){
      this.visible=true
      console.log('展示了')
    },
  }
});

export const TablePage = Template.bind({});
// TablePage.args = {
//   title: '对话框标题',
// };

// export const dialogWithBtn2 = Template.bind({});
// dialogWithBtn2.args = {
//   title: '对话框2',
// };

