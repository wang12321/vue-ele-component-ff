import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from "vue";
import MyDialogWithBtn from '../components/common/DialogWithBtn/DialogWithBtn';
import elDragDialog from "../components/utils/el-drag-dialog/index";
Vue.directive('elDragDialog', elDragDialog)
Vue.use(ElementUI)

const componentName = MyDialogWithBtn.name

export default {
  title: 'Dialog/DialogWithBtn',
  component: MyDialogWithBtn,
  argTypes: {
    visible: { control: { type: 'boolean'},description:'控制是否可见' },
    'v-el-drag-dialog':{description:'设置对话框可拖拽' },
    title:{ control: { type: 'text'},description:'设置对话框顶部标题' },
    cancelEvent:{description:'点击取消后的回调事件',action: 'cancelAction'},
    sureEvent:{description:'点击确定后的回调事件',action: 'sureAction'},
    'update:visible':{description:'同步visible数值（该参数不涉及修改，可忽略）'},
    default:{description:'底部按钮之前的默认插槽（该参数不涉及修改，可忽略）'},
    footer:{description:'底部按钮footer具名插槽（该参数不涉及修改，可忽略）'},
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { [componentName]: MyDialogWithBtn },
  template:
      '<div>' +
      ' <el-button @click="onShowDialog">点我显示对话框</el-button> ' +
      ' <'+ componentName +' v-el-drag-dialog="`qw`" @sureEvent="sureEvent" @cancelEvent="cancelEvent" :visible.sync="visible" :title="title">' +
      ' 内容可自由添加' +
      ' </'+ componentName +'>' +
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

export const dialogWithBtn = Template.bind({});
dialogWithBtn.args = {
  title: '对话框标题',
};

// export const dialogWithBtn2 = Template.bind({});
// dialogWithBtn2.args = {
//   title: '对话框2',
// };

