<template>
    <div>
        <ol>
            <li>选择单个日期或日期区间</li>
            <li>支持多种常用快捷，如‘上线至今、本年、去年’</li>
            <li>支持原有基础的所有属性和事件</li>
        </ol>

        <date-picker-has-ops @changeDate="changeDate"></date-picker-has-ops>
        <div style="margin: 10px">
            {{dateData}}
        </div>


    </div>

</template>

<script>
    // const DatePickerHasOps = () => import('@/components/common/DatePickerHasOps');

    export default {
        name: 'test-dialog',

        data() {
            return {
                dateData: ['请选择日期'],
            }
        },
        methods: {
            changeDate(mutableSearchDateRange){
                console.log('mutableSearchDateRange',mutableSearchDateRange)
                this.dateData=mutableSearchDateRange
            }

        },
    }
</script>

<style scoped>

</style>
