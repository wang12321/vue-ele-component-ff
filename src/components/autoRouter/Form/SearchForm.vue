<template>
  <el-container>
    <el-header style="height: auto">
      <search-form
          :form-options="formOptions"
          :form-data="formData"
          :isAdvanced="isAdvanced"
          @submit="submit"
          @reset="reset">
        <template v-slot:nameSlot>
          <el-input placeholder="插槽测试"></el-input>
        </template>
        <template v-slot:button>
          <DownLoad ref="download" size="" @downloadAction="downloadData"></DownLoad>
        </template>
      </search-form>
    </el-header>
  </el-container>
</template>

<script>
import provinceCity from "@/components/utils/js/provinceCity";

export default {
  name: "SearchFormView",
  data(){
    return{
      dateData: ['请选择日期'],
      isAdvanced:true,
      formData: {
        number:50,
        sex:'男',
        region:['中国'],
        value:'12'
      },

      formOptions: [
        {title: '测试', key: 'nameSlot', type: 'slotFormItem' },
        {titleShow:true,title: '', key: 'date1', type: 'datePicker' ,clearable:true,isAdvanced:true,change:this.changeDate},
        {title: '昵称', key: 'name', type: 'input' ,maxlength:2,clearable:true,isAdvanced:true,size:'medium', suffixIcon:"el-icon-date", class:'class1'},
        {title: '名称',isHideForm:true, key: '12', type: 'slot' ,placeholder: "请输入内容",isAdvanced:true,
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
            return (<el-input maxlength='3' placeholder={params.item.placeholder} value={this.formData.value}  // value - props
             ></el-input>)
          }
        },

        {titleShow:true, clearable:true,disabled:true, title: '是否', key: 'yes', type: 'select',options:[{value:'1',label: "是"},{value:'2',label: "否"}],label: 'label',value: 'value' },
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
  },
  created(){
    // onclick="reloadData()"
    // window.submit = this.submit // 解决字符串模板@click无效的问题
  },
  methods:{
    downloadData(){
      this.$refs.download.aHrefAction('#', '下载.xlsx');
    },
    changeDate(mutableSearchDateRange){
      console.log('mutableSearchDateRange',mutableSearchDateRange)
      this.dateData=mutableSearchDateRange
    },
    submit(){
      alert('查询了')
    },
    change(){

    },
    reset(){
      this.formData =  {
            number:50,
            sex:'男',
            region:['中国']
      }
    }
  }
}
</script>

<style>

</style>
