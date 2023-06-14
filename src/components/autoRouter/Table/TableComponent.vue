<template>
  <div>
    table组件，支持自定义每个单元格显示的内容，另外组件引入了buttonGroup组件和Popconfirm组件
    <div>
      Popconfirm组件在本elementUI版本是没有的，需要自行封装引入
    </div>
    <el-container>
      <el-main>
        <TableComponent
            :table-data="tableData"
                        :table-column="tableColumn"
                        :operates="operates"
                        @sortchange="sortchange">

          <template>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{props.row}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

          </template>
          <template v-slot:cs="{ row }" >
            <el-table-column :label="row.label">
              <template slot-scope="props">
                <span>{{ props.row[row.prop] }}</span>
              </template>
            </el-table-column>
          </template>

          <template v-slot:extension="slotProp">
            <el-button size="mini" style="margin: 5px">{{ slotProp.row.tzmc }}</el-button>
          </template>
        </TableComponent>

        <div style="margin: 20px">多选table</div>
        <TableComponent
            ref="TableComponentRef"

            :table-data="tableData"
                        :table-column="tableColumn"
                        :options="optionsMulti"
                        :operates="operatesMulti"
                        @sortchange="sortchange"
                        @handleSelectionChange="handleSelectionChange">
        </TableComponent>
      </el-main>
    </el-container>
  </div>

</template>

<script>
const renderTip = (createElement, { column }, tip) => {
  return createElement('span', { class: 'renderTableHead' }, [
    createElement('span', [`${column.label}`]),
    createElement('el-tooltip', { attrs: { content: tip, placement: 'top' } }, [
      createElement('span', [
        createElement('span', {
          attrs: {
            class: 'el-icon-question tableHeaderIcon',
          },
        }),
      ]),
    ]),
  ])
}
export default {
  name: "TableComponentView",
  data(){
    return{
      tableData:[{
        tzmc:'游戏',
        lrsj:'2020-02-02',
        xgsj:'2020-03-03',
        gxlx:'全平台aksdjbakjsdbaskjdbaksdbkasdbkasjdbkasjdbajksdbksajdbksj'
      },
        {
          tzmc:'游戏1',
          lrsj:'2020-02-02',
          xgsj:'2020-03-03',
          gxlx:'全平台'
        }],
      tableColumn: [
        // {
        //   slot:'mutiSelect'
        // },
        {
          label: '测试',
          prop: 'tzmc',
          slot: 'cs'
        },
        {
          label: '名称',
          prop: 'tzmc',
          align: 'left',
          showTip:(h, {column}) => {
            return  renderTip(h, {column},'tip')
          }
        },
        {
          label: '权限',
          prop: 'gxlx',
          align: 'left',
          showOverflowTooltip:true,
          render: (h, params) => {
              return h('span', {style:"color: dodgerblue"}, params.row.gxlx)
          }
        }, {
          label: '创建时间',
          prop: 'lrsj',
          formatter:(row)=>{
            return `<span style="color: dodgerblue;">${row.lrsj}</span>`
          },
        }, {
          label: '更新时间',
          prop: 'xgsj'
        }
      ],
      options: {
        showHeader: false,
        loading: false,
        border: true,
        className: 'table-class'
      },
      optionsMulti: {
        mutiSelect: true,
        stripe:true,
        highlightCurrentRow: true,
        loading: true,
        border: true,
        className: 'table-class'
      },
      operates: {
        align: 'left',
        width: '380px',
        fixed:'right',
        label: '操作',
        list: [
          {
            label: '查看',
            show: true,
            filter:(row)=>{
              return row.tzmc === '游戏'
            },
            btnType: 'primary',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('查看')
            }
          },

          {
            label: '更多',
            show: true,
            btnType: 'primary',
            type: 'dropdown',
            plain: true,
            dropdownList:[{
              name: '更多1',
              method: (index, row) => {
                console.log(index, row)
                alert('更多1')
              }
            },{
              name: '更多2',
              method: (index, row) => {
                console.log(index, row)
                alert('更多2')
              }
            },],
            method: (index, row) => {
              console.log(index, row)
              alert('更多')
            }
          },
          {
            label: '编辑',
            show: true,
            btnType: 'danger',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('编辑')
            }
          },
          {
            label: '都否删除当前数据?',
            show: true,
            type: 'delete',
            btnType: 'danger',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('删除')
            }
          },
        ]
      },
      operatesMulti: {
        isButton:false,
        width: '280px',
        label: '操作',
        list: [
          {
            label: '查看',
            show: true,
            btnType: 'primary',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('查看')
            }
          },
          {
            label: '更多',
            show: true,
            btnType: 'popconfirm',
            type: 'dropdown',
            plain: true,
            dropdownList:[{
              name: '更多1',
              method: (index, row) => {
                console.log(index, row)
                alert('更多1')
              }
            },{
              name: '更多2',
              method: (index, row) => {
                console.log(index, row)
                alert('更多2')
              }
            },],
            method: (index, row) => {
              console.log(index, row)
              alert('更多')
            }
          },
          {
            label: '编辑',
            show: true,
            btnType: 'danger',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('编辑')
            }
          },
          {
            label: '都否删除当前数据?',
            show: true,
            type: 'delete',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('删除')
            }
          },
        ]
      },
    }
  },
  mounted() {
    setInterval(()=>{
      this.optionsMulti.loading = false

    },4000)
  },
  methods:{
    sortchange(e){
      console.log(e)
      alert(e.column.label + '排序')
    },
    handleSelectionChange(e){
      console.log(123123,this.$refs.TableComponentRef)
      console.log(123123,this.$refs.TableComponentRef.$refs.ffTableRef)
      console.log(123123,e)

      // this.$refs.TableComponentRef.$refs.ffTableRef.toggleRowSelection(this.tableData[0])

      alert('已选择'+e.length)
    }
  }
}
</script>

<style scoped>

</style>
