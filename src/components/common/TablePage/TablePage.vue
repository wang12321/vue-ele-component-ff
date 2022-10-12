<template>
    <div class="show-bar" style="width: 100%;">
      <!--有height属性 可固定表头 在pc端用 -->
      <el-table stripe  v-bind="$attrs" v-on="$listeners" key="isPc" :max-height="tableHight" :data="tableData" v-loading="isTableDataLoading" class="sum-data-table" :show-summary="showSummary" :summary-method="getSummaries">
        <slot></slot>
      </el-table>
      <!--在移动端用-->
      <!--<el-table stripe  v-else key="isNotPc" :data="tableData" v-loading="isTableDataLoading" class="sum-data-table" :show-summary="showSummary" :summary-method="getSummaries">-->
        <!--<slot></slot>-->
      <!--</el-table>-->
      <div v-if="hasPage" style="text-align: center;margin-top: 6px;margin-bottom: 10px;">
        <el-pagination
        v-bind="$attrs" v-on="$listeners"
          layout="prev, pager, next"
          :current-page="curPage"
          :page-size="pageSize"
          :total="pageTotal"
          @current-change="pageChangeEvent">
        </el-pagination>
      </div>
    </div>
</template>

<script>

  export default {
      name: 'TablePage',
      data() {
      return {
        tableHight: 600,
      };
    },
    // mounted() {
    //   this.$nextTick(() => {
    //     // const clientHeight = document.documentElement.clientHeight;
    //     // // console.log(this.fixedHeaderHeight, 'fixedHeaderHeight');
    //     // let pageHeight;
    //     // if (this.hasPage) {
    //     //   pageHeight = 32
    //     // } else {
    //     //   pageHeight = 0
    //     // }
    //
    //     // // 如果设置了  顶部搜索参数区高度 ---fixed 头部（搜索参数区域 固定在顶部）
    //     // if (this.fixedHeaderHeight) {
    //     //   // console.log(new Date().getTime(), 'tablepage')
    //     //   this.tableHight = clientHeight - 50 - this.fixedHeaderHeight - pageHeight - 36 - 40;
    //     //   // 浏览器高度 -顶部标题高度- 顶部搜索参数区高度 - 分页器高度 - 页脚高度 -页脚空余高度及修正高度
    //     //   // console.log(this.tableHight, 'tableHight高度--走了fixed')
    //     // } else {
    //     //   // 没有设置 顶部搜索参数区高度
    //     //   this.tableHight = clientHeight - 50 - 120 - pageHeight - 36 - 40;
    //     //   // 浏览器高度 -顶部标题高度- - 顶部搜索参数区高度- 分页器高度 - 页脚高度 -页脚空余高度及修正高度
    //     //   // console.log(this.tableHight, 'tableHight高度--没走fixed')
    //     // }
    //   })
    // },
    props: {
      // isTotalRowStick: {
      //   default: false,
      //   type: Boolean,
      // },
      // fixedHeaderHeight: {
      //   default: 0,
      //   type: Number,
      // },
      // tableHight: {
      //   default: 600,
      //   type: Number,
      // },
      tableData: {
        default: ()=>{ return [] },
        type: Array,
      },
      curPage: {
        default: 1,
        type: Number,
      },
      pageSize: {
        default: 20,
        type: Number,
      },
      pageTotal: {
        default: 1,
        type: Number,
      },
      isTableDataLoading: {
        default: false,
        type: Boolean,
      },
      hasPage: {
        default: false,
        type: Boolean,
      },
      showSummary: {
        default: false,
        type: Boolean,
      },
      isGetTheSumAvg: {
        default: false,
        type: Boolean,
      },
      // 注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或validator 函数中是不可用的。
      // author: {
      //   // 自定义验证函数
      //   validator(value) {
      //   // 这个值必须匹配下列字符串中的一个
      //     return ['au', 'th', 'or'].indexOf(value) !== -1
      //   },
      // },

    },
    methods: {
      pageChangeEvent(page) {
        this.$emit('pageChange', page)
      },
      getSummaries(param) {
        // console.log('param', param)
        const noSumProp = ['total_can_withdraw_money', 'total_ingot_store', 'active_user_store']
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, columnsIndex) => {
          if (columnsIndex === 0) {
            sums[columnsIndex] = '合计';
            return;
          }
          if (noSumProp.find(ele => ele === column.property)) {
            sums[columnsIndex] = '-';
            return;
          }
          const values = data.map(dataItem => Number(dataItem[column.property]));
          if (!values.every(value => isNaN(value))) {
            // 如果属性名中含有 must_get_the_average
            const mustGetTheAverageReg = new RegExp('get_the_avg');
            sums[columnsIndex] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              }
              return prev;
            }, 0);
            // sums[columnsIndex] = mustGetTheAverageReg.test(column.property) ? Number((sums[columnsIndex] / data.length).toFixed(2)) : sums[columnsIndex];
            if (this.isGetTheSumAvg || mustGetTheAverageReg.test(column.property)) {
              sums[columnsIndex] = Number((sums[columnsIndex] / data.length).toFixed(2))
            }
            sums[columnsIndex] = sums[columnsIndex].toLocaleString();
          } else {
            sums[columnsIndex] = '-';
          }
        });
        return sums;
      },
    },
  };
</script>



