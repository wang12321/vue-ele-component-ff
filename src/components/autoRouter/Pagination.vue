<template>
<div>
  <Pagination :page-data="pageData" :total="total" @reloadData="reloadData" />
  <Pagination :page-data="pageData"  @reloadData="reloadData" :prevText="prevText" :nextText="nextText" />
  <Pagination :page-data="pageData"  @reloadData="reloadData" :prevText="prevText" :nextText="nextText" :layout="layout"/>
</div>
</template>

<script>
export default {
  name: "PaginationView",
  data() {
    return {
      total:123,
      pageData:{total:100,page: 1, rows: 20 },
      nextText:'',
      prevText:'',
      layout:"total, sizes, prev, pager, next, jumper"
    }
  },
  methods:{
    reloadData(){
      alert('当前页码'+ this.pageData.page)
    }
  }
}
</script>

<style scoped>

</style>
