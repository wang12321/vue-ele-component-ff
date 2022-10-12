<template>
  <div>
    <el-row v-if="convertData.convertDataTop" style="width: 100%">
      <el-col :span="24"><div class="grid-content bg-purple">
        <flow-chart :nodek-key="nodekKey" :direction-key="directionKey" :font-size="fontSize" :width="width" :convert-data="convertData.convertDataTop" :bg-color="bgColorObj.bgColorTop" direction="Top" />
      </div></el-col>
    </el-row>
    <el-row style="width: 100%;" :style="{'height':rowHeight,'margin-top': nodeMove}">
      <el-col class="leftFlow" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--nodeMove':nodeMove.indexOf('-')>-1?nodeMove:'0px'}">
        <div v-if="convertData.convertDataLeft" ref="leftFlow">
          <flow-chart :nodek-key="nodekKey" :direction-key="directionKey" :font-size="fontSize" :width="width" style="width: 100%" :convert-data="convertData.convertDataLeft" :bg-color="bgColorObj.bgColorLeft" direction="Left" content="right" />
        </div>
      </el-col>
      <el-col v-if="convertData.convertDataRight" class="rightFlow" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--nodeMove':nodeMove.indexOf('-')>-1?nodeMove:'0px'}">
        <div ref="rightFlow">
          <flow-chart :nodek-key="nodekKey" :direction-key="directionKey" :font-size="fontSize" :width="width" style="width: 100%" :convert-data="convertData.convertDataRight" :bg-color="bgColorObj.bgColorRight" content="left" direction="Right" />
        </div>
      </el-col>
      <div v-if="typeof(convertData.convertDataRoot)==='object'" class="rootNodeO" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--rootNodeTop':rootNodeTop}">
        <flow-chart :nodek-key="nodekKey" :direction-key="directionKey" :font-size="fontSize" :width="width" :bg-color="bgColorObj.bgColorRoot" :convert-data="convertData.convertDataRoot" direction="Top" />
      </div>
      <p v-if="convertData.convertDataTop" class="top" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--topLineMarginTop':topLineMarginTop,'--lineColorTop':convertData.convertDataTop[0].bgColorObj?convertData.convertDataTop[0].bgColorObj:bgColorObj.bgColorTop,'--nodeMove':nodeMove}" />
      <p v-if="convertData.convertDataLeft" class="left" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--rightLineMarginTop':rightLineMarginTop,'--leftLineMarginTop':leftLineMarginTop,'--lineColorLeft':convertData.convertDataLeft[0].bgColorObj?convertData.convertDataLeft[0].bgColorObj:bgColorObj.bgColorLeft,'--nodeMove':nodeMove}" />
      <p v-if="convertData.convertDataBottom" class="bottom" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--bottomLineMarginTop':bottomLineMarginTop,'--lineColorBottom':convertData.convertDataBottom[0].bgColorObj?convertData.convertDataBottom[0].bgColorObj:bgColorObj.bgColorBottom,'--nodeMove':nodeMove}" />
      <p v-if="convertData.convertDataRight" class="right" :style="{'--width':width,'--leftWidth':leftWidth,'--rightWidth':rightWidth,'--rightMarginTop':rightMarginTop,'--leftMarginTop':leftMarginTop,'--rightLineMarginTop':rightLineMarginTop,'--leftLineMarginTop':leftLineMarginTop,'--lineColorRight':convertData.convertDataRight[0].bgColorObj?convertData.convertDataRight[0].bgColorObj:bgColorObj.bgColorRight,'--nodeMove':nodeMove}" />
    </el-row>
    <el-row v-if="convertData.convertDataBottom" style="width: 100%">
      <el-col :span="24"><div class="grid-content bg-purple">
        <flow-chart :nodek-key="nodekKey" :direction-key="directionKey" :font-size="fontSize" :width="width" :convert-data="convertData.convertDataBottom" direction="Bottom" :bg-color="bgColorObj.bgColorBottom" />
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * @author ff
 * @date 2021/8/21
 * @Description: 基于流程图组件二次封装，布局为上中（左中右）下
 * @update by:
 * 使用方法
 *
 <flowChart
 :convertData="convertData" >
 </flowChart>

 data数据格式
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
              {name: '节点2',description:[{text:'节点说明',}]},
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
 */
