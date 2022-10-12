<template>
  <div class="flowChartMain">
    <div v-for="(item,index) in convertData" :key="item[nodekKey]+index" :class="['flowChartRoots',`flowChartRoots${direction||(item.direction||'Right')}`]" :style="{'--bgColor':item.bgColor || bgColor,'--content':content,'--width':width}">
        <div :class="['line',`line${direction||(item.direction||'Right')}`]" :style="{'--bgColor':item.bgColor || bgColor}" v-if="!item.linehide"></div>
        <span v-if="!item.nodehide && !item.description && !item.label"
              :class="['flowChartNode',`flowChartNode${direction||(item.direction||'Right')}`]"
              :style="{fontSize:item.fontSize || fontSize,'--bgColor':item.bgColor || bgColor,color:item.textColor||'#333'}"
              @click="item.click?item.click(item):null">{{item[nodekKey]}}
        </span>
        <div  v-else-if="!item.nodehide && !item.description && (item.label && item.label.length !== 0) "
              :class="['flowChartNode',`flowChartNode${direction||(item.direction||'Right')}`]"
              :style="{'--bgColor':item.bgColor || bgColor,fontSize:item.fontSize || fontSize,color:item.textColor||'#333'}"
              @click="item.click?item.click(item):null">
          <p :style="{borderBottom: `.5px solid ${item.borderBottomColor}`,color:item.textColorLabel||'#333',background:item.bgColorLabel||'',fontWeight:'bold',fontSize:item.fontSizeLabel||'16px'}">{{item['label'] || ''}}</p>
          <p :style="{borderBottom: `.5px solid ${item.borderBottomColor}`}">{{item[nodekKey]}}</p>
        </div>
        <div  v-else-if="!item.nodehide && (item.description && item.description.length !== 0) && (item.label && item.label.length !== 0) "
              :class="['flowChartNode',`flowChartNode${direction||(item.direction||'Right')}`]"
              :style="{'--bgColor':item.bgColor || bgColor,fontSize:item.fontSize || fontSize,color:item.textColor||'#333'}"
              @click="item.click?item.click(item):null">
          <p :style="{borderBottom: `.5px solid ${item.borderBottomColor}`,color:item.textColorLabel||'#333',background:item.bgColorLabel||'',fontWeight:'bold',fontSize:item.fontSizeLabel||'16px'}">{{item['label'] || ''}}</p>
          <p :style="{borderBottom: `.5px solid ${item.borderBottomColor}`}">{{item[nodekKey]}}</p>
          <p v-for="(nodeItem,nodeindex) in item.description" :key="nodeItem[directionKey] + nodeindex"
             :style="{color:nodeItem.textColor||'#666',fontSize:nodeItem.fontSize ||'13px',borderBottom: `.5px solid ${item.borderBottomColor}`}">{{nodeItem[directionKey]}}</p>
        </div>
        <div  v-else-if="!item.nodehide && (item.description && item.description.length !== 0) && !item.label"
              :class="['flowChartNode',`flowChartNode${direction||(item.direction||'Right')}`]"
              :style="{'--bgColor':item.bgColor || bgColor,fontSize:item.fontSize || fontSize,color:item.textColor||'#333'}"
              @click="item.click?item.click(item):null">
          <p :style="{borderBottom: `.5px solid ${item.borderBottomColor}`}">{{item[nodekKey]}}</p>
          <p v-for="(nodeItem,nodeindex) in item.description" :key="nodeItem[directionKey] + nodeindex"
             :style="{color:nodeItem.textColor||'#666',fontSize:nodeItem.fontSize ||'13px',borderBottom: `.5px solid ${item.borderBottomColor}`}">{{nodeItem[directionKey]}}</p>
        </div>
        <div
            v-if="item.children"
            :class="[item.children.length>1?`multiply-node`:'',item.children.length>1?`multiply-node${direction||(item.direction||'Right')}`:'','flowChartChildNodes',`flowChartChildNodes${direction||(item.direction||'Right')}`]"
            :style="{'--bgColor':item.bgColor || bgColor}">
          <FlowChart
              :convertData="item.children || []"
              :direction="direction"
              :bgColor="bgColor"
              :fontSize="fontSize"
              :content="content"
              :width="width"
              :nodekKey="nodekKey"
              :directionKey="directionKey"

          />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlowChart",
  props: {
    // 数据
    convertData:{
      type:Array,
      default:()=>{
        return []
      }
    },
    // 数据取值key
    nodekKey:{
      type:String,
      default:()=>'name'
    },
    // 描述取值key
    directionKey:{
      type:String,
      default:()=>'text'
    },
    // 全局方向
    direction:{
      type:String,
      default:()=>''
    },
    // 全局背景色
    bgColor:{
      type:String,
      default:()=>'#86D9FF'
    },
    // 全局字体大小
    fontSize:{
      type:String,
      default:()=>'14px'
    },
    // 内容居中
    content:{
      type:String,
      default:()=>'center'
    },
    // 节点宽度
    width:{
      type:String,
      default:()=>'100px'
    }
  }
}
</script>

