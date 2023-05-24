<template>
<div>
  <el-button @click="editSome" type="primary" style="margin:20px">新增一列</el-button>
  <el-dialog :visible.sync="visible" title="对话框标题" width="80%">
    <dialog-form
        :form-list="formList"
        :form-data="formData"
        :rules="rules"
        :loading="loading"
        @submit="submit"
        @CANCEL="CANCEL"
    >
      <template v-slot:slotFormItem>
        <el-input placeholder="asd"></el-input>
      </template>
<!--      <template v-slot:formItem>-->
<!--        <el-input placeholder="asd"></el-input>-->
<!--      </template>-->
    </dialog-form>
  </el-dialog>

  <el-button @click="editSomespan12" type="primary" style="margin:20px">新增二列</el-button>
  <el-dialog :visible.sync="visiblespan12" title="对话框标题" width="80%">
    <dialog-form
        :form-list="formList"
        :form-data="formData"
        :rules="rules"
        :span="12"
        @submit="submit"
        @CANCEL="CANCEL"
    ></dialog-form>
  </el-dialog>
</div>
</template>

<script>
import {REQUIRED} from "@/components/utils/js/Reg/validate";
import provinceCity from "@/components/utils/js/provinceCity";

export default {
  name: "DialogFormView",
  data() {
    return {
      loading:false,
      visible: false,
      visiblespan12:false,
      rules: {
        name:REQUIRED('请输入昵称'),
        yes: REQUIRED('请选择是否','change'),
        year: REQUIRED('请选择年份'),
        uploadImg: REQUIRED('请上传图片'),
      },
      formData: {
        number:50,
        sex:'男',
        region:['中国'],
        value:'ff'
      },
      formList: [
        { isLabel:true, desClassP:'desClassP', desClass:'desImgClass', desImg:require('../../../assets/typeTag.png'), title: '昵称', key: 'name', maxlength:"30", type: 'textarea' ,clearable:true},
        { title: '用户', key: 'user', type: 'input' ,clearable:true, disabled:true},
        { clearable:true, title: '是否', key: 'yes', type: 'selectID',options:[{value:'1',label: "是"},{value:'2',label: "否"}],label: 'label',value: 'value' },
        { clearable:true, title: '年份', key: 'year', type: 'year' },
        { clearable:true, title: '日期', key: 'date', type: 'date' },
        { clearable:true, title: '时间', key: 'time', type: 'time' ,disabled:true},
        {title: '名称', key: 'slotFormItem', type: 'slotFormItem'},
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
            return (<el-input placeholder={params.item.placeholder} value={this.formData.value}  // value - props
            onInput={e => this.submit(e)} ></el-input>)
          }
        },
        { title: '所属地区',isHideForm:true, key: 'city_name', type: 'cascader', options: provinceCity, props: { value: 'value', label: 'label', children: 'children' } },
        { clearable:true,title: '性别', key: 'sex',isHideForm:true, type: 'radioNO',options:[{value:'1',label: "男"},{value:'2',label: "女"}],label: 'label',value: 'value' },
        { clearable:true,title: '地区', key: 'region',isHideForm:true, type: 'checkbox',options:[{value:'1',label: "中国"},{value:'2',label: "德国"}],label: 'label',value: 'value' },
        { clearable:true,title: '数量', key: 'number', type: 'inputNumber',min:0,max: 100 },
        { clearable:true,title: '开关', key: 'switch', type: 'switch',inactiveText:'未选中',activeText: '选中' },
        { limit:2, clearable:true,title: '图片', key: 'uploadImg', type: 'uploadImg', change:(file,files)=>{
            console.log(file,files)
          }},
      ]
    }
  },
  methods: {
    submit(){
      alert('提交表单')
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    CANCEL(){
      this.visiblespan12 = false
      this.visible = false
    },
    editSomespan12(){
      this.visiblespan12 = true
    },
    editSome() {
      this.visible = true
    },
  },
}
</script>

<style lang="scss">
.desClassP{
  height: 300px;
  overflow: auto;
}
.desImgClass{
  width: 300px;
}
</style>
