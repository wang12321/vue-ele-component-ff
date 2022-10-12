import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI)
import MyDatePickerHasOps from '../components/common/DatePickerHasOps/DatePickerHasOps';

const componentName = MyDatePickerHasOps.name

export default {
  title: 'Date/DatePickerHasOps',
  component: MyDatePickerHasOps,
  argTypes: {
    changeDate:{description:'选中日期后会触发该事件',action: 'changeDateAction'},
    includeToday: { control: { type: 'boolean'},description:'日期快捷键里是否包含今天' },
    isSingleDate: { control: { type: 'boolean'},description:'是否是单个日期类型(即非日期区间)' },
    componentsSize: { control: { type: 'select',options:['large','small','mini']},description:'尺寸(也可直接传size属性)' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { [componentName]: MyDatePickerHasOps },
  template: '<div> <'+ componentName +' @changeDate="changeDate" :isSingleDate="isSingleDate" :includeToday="includeToday" :componentsSize="componentsSize"></'+ componentName +'></div>',
  data(){
   return{
     // visible:'',
   }
  },
  methods:{
  }
});

export const DatePickerHasOps = Template.bind({});
DatePickerHasOps.args = {
};

// export const dialogWithBtn2 = Template.bind({});
// dialogWithBtn2.args = {
//   title: '对话框2',
// };

