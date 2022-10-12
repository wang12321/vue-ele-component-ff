<template>
  <div style="overflow: auto;">
    <flow-chart :convertData="convertData"  direction="Right"></flow-chart>
  </div>
</template>

<script>
import flowChart from "../../common/FlowChart/FlowChart";
export default {
  name: "index",
  components:{
    flowChart
  },
  methods:{
    click(item){
      console.log(111,item)
    }
  },
  data() {
    return {
      convertData: [
        {
          name: '节点1',
          // nodehide: true,
          linehide: true,
          label:'title',
          textColorLabel: '#ff0000',
          fontSizeLabel: '20px',
          children: [
            {name: '节点2',label:'title',children: [
                {name: '节点3',label:'title',description:[{text:'asdf123123123'},{text:'asdf123123123'}]},
                {name: '节点3',label:'title'},
                {name: '节点3',label:'title'},
                {name: '节点3',label:'title'}
              ]}
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