export default {
  name: 'Index',
  props: {
    convertData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 数据取值key
    nodekKey: {
      type: String,
      default: () => 'name'
    },
    // 描述取值key
    directionKey: {
      type: String,
      default: () => 'text'
    },
    bgColorObj: {
      type: Object,
      default: () => ({
        bgColorTop: '#86D9FF',
        bgColorLeft: '#7CE5D9',
        bgColorRight: '#AEE884',
        bgColorBottom: '#FFD0D9',
        bgColorRoot: '#FFC55B'
      })
    },
    fontSize: {
      type: String,
      default: () => '14px'
    },
    width: {
      type: String,
      default: () => '100px'
    },
    leftWidth: {
      type: String,
      default: () => '50%'
    },
    rightWidth: {
      type: String,
      default: () => '50%'
    },
    // 移动flowChart标记 左右 默认居中
    flowChartMove: {
      type: Array,
      default: () => [12, 12]
    },
    // 移动Line标记 上左下右 默认居中
    lineMove: {
      type: Array,
      default: () => [0, 0, 0, 0]
    },
    // 根节点 偏移高度，默认是50%
    rootNodeTop: {
      type: String,
      default: () => '0px'
    },
    // 中间层高度
    rowHeight: {
      type: String,
      default: () => '100%'
    },
    // 中心点 整体平移
    nodeMoveR: {
      type: String,
      default: () => '0px'
    }

  },
  data() {
    return {
      leftMarginTop: '0px',
      rightMarginTop: '0px',
      nodeMove: '0px'
    }
  },
  computed: {
    topLineMarginTop() {
      return this.lineMove[0] + 'px'
    },
    leftLineMarginTop() {
      return this.lineMove[1] + 'px'
    },
    bottomLineMarginTop() {
      return this.lineMove[2] + 'px'
    },
    rightLineMarginTop() {
      return this.lineMove[3] + 'px'
    }
  },
  mounted() {
    this.updateHeight()
  },
  methods: {
    updateHeight() {
      this.$nextTick(() => {
        this.rightMarginTop = this.flowChartMove[1] + 'px'
        this.leftMarginTop = this.flowChartMove[0] + 'px'
        if (this.$refs.leftFlow && this.$refs.rightFlow) {
          const heightTop = this.$refs.leftFlow.offsetHeight - this.$refs.rightFlow.offsetHeight
          if (heightTop >= 0) {
            // this.nodeMove = -this.$refs.leftFlow.offsetHeight / 2 + 'px'
            this.rightMarginTop = (this.$refs.leftFlow.offsetHeight - this.$refs.rightFlow.offsetHeight) / 2 + this.flowChartMove[1] + 'px'
          } else if (heightTop < 0) {
            // this.nodeMove = -this.$refs.rightFlow.offsetHeight / 2 + 'px'
            this.leftMarginTop = (this.$refs.rightFlow.offsetHeight - this.$refs.leftFlow.offsetHeight) / 2 + this.flowChartMove[0] + 'px'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  width: 3px;
  height: calc(50% + 25px - var(--topLineMarginTop) + var(--nodeMove));
  background-color: var(--lineColorTop);
  position: absolute;
  top: calc(-57px - var(--nodeMove)) ;
  left: var(--leftWidth);
}
.right{
  width: calc(50px);
  height: 3px;
  background-color: var(--lineColorRight);
  position: absolute;
  top: calc(50% - 20px - var(--rightLineMarginTop));
  left: calc(var(--leftWidth) + var(--width)/2);
}
.left{
  width: calc(50px);
  height: 3px;
  background-color: var(--lineColorLeft);
  position: absolute;
  top: calc(50% - 20px - var(--leftLineMarginTop));
  left: calc(var(--leftWidth) - var(--width)/2 - 50px);
}

.bottom{
  width: 3px;
  z-index: 6;
  height: calc(50% + 5px  - var(--bottomLineMarginTop));
  background-color: var(--lineColorBottom);
  position: absolute;
  bottom: -38px;
  left: var(--leftWidth);
}
.rootNodeO{
  text-align: center;
  position: absolute;
  height: 100%;
  width: var(--width);
  margin: auto 0;
  z-index: 7;
  top: calc(50% - var(--rootNodeTop) - 20px);
  left: calc(var(--leftWidth) - var(--width)/2);
  border-radius: 5px;
}

.leftFlow{
  width: calc(var(--leftWidth) - 30px - var(--width)/2);
  margin-right:calc(var(--width)/2 + 30px);
  margin-top: calc(var(--leftMarginTop) + var(--nodeMove)) ;
}
.rightFlow{
  overflow: auto;
  width: calc(var(--rightFlow) - 30px - var(--width)/2);
  margin-left:calc(var(--width)/2 + 30px);
  margin-top: calc(var(--rightMarginTop) + var(--nodeMove));
}

</style>
