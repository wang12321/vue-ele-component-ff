<template>
  <el-container>
    <el-header style="height: auto">
      <search-form
          :form-options="searchFormOptions"
          :form-data="formData"
          :isAdvanced="isAdvanced"
          @submit="searchSubmit"
          >
        <el-button v-if="AddShow" slot="button" type="primary"  @click="handleAdd">新增</el-button>
      </search-form>
    </el-header>
    <el-main>
      <TableComponent :table-data="tableData"
                      :table-column="tableColumn"
                      :options="options"
                      :operates="operateslist"
                      @sortchange="sortchange">
      </TableComponent>
      <Pagination :page-data="pageData"  @reloadData="reloadData" />
    </el-main>
    <el-dialog :visible.sync="visible" title="新增" :width="dialogWidthAdd">
      <dialog-form
          :form-list="dialogFormOptions"
          :form-data="dialogFormData"
          :rules="rules"
          :span="spanForm"
          @submit="submit"
          @CANCEL="CANCEL"
      ></dialog-form>
    </el-dialog>
    <el-dialog :visible.sync="visibleToView" title="查看详情" :width="dialogWidthToView">
      <el-form label-position="right" inline class="demo-table-expand">
        <el-row :gutter="5" >
          <el-col :span="spanToView" v-for="item in tableColumn" :key="item.prop">
            <el-form-item :label="`${item.label}`+':'">{{ rowToView[item.prop] }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="visibleEdit" title="编辑" :width="dialogWidthEdit">
      <dialog-form
          :form-list="dialogFormOptions"
          :form-data="dialogFormData"
          :rules="rules"
          :span="spanForm"
          @submit="submitEdit"
          @CANCEL="CANCEL"
      ></dialog-form>
    </el-dialog>
  </el-container>
</template>

<script>
import DialogForm from '../DialogForm/DialogForm'
import TableComponent from '../TableComponent/TableComponent'
import SearchForm from '../SearchForm/SearchForm'
import Pagination from '../Pagination/Pagination'

export default {
  name: "CURDexample",
  components: {
    DialogForm,
    TableComponent,
    SearchForm,
    Pagination
  },
  props:{
    spanToView: {
      type: Number,
      default:() => 12
    },
    spanForm: {
      type: Number,
      default:() => 24
    },
    dialogWidthAdd: {
      type: String,
      default:() => '50%'
    },
    dialogWidthEdit: {
      type: String,
      default:() => '50%'
    },
    dialogWidthToView: {
      type: String,
      default:() => '60%'
    },
    tableColumn: {
      type: Array,
      required: true,
    },
    isAdvanced:{
      type: Boolean,
      default:() => false
    },
    tableData: {
      type: Array,
      default:() => []
    },
    formlist: {
      type: Array,
      default:() => []
    },
    formData: {
      type: Object,
      default:() => {}
    },
    dialogFormData:{
      type: Object,
      default:() => {}
    },
    pageData:{
      type: Object,
      default:() => {}
    },
    options: {
      type: Object,
      default:() => ({
        loading: true,
        border: true,
        className: 'table-class'
      })
    },
    AddShow: {
      type: Boolean,
      default:() => true
    },
    optionsShow: {
      type: Boolean,
      default:() => true
    },
    operates: {
      type: Object,
      default:() => ({
        isButton:false,
        width: '280px',
        label: '操作'
      })
    }
  },
  computed:{
    operateslist() {
      let operates = this.operates
      let list =  [
        {
          label: '查看',
          show: true,
          btnType: 'primary',
          plain: true,
          method: (index, row) => {
            console.log(index, row)
            this.rowToView = {...row}
            this.visibleToView = true
          }
        },
        {
          label: '编辑',
          show: true,
          btnType: 'danger',
          plain: true,
          method: (index, row) => {
            console.log(index, row)
            this.visibleEdit = true
            this.$emit('update:dialogFormData',{...row})
          }
        },
        {
          label: '都否删除当前数据?',
          show: true,
          type: 'delete',
          plain: true,
          method: (index, row) => {
            this.$emit('deleteData',row)
          }
        }
    ]
      if(operates.list){
        operates.list.forEach(item=>{
          list.push(item)
        })
      }
      if(this.optionsShow){
        operates.list = list
      }else {
        operates = {}
      }

      return operates
    },
    dialogFormOptions(){
      let list = this.tableColumn
      let formlist = []
      list.forEach(item=>{
        if(item.add) {
          formlist.push({titleShow:true,placeholder:item.placeholder,title:item.label, key: item.prop, type: item.type||'input',clearable:true,isAdvanced:item.isAdvanced,options:item.options,label: item.optionLabel,value: item.optionValue })
        }
        if(item.rules){
          this.rules[item.prop]= { required: true, message: item.placeholder, trigger:true };
        }
      })
      this.formlist.forEach(item=>{
        if(item.add) {
          formlist.push(item)
        }
        if(item.rules){
          this.rules[item.prop]= { required: true, message: item.placeholder, trigger:true };
        }
      })
      return formlist
    },
    searchFormOptions(){
      let list = this.tableColumn
      let formlist = []
      list.forEach(item=>{
        if(item.search) {
          formlist.push({titleShow:true,placeholder:item.placeholder,title:item.label, key: item.prop, type: item.type||'input',clearable:true,isAdvanced:item.isAdvanced,options:item.options,label: item.optionLabel,value: item.optionValue })
        }
      })
      this.formlist.forEach(item=>{
        if(item.search) {
          formlist.push(item)
        }
      })
      return formlist
    }
  },
  data(){
    return{
      visible: false,
      visibleToView: false,
      visibleEdit: false,
      rules: {},
      rowToView:{}
    }
  },
  mounted() {
    setInterval(()=>{
      this.options.loading = false
    },3000)
  },
  methods:{
    searchSubmit(){
      this.$emit('searchSubmit',this.formData)
    },
    sortchange(e){
      this.$emit('sortchange',e)
    },
    submit(){
      this.$emit('submitAdd',this.dialogFormData)
    },
    submitEdit(){
      this.$emit('submitEdit',this.dialogFormData)
    },
    handleAdd(){
      this.$emit('update:dialogFormData',{})
      this.visible = true
    },
    reloadData(){
      this.$emit('reloadData')
    },
    CANCEL(){
      this.visible = false
      this.visibleEdit = false
      this.visibleToView = false
    },
  }
}
</script>

<style scoped>

</style>
