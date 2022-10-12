<template>
  <div>
      <el-date-picker
              v-model="dateRange"
              @change="dateChangeEvent"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="datePickerOptionsInterval"
              v-bind="$attrs" v-on="$listeners"
      >
      </el-date-picker>
  </div>
</template>

<script>
    export default {
        name: "DatePickerLimit",
        props:{
            dateIntervalMax:{
                default: 10,
                type: Number,
            }

        },
        data(){
            return {
                clickOneDate:'',
                datePickerOptionsInterval: {
                    shortcuts: [
                        {
                            text: '近1天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        // {
                        //     text: '近7天',
                        //     onClick(picker) {
                        //         const end = new Date();
                        //         const start = new Date();
                        //         start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
                        //         end.setTime(end.getTime() - (3600 * 1000 * 24));
                        //         picker.$emit('pick', [start, end]);
                        //     },
                        // },
                        {
                            text: `近${this.dateIntervalMax}天`,
                            onClick:(picker)=>{
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - (3600 * 1000 * 24 * this.dateIntervalMax));
                                end.setTime(end.getTime() - (3600 * 1000 * 24));
                                picker.$emit('pick', [start, end]);
                            },
                        },
                    ],
                    disabledDate: (time) => {
                        // console.error('time', `${time.getMonth()}月${time.getDate()}`)
                        if (time.getTime() >= Date.now() - (24 * 60 * 60 * 1000)) {
                            return true
                        }
                        if (this.clickOneDate && ((time.getTime() - (this.clickOneDate.getTime() + ((this.dateIntervalMax - 1) * 24 * 60 * 60 * 1000))) > 0 || ((this.clickOneDate.getTime() - ((this.dateIntervalMax - 1) * 24 * 60 * 60 * 1000)) - time.getTime()) > 0)) {
                            return true
                        }
                        return false
                    },
                    onPick: ({ maxDate, minDate }) => {
                        // 只点了起始日期或终止日期
                        if (minDate && !maxDate) {
                            this.clickOneDate = minDate
                        } else {
                            this.clickOneDate = ''
                        }
                    },
                },
                dateRange: [new Date(new Date().getTime() - (3600 * 1000 * 24 * this.dateIntervalMax)), new Date(new Date().getTime() - (3600 * 1000 * 24))],
            }
        },
        methods:{
            dateChangeEvent(date){
                this.$emit('changeDate',date)

            }

        }
    }
</script>

<style scoped>

</style>
