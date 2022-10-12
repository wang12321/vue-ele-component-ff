<template>
  <el-pagination
    v-if="show"
    :current-page="pageData.page"
    :page-size="pageData.rows"
    :page-sizes="[20, 30, 40, 50]"
    :prev-text="prevText"
    :next-text="nextText"
    :layout="layout"
    :total="total?total:pageData.total"
    class="pagination"
    v-bind="$attrs"
    v-on="$listeners"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
/**
 * @author ff
 * @date 2021/3/24
 * @Description 分页组件
 * @param {Boolean} show         选传，是否显示分页组件
 * @param {Object} pageData      必传，分页属性
 *      @param {Number} total    总条数
 *      @param {Number} page     当前页数
 *      @param {Number} rows     每页条数
 * @param {Function} reloadData  必传，请求数据方法
 * @param {number} key           key值改变强制刷新组件
 */
export default {
  name: 'Pagination',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    layout:{
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    prevText:{
      type: String,
      default: "上一页",
    },
    nextText:{
      type: String,
      default: "下一页",
    },
    pageData: {
      type: Object,
      required: true,
    },
    total:{
      type: Number,
      default: 0,
    },
    backPosition: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data() {
    return {
      interval: null,
    };
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageData.rows = val;
      this.$emit('reloadData');
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.$emit('reloadData');
      this.scrollToTop();
    },
    scrollToTop() {
      const start = window.pageYOffset;
      let i = 0;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition);
          clearInterval(this.interval);
        } else {
          window.scrollTo(0, next);
        }
        // eslint-disable-next-line no-plusplus
        i++;
      }, 16.7);
    },
    /**
     * 计算滑动递减的高度
     * @param t 递减的幅度
     * @param b 正页面偏移高度
     * @param c 负页面偏移高度
     * @param d 页面基准高度
     * @returns {*}
     */
    easeInOutQuad(t, b, c, d) {
      // eslint-disable-next-line no-cond-assign,no-param-reassign,no-mixed-operators
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      // eslint-disable-next-line no-mixed-operators,no-param-reassign,no-plusplus
      return -c / 2 * (--t * (t - 2) - 1) + b;
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: center;
  margin-top: 15px;
}
</style>
