<template>
  <el-table
      id="ffTable"
      ref="ffTableRef"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading.iTable="options.loading"
      :data="tableData"
      :border="options.border"
      :fit="options.fit"
      :show-header="options.showHeader"
      :highlight-current-row="options.highlightCurrentRow"
      :class="options.className"
      :summary-method="summaryMethod"
      :showSummary="showSummary"
      @selection-change="handleSelectionChange"
      @sort-change="sortchange"
  >
    <template>
      <slot></slot>
    </template>
    <template>
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;" />
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in tableColumn">
<!--        扩展处理-->
        <template v-if="column.slot">
          <slot :name="column.slot" :row="column"></slot>
        </template>
        <el-table-column
            v-else
            :key="column.label"
            :prop="column.prop"
            :label="column.label"
            :align="column.align || 'center'"
            :width="column.width"
            :fixed="column.fixed || false"
            :render-header="column.showTip?column.showTip:showTip"
            :sortable="sortable?'custom':false"
            :show-overflow-tooltip="column.showOverflowTooltip"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index" />
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->

      <!--region 按钮操作组-->
      <el-table-column
          v-if="operates && operates.list && operates.list.length > 0 && operates.list.filter(_x=>_x.show === true).length > 0"
          ref="fixedColumn"
          :label="operates.label || '操作'"
          :align="operates.align || 'center'"
          :width="operates.width"
          :fixed="operates.fixed"
      >
        <template slot-scope="scope">
          <slot name="extension" :row="scope.row" />
          <div class="operate-group" style="float: left">
            <ButtonGroup
                :list="showListRow(operates.list.filter(_x=>_x.show === true),scope.row)"
                :size="operates.size"
                :height="operates.height"
                :row-data="scope.row"
                :is-button="operates.isButton"
            />
          </div>
        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
import ButtonGroup from '../ButtonGroup/ButtonGroup'
/**
   * @author ff
   * @date 2021/4/19
   * @Description: 表格组件
   * @update by:
   * @param tableData        表格数据
   * @param tableColumn      表头配置
   *    label: String         列名称
   *    props: String         列属性名
   *    align: String         列对齐方式
   *    width: String|Number  列宽
   *    formatter: Function   对列表数据进行格式化，并把当前的row数据，和column数据返回给function中
   *      ex: formatter: (row, column, cellValue) => {
                return `<span style="white-space: nowrap;color: dodgerblue;">${row.title}</span>`
              }
   *    render: Function      对列表扩孔展示，可以增加dom元素
   *      ex: render: (h, params) => {
                return h('el-tag', {
                  props: {type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger'} // 组件的props
                }, params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中')
              }
   *  @param operates         操作按钮配置
   *    width: String|Number  列宽
   *    fixed: Boolean        是否固定
   *    isInline: Boolean     是否一行显示 默认多行
   *    isButton: Boolean     是否文本时按钮格式
   *    height: String        一行模式下的行高度
   *    isFold: Boolean       超过3个按钮时是否收缩
   *    list:  Array          按钮组
   *      label: String         文本
   *      type: String['normal', 'delete'] 是否删除类型的
   *      btnType:  String[primary|success|warning|danger|info|text] 类型
   *      show:  Boolean        是否显示
   *      icon:  String         按钮图标
   *      plain: Boolean        是否普通按钮
   *      disabled: Boolean     是否禁用
   *      method:   Function    回调方法
   *  @param options         表格配置项
   *    loading: Boolean      是否正在加载
   */

const renderTip = (createElement, { column }) => {
  return createElement('span', { class: 'renderTableHead' }, [
    createElement('span', [`${column.label}`])
  ])
}
export default {
  name: "TableComponent",
  components: {
    ButtonGroup,
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },

  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    sortable:{
      type: Boolean,
      default: () => false
    },
    showSummary: {
      default: false,
      type: Boolean,
    },
    tableColumn: {
      type: Array,
      default: () => []
    },

    operates: {
      type: Object,
      default: () => ({})
    },

    options: {
      type: Object,
      default: () => ({
        border: false, // 是否带有纵向边框
        stripe: false, // 是否为斑马纹 table
        fit: true, // 列的宽度是否自撑开
        showHeader: true, // 是否显示表头
        highlightCurrentRow: true, // 是否要高亮当前行
        mutiSelect: false, // 是否多项选择
        loading:false, //是否正在加载
      })
    },
    summaryMethod: Function
  },

  data: function() {
    return {
      multipleSelection: []
    }
  },

  methods: {
    // 根据rows条件显示按钮
    showListRow(list,rows){
      return list.filter(_x=> {
       return _x.filter?(_x.filter(rows)?_x:''):_x
      });
    },
    showTip(createElement, { column }) {
      // tip为需要显示的提示内容
      return renderTip(createElement, { column })
    },

    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },

    sortchange({ column, prop, order }) {
      this.$emit('sortchange', { column, prop, order })
    }
  }
}
</script>

<style scoped lang="scss">
.operate-group{
  float: left;
  .item {
    display: inline-block;
    margin-top: 5px;
    margin-right: 5px;
  }
}
</style>
