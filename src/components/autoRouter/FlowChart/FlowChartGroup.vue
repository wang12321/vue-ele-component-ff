<template>
  <div style="overflow: auto;">
    <flowChart
        :convertData="convertData" >
    </flowChart>
  </div>
</template>


<script>
import flowChart from "./common";
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
      convertData: {
        convertDataRoot:  [{
          name: '节点1',
          linehide: true,
        }],
        convertDataBottom: [
          {
            name: '节点1',
            // nodehide: true,
            click:this.click,
            linehide: true,
            children: [
              {name: '节点2',click:this.click},
              {
                name: '节点3'
              }
            ]
          },
        ],
        convertDataLeft: [
          {
            name: '节点1',
            nodehide: true,
            linehide: true,
            children: [
              {name: '节点2',description:[{text:'asdf123123123',}]},
              {name: '节点2'},
              {name: '节点3'},
              {name: '节点3'}
            ]
          },
        ],
        convertDataRight: [
          {
            name: '节点1',
            nodehide: true,
            linehide: true,
            children: [
              {name: '节点2'},
              {name: '节点3'}
            ]
          },
        ],
        convertDataTop: [
          {
            name: '节点1',
            nodehide: true,
            linehide: true,
            children: [
              {name: '节点2',children: [
                  {name: '节点3'}
                ]}
            ]
          },
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
