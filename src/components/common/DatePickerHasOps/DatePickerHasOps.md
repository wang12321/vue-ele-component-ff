DatePickerHasOps组件使用文档

说明：DatePickerHasOps组件支持原有的`el-date-picker`组件**所有属性和事件**，以下为新增的属性值和事件

### 一、属性值
| 参数             | 说明                        | 类型     |   可选值            |  默认值|
| :-------------: |  :----------------------:  |  :------:| :--------:        | :---:|
| includeToday    | 日期快捷键里是否包含今天        | Boolean  |  -                | true |
| isSingleDate    | 是否是单个日期类型(即非日期区间) | Boolean  |   -               | false |
| componentsSize  | 尺寸(也可直接传size属性)       | String  | large, small, mini|  large |

### 二、事件

| 参数             | 说明                        | 回调参数类型                                |  举例                                         |
| :-------------: |  :----------------------:  |  :-------------------------------------:  | :-------------------------------------------:|
| changeDate      | 选中日期后会触发该事件         |  String(单个日期类型) / Array (日期区间类型)   | "2020-11-17"   / ["2020-11-03", "2020-11-07"] |


### 三、使用举例


```vue

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
    const DatePickerHasOps = () => import('@/components/common/DatePickerHasOps');

    export default {
        name: 'test-dialog',
        components: {
            DatePickerHasOps,
        },
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


```
运行示例：http://test.vue-ele.xq5.com/#/autoRouter/DatePickerExample


