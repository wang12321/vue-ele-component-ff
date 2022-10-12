<template>
    <div>
        <div>
            <ol>
                <li>在原有基础上增加分页组件(分页组件可选)</li>
                <li>支持table及pagination所有属性和事件</li>
                <li>支持某一列累计，某一列计算平均值</li>
                <li>具体用法 请见 <a href="https://docs.qq.com/doc/DQlpsS3hyZUlMYWhx" target="_blank">这里第五点</a> </li>
            </ol>
        </div>
        <table-page
                :tableData="tableData"
                :hasPage="false"
                :curPage="curPage"
                :pageSize="pageSize"
                :pageTotal="pageTotal"
                @pageChange="pageChangeCallback"
                @cell-click="cellClick"
                :showSummary="true"
                :isGetTheSumAvg="false"
                :background="true"
        >
            <el-table-column align="center" prop="id" label="ID"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名"></el-table-column>
            <el-table-column align="center" prop="age" label="计算累计"></el-table-column>
            <el-table-column align="center" prop="num_get_the_avg" label="计算平均值"></el-table-column>
        </table-page>

    </div>

</template>

<script>
    // const TablePage=()=>import('@/components/common/TablePage');
    export default {
        name: "table-page-example",

        data(){
            return {
                tableData:[
                    {
                        id:451,
                        name:'李四',
                        age:25,
                        num_get_the_avg:2,
                    },
                    {
                        id:400,
                        name:'张三',
                        age:26,
                        num_get_the_avg:4,
                    },
                    {
                        id:368,
                        name:'王五',
                        age:22,
                        num_get_the_avg:6,
                    },
                ],
                curPage:1,
                pageSize:20,
                pageTotal:1,

            }
        },
        methods:{
            cellClick(row, column, cell, event){
                console.log('row, column, cell, event',row, column, cell, event)

            },
            pageChangeCallback(curPageId){
                console.log('这是第几页?'+curPageId)

            }
        }
    }
</script>

<style scoped>

</style>