<style lang="scss" scoped>
.flowChartMain{
  text-align: center;
  width: 100%;
  height: 100%;
}
.multiply-node .flowChartMain,.multiply-node-bottom .flowChartMain{
  text-align: left;
  width: 100%;
  height: 100%;
}
.multiply-nodeRight .flowChartMain .flowChartRootsRight{
  text-align: left;
  width: 100%;
  height: 100%;
}

.flowChartRoots{
  margin: 0 auto;
  //background-color: red;
  width: 100%;
  margin-bottom:20px;
  position: relative;
  .flowChartNode{
    z-index: 8;
    position: relative;
    padding:6px 10px;
    background: var(--bgColor);
    border-radius:2px;
    color:#333;
    display:inline-block;
    cursor: pointer;
    min-width:var(--width);
    text-align:center;
    font-size: 16px;
    line-height: 1.8em;
    vertical-align: middle;
    min-height:20px;
  }
  .flowChartNode p{
    text-align: left;
    //background-color: royalblue;
    border-bottom: .5px solid #e1e1e1;
  }
  .flowChartNode::after{
    content:'';
    display:block;
    background:var(--bgColor);
    position:absolute;
  }
  .flowChartNode:last-child::after{
    content:'';
    display:block;
    background:var(--bgColor);
    position:absolute;
  }
  .flowChartChildNodes{
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .flowChartChildNodes>div{
    display:flex;
    justify-content:space-between;
  }
  .multiply-node>.flowChartMain>.flowChartRoots::after{
    content:'';
    display:block;
    background:var(--bgColor);
    position:absolute;
  }

  .line{
    position: absolute;
    background-color:var(--bgColor);
  }

  .multiply-node>.flowChartMain>.flowChartRoots:first-child::after{
    content:'';
    position:absolute;
    display:block;
  }
  .multiply-node>.flowChartMain>.flowChartRoots:last-child::after{
    content:'';
    position:absolute;
    display:block;
  }
}

.flowChartRootsRight{
  text-align: var(--content);

  .flowChartNodeRight{
  }
  .flowChartNodeRight::after{
    width:20px;
    height:3px;
    left:100%;
    top:50%
  }
  .flowChartNodeRight:last-child::after{
    width:0px;
    height:3px;
    left:100%;
    top:50%
  }
  .flowChartChildNodesRight{
    margin-left:40px;
    top: 10px;
  }
  .flowChartChildNodesRight>div{
    flex-direction: column;
  }
  .multiply-nodeRight>.flowChartMain>.flowChartRootsRight::after{
    width:3px;
    height:calc(100% + 20px);
    left:-20px;
    top:0%
  }
  .lineRight{
    width:20px;
    height:3px;
    top:50%;
    left:-20px
  }

  .multiply-nodeRight>.flowChartMain>.flowChartRootsRight:first-child::after{
    width:3px;
    height:calc(50% + 20px);
    top:50%;
    left:-20px;
  }
  .multiply-nodeRight>.flowChartMain>.flowChartRootsRight:last-child::after{
    width:3px;
    height:50%;
    left:-20px;
  }
}

.flowChartRootsBottom{
  text-align: center;
  .flowChartNodeBottom::after{
    width:3px;
    height:20px;
    left:50%;
    top:100%
  }
  .flowChartNodeBottom:last-child::after{
    width:3px;
    height:0px;
    left:50%;
    top:100%
  }
  .flowChartNodeBottom{
    margin:20px 10px 0px 10px;
  }
  .flowChartChildNodesBottom{
    display: block;
    margin-top: 20px;
  }
  .flowChartChildNodesBottom>div{
    flex-direction: row;
  }
  .multiply-nodeBottom>.flowChartMain>.flowChartRootsBottom::after{
    width:100%;
    height: 2px;
    left:0;
    top:0
  }

  .lineBottom{
    width:3px;
    height:20px;
    top:0px;
    left:50%
  }
  .multiply-nodeBottom>.flowChartMain>.flowChartRootsBottom:first-child::after{
    width:50%;
    height: 2px;
    left:50%;
    top:0
  }
  .multiply-nodeBottom>.flowChartMain>.flowChartRootsBottom:last-child::after{
    width:50%;
    height: 2px;
    left:0%;
    top:0
  }
}

.flowChartRootsTop{
  text-align: center;
  display:flex;
  flex-direction: column-reverse;
  align-content: center;
  position: relative;
  .flowChartNodeTop::after{
    width:3px;
    height:20px;
    left:50%;
    bottom:100%
  }
  .flowChartNodeTop:last-child::after{
    width:3px;
    height:0px;
    left:50%;
    bottom:100%
  }
  .flowChartNodeTop{
    position: relative;
    width: var(--width);
    margin:0 auto;
    margin-bottom: 20px;
    //margin:0px 10px 20px 10px;
  }
  .flowChartChildNodesTop{
    display: block;
    margin-top: 20px;
  }
  .flowChartChildNodesTop>div{
    flex-direction: row;
  }
  .multiply-nodeTop>.flowChartMain>.flowChartRootsTop::after{
    width:100%;
    height: 2px;
    left:0;
    bottom:0
  }

  .lineTop{
    width:3px;
    height:20px;
    bottom:0px;
    left:50%
  }
  .multiply-nodeTop>.flowChartMain>.flowChartRootsTop:first-child::after{
    width:50%;
    height: 2px;
    left:50%;
    bottom:0
  }
  .multiply-nodeTop>.flowChartMain>.flowChartRootsTop:last-child::after{
    width:50%;
    height: 2px;
    left:0%;
    bottom:0
  }
}

.flowChartRootsLeft{
  text-align: right;
  display:flex;
  justify-content: var(--content);
  flex-direction: row-reverse;
  //align-content: center;
  //position: relative;
  .flowChartNodeLeft{
    //height: 32px;
    margin: auto 0;
  }
  .flowChartNodeLeft:first-child{
    //justify-content: center;
  }
  .flowChartNodeLeft::after{
    width:20px;
    height:3px;
    right:100%;
    top:50%
  }
  .flowChartNodeLeft:last-child::after{
    width:0px;
    height:3px;
    right:100%;
    top:50%
  }
  .flowChartChildNodesLeft{
    margin-right:40px;
    top: 10px;
  }
  .flowChartChildNodesLeft>div{
    flex-direction: column;
  }
  .multiply-nodeLeft>.flowChartMain>.flowChartRootsLeft::after{
    width:3px;
    height:calc(100% + 20px);
    right:-20px;
    top:0%
  }
  .lineLeft{
    width:20px;
    height:3px;
    top:50%;
    right:-20px
  }
  .multiply-nodeLeft>.flowChartMain>.flowChartRootsLeft:first-child::after{
    width:3px;
    height:calc(50% + 20px);
    top:50%;
    right:-20px;
  }
  .multiply-nodeLeft>.flowChartMain>.flowChartRootsLeft:last-child::after{
    width:3px;
    height:50%;
    right:-20px;
  }
  .multiply-nodeLeft>.flowChartMain>.flowChartRootsLeft{
    justify-content: right;
  }
}
</style>
