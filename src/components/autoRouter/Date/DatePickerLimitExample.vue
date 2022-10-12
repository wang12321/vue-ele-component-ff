<template>
    <div>
        <ol>
            <li>支持指定的日期间隔天数 <code>dateIntervalMax</code> ，超过该间隔的日期区间将不可选择</li>
            <li>支持常用快捷</li>
            <li>支持原有基础的所有属性和事件</li>
        </ol>

        <date-picker-limit
                @changeDate="changeDate"
                :dateIntervalMax="dateIntervalMax"
        ></date-picker-limit>
        <div style="margin: 10px">
            {{dateData}}
        </div>


    </div>

</template>

<script>
    // const DatePickerLimit = () => import('@/components/common/DatePickerLimit');

    export default {
        name: 'test-dialog',

        data() {
            return {
                dateData: ['请选择日期'],
                dateIntervalMax:5,
            }
        },
        methods: {
            changeDate(date){
                console.log('date变化了',date)
                this.dateData=date

            }

        },
    }
</script>

<style scoped>

</style>
