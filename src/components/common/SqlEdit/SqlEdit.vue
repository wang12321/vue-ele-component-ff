<template>
  <div class="sqlView">
    <div class="toolView" v-if="isShowTool">
      <div style="text-align: right;padding-right: 40px">
        <el-tooltip class="item" effect="dark" content="格式化" placement="top">
          <i :class="icon[0]" style="color:#409eff;" @click="formatSql"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="复制代码" placement="top">
          <i :class="icon[1]" style="color:#409eff;" @click="copy"></i>
        </el-tooltip>
      </div>
    </div>
    <codemirror v-model="codeData" :options="cmOptionsInitAssign" />
  </div>
</template>

<script>

// 引入vue-codemirror
import { codemirror } from 'vue-codemirror'
// codeMirror核心样式
import 'codemirror/lib/codemirror.css'
// 不同语言对应的不同高亮js，vue中使用无法直接加载，只好在组件中再次引入，想要设置哪些高亮就添加对应mode的js文件
import 'codemirror/mode/sql/sql.js'

import { format } from 'sql-formatter'

export default {
  name: 'SQLEdit',
  components: {
    codemirror
  },
  props: {
    icon: {
      type: Array,
      default: () => {
        return ['el-icon-s-operation','el-icon-document-copy']
      }
    },
    isShowTool: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: () => ''
    },
    message: {
      type: String,
      default: () => '复制成功'
    },
    cmOptions:{
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      cmOptionsInit:{
        tabSize: 4,
        mode: 'text/x-pgsql',
        lineNumbers: true,
        matchBrackets: true, // 括号匹配
        line: true,
        indentWithTabs: true, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
        smartIndent: true, // 自动缩进, 默认为 true
        cursorHeight: 1,
        lineWrapping: true,
        readOnly: false // 编辑器是否只读。如果设置为预设的值 “nocursor”，那么除了设置只读外，编辑区域还不能获得焦点。
      }
    }
  },
  computed: {
    cmOptionsInitAssign(){
      return Object.assign({...this.cmOptionsInit},{...this.cmOptions})
    },
    codeData: {
      set(val) {
        this.$emit('update:code', val)
      },
      get() {
        return this.code
      }
    }
  },
  mounted() {
  },
  methods: {
    // 格式化
    formatSql() {
      this.codeData = format(this.codeData, { language: 'postgresql' })
    },
    copy(){
      this.$copyText(this.code).then(() => {
        this.$message.success(this.message)
      }, () => {
        this.$message.error('复制失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sqlView{
}
.toolView{
  position: relative;
  width: 100%;
  height: 45px;
  background: #f7f7f7;
}
.item{
  width: 45px;
  height: 45px;
  line-height: 45px;
}
</style>
