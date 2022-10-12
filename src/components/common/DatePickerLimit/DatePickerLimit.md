DatePickerLimit组件使用文档

说明：DatePickerLimit组件支持原有的`el-date-picker`组件**所有属性和事件**，以下为新增的属性值和事件

### 一、属性值
| 参数             | 说明                        | 类型     |   可选值            |  默认值|
| :-------------: |  :----------------------:  |  :------:| :--------:        | :---:|
| dateIntervalMax | 可选择的天数范围               | Number   |  -                | 10 |


### 二、事件

| 参数             | 说明                        | 回调参数类型                                |  举例                                         |
| :-------------: |  :----------------------:  |  :-------------------------------------:  | :-------------------------------------------:|
| changeDate      | 选中日期后会触发该事件         |   Array  |   ["2020-11-03", "2020-11-07"] |


### 三、使用举例


```vue
<template>
    <div>
        <ol>
            <li>支持指定的日期间隔天数 <code>dateIntervalMax</code> ，超过该间隔的日期区间将不可选择</li>
            <li>支持常用快捷</li>
            <li>支持原有基础的所有属性和事件</li>
        </ol>

        <DatePickerLimit
                @changeDate="changeDate"
                :dateIntervalMax="dateIntervalMax"
        ></DatePickerLimit>
        <div style="margin: 10px">
            {{dateData}}
        </div>


    </div>

</template>

<script>
    const DatePickerLimit = () => import('@/components/common/DatePickerLimit');

    export default {
        name: 'test-dialog',
        components: {
            DatePickerLimit,
        },
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



```
运行示例：http://test.vue-ele.xq5.com/#/autoRouter/DatePickerLimitExample


