<template>
<div style="width: 600px;height: 100%">
  <SQLEdit ref="SQLEdit" :code.sync="code" :icon="icon" :cmOptions="cmOptions"/>
</div>
</template>

<script>
export default {
  name: "SqlEdit",
  data() {
    return {
      cmOptions:{
        readOnly: true
      },
      icon:['el-icon-plus','el-icon-minus'],
      code: `select * from (select map_agg(date_time, amount_0) filter (where amount_0 is not null) data_map_0, sum(amount_0) filter (where is_finite(amount_0)) total_amount, count(1) over () group_num from (select ta_date_trunc('day',ta_ev."@vpc_tz_#event_time", 1) date_time, cast(coalesce(COUNT(1), 0) as double) amount_0 from (select *, if("#zone_offset" is not null and "#zone_offset">=-12 and "#zone_offset"<=14, date_add('second', cast((8-"#zone_offset")*3600 as integer), "#event_time"), "#event_time") "@vpc_tz_#event_time" from (v_event_231)) ta_ev where (( ( "$part_event" IN ( 'login' ) ) )) and ((("$part_date" between '2021-11-23' and '2021-12-24') and ("@vpc_tz_#event_time" >= timestamp '2021-11-24' and "@vpc_tz_#event_time" < date_add('day', 1, TIMESTAMP '2021-12-23'))) and (ta_ev."#zone_offset" IN (8))) group by ta_date_trunc('day',ta_ev."@vpc_tz_#event_time", 1)) ) ORDER BY total_amount DESC limit 1000\`, // 初始化SQL
`, // 初始化SQL
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
