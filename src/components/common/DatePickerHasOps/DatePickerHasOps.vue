<template>
    <div>
        <!--包含当天的-->
        <el-date-picker v-if="includeToday && !isSingleDate"
                        v-model="mutableSearchDateRange" type="daterange"
                        value-format="yyyy-MM-dd" range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="searchDateOptionsIncludeToday"
                        @change="changeDateEvent" :size="componentsSize"
                        v-bind="$attrs" v-on="$listeners"
        >
        </el-date-picker>

        <!--不包含当天的-->
        <el-date-picker v-if="!includeToday && !isSingleDate"
                        v-model="mutableSearchDateRange" type="daterange"
                        value-format="yyyy-MM-dd" range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="searchDateOptionsNotIncludeToday"
                        @change="changeDateEvent"
                        v-bind="$attrs" v-on="$listeners"
        >
        </el-date-picker>

        <!--单个日期选择-->
        <el-date-picker
                v-model="mutableSearchDateRangeSingle"
                align="left"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
                @change="changeDateEvent"
                v-if="isSingleDate"
                v-bind="$attrs" v-on="$listeners"
        >
        </el-date-picker>

    </div>
</template>

<script>
    export default {
        name: "DatePickerHasOps",
        props:{
            searchDateRange: {
                default: () => [], // Props with type Object/Array must use a factory function to return the default value
                type: Array,
            },
            includeToday: {
                default: true,
                type: Boolean,
            },
            isSingleDate: {
                default: false,
                type: Boolean,
            },
            searchDateRangeSingle: {
                default: '',
                type: String,
            },
            componentsSize: {
                default: 'large',
                type: String,
            },
        },
        data(){
            return {
                searchDateOptionsIncludeToday: {
                    shortcuts: [
                        {
                            text: '今日',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                // start.setTime(this.getThisWeekFristDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '昨日',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '本周',
                            onClick: (picker) => {
                                const start = new Date();
                                const end = new Date();
                                start.setTime(this.getThisWeekFristDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '上周',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(this.getLastWeekFirstDay());
                                end.setTime(this.getLastWeekLastDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '本月',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.toDatafirstdate()));
                                // end.setTime(this.getLastWeekLastDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '上月',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.toDatalastdate()));
                                end.setTime(new Date(this.togetlastdate()));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '本年',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.getThisYearFristDay()));
                                // end.setTime(new Date(this.togetlastdate()));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '去年',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.getLastYearFristDay()));
                                end.setTime(new Date(this.getLastYearLastDay()));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '上线至今',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date('2016-01-01'));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近两周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 14));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近30天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近90天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近半年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 183));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近一年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 365));
                                picker.$emit('pick', [start, end]);
                            },
                        }],
                },
                searchDateOptionsNotIncludeToday: {
                    shortcuts: [
                        {
                            text: '今日',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                // start.setTime(this.getThisWeekFristDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '昨日',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '本周',
                            onClick: (picker) => {
                                const start = new Date();
                                const end = new Date();
                                start.setTime(this.getThisWeekFristDay());
                                if (Number(end.getDay()) === 1) {
                                    // 如果为周一时 不减一天
                                    end.setTime(end.getTime())
                                } else {
                                    end.setTime(end.getTime() - (3600 * 1000 * 24));
                                }

                                // alert(end.getDate())
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '上周',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(this.getLastWeekFirstDay());
                                end.setTime(this.getLastWeekLastDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '本月',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.toDatafirstdate()));
                                if (Number(new Date().getDay()) !== 1) {
                                    end.setTime(end.getTime() - (3600 * 1000 * 24));
                                }
                                // end.setTime(this.getLastWeekLastDay());
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '上月',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.toDatalastdate()));
                                end.setTime(new Date(this.togetlastdate()));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '本年',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.getThisYearFristDay()));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                // end.setTime(new Date(this.togetlastdate()));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '去年',
                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date(this.getLastYearFristDay()));
                                end.setTime(new Date(this.getLastYearLastDay()));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '上线至今',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(new Date('2016-01-01'));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 8));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近两周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 15));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近30天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 31));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));

                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近90天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 91));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));

                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近半年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 184));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));

                                picker.$emit('pick', [start, end]);
                            },
                        }, {
                            text: '最近一年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * 366));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));

                                picker.$emit('pick', [start, end]);
                            },
                        }],
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        },
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - (3600 * 1000 * 24));
                            picker.$emit('pick', date);
                        },
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - (3600 * 1000 * 24 * 7));
                            picker.$emit('pick', date);
                        },
                    }],
                },
                mutableSearchDateRange: this.searchDateRange,
                mutableSearchDateRangeSingle: this.searchDateRangeSingle,



            }
        },
        methods:{
            changeDateEvent() {
                if (this.isSingleDate) {
                    this.$emit('changeDate', this.mutableSearchDateRangeSingle);
                } else {
                    this.$emit('changeDate', this.mutableSearchDateRange);
                }

                // this.searchDataEvent()
            },
            // searchDataEvent() {
            //     if (this.isSingleDate) {
            //         this.$emit('searchData', this.mutableSearchDateRangeSingle)
            //     } else {
            //         this.$emit('searchData', this.mutableSearchDateRange)
            //     }
            // },
            // 获取本周第一天
            getThisWeekFristDay() {
                const nowDay = new Date();
                const dayOfWeek = nowDay.getDay() ? nowDay.getDay() - 1 : 6;
                const thisWeekFristDay = new Date(nowDay.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000));
                // alert(thisWeekFristDay.getDate())
                return thisWeekFristDay.getTime();
                // 返回格式 '2019-04-14'
                //  return this.toDate(thisWeekFristDay);
            },
            // 获取上周周第一天
            getLastWeekFirstDay() {
                const thisWeekFristDay = this.getThisWeekFristDay();
                return thisWeekFristDay - (7 * 24 * 60 * 60 * 1000);
            },
            // 获取上周最后一天
            getLastWeekLastDay() {
                const lastWeekFristDay = this.getLastWeekFirstDay();
                return lastWeekFristDay + (6 * 24 * 60 * 60 * 1000);
            },
            // 获取当前月第一天
            toDatafirstdate() {
                const myDate = new Date();
                const thisyear = myDate.getFullYear();
                let thismonth = myDate.getMonth();
                if (thismonth < 9) {
                    thismonth = `0${thismonth + 1}`;
                } else {
                    thismonth = `${thismonth + 1}`;
                }
                return `${thisyear}-${thismonth}-01`;
            },
            // 获取上月月第一天
            toDatalastdate() {
                const myDate = new Date();
                let thisyear = myDate.getFullYear();
                let thismonth = myDate.getMonth();
                if (thismonth === 0) {
                    thismonth = 12;
                    thisyear -= 1;
                }
                if (thismonth <= 9) {
                    thismonth = `0${thismonth}`;
                }
                return `${thisyear}-${thismonth}-01`;
            },
            // 获取上月最后一天
            togetlastdate() {
                const nowdays = new Date();
                let year = nowdays.getFullYear();
                let month = nowdays.getMonth();
                if (month === 0) {
                    month = 12;
                    year -= 1;
                }
                if (month < 10) {
                    month = `0${month}`;
                }
                const myDate = new Date(year, month, 0);
                const lastDay = `${year}-${month}-${myDate.getDate()}`;
                return lastDay;
            },
            // 获取今年第一天
            getThisYearFristDay() {
                const thisYear = new Date().getFullYear();
                return `${thisYear}-01-01`;
            },

            // 获取去年第一天
            getLastYearFristDay() {
                const lastYear = new Date().getFullYear() - 1;
                return `${lastYear}-01-01`;
            },
            // 获取去年最后一天
            getLastYearLastDay() {
                const lastYear = new Date().getFullYear() - 1;
                return `${lastYear}-12-31`;
            },


        },
        watch:{
            searchDateRange(newValue) {
                this.mutableSearchDateRange = newValue
            },
            searchDateRangeSingle(newValue) {
                this.mutableSearchDateRangeSingle = newValue
            },
        }
    }
</script>

<style scoped>

</style>
