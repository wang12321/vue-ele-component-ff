import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
Vue.use(ElementUI)
import MyDatePickerLimit from '../components/common/DatePickerLimit/DatePickerLimit';

const componentName = MyDatePickerLimit.name

export default {
  title: 'Date/DatePickerLimit',
  component: MyDatePickerLimit,
  argTypes: {
    changeDate:{description:'日期取消后的回调事件',action: 'changeDateAction'},
    dateIntervalMax:{ control: { type: 'number'},description:'最大间隔天数(默认为最大10天的日期间隔)' },

  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { [componentName]: MyDatePickerLimit },
  template: '<div><'+ componentName +'\n' +
      '                @changeDate="changeDate"\n' +
      '                :dateIntervalMax="dateIntervalMax"\n' +
      '        ></'+ componentName +'></div>',
  data(){
   return{
     // visible:'',
   }
  },
  methods:{
    // onShowDialog(){
    //   this.visible=true
    //   console.log('展示了')
    // },
  }
});

export const DatePickerLimit = Template.bind({});
DatePickerLimit.args = {
  // title: '对话框标题',
};

// export const dialogWithBtn2 = Template.bind({});
// dialogWithBtn2.args = {
//   title: '对话框2',
// };

