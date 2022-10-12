<template>
  <div style="margin: 20px">
    金额输入框，只能输入数字，字符串会自动转成0.00，显示数字会自动补齐小数点两位,绑定数据如果没有小数不会补齐，有小数会补齐
    <div style="width: 200px;margin-top: 20px">
      <input-money v-model="formData.money" :clearable="clearable" :placeholder="placeholder" :disabled="disabled"/>
    </div>

    <div style="margin-top: 20px">绑定的数据:<span>{{formData.money}}</span></div>
  </div>

</template>

<script>
export default {
  name: "InputMoneyView",
  data(){
    return{
      clearable:true,
      placeholder:'请输入金额',
      disabled:false,
      formData:{
        money:0
      }
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
