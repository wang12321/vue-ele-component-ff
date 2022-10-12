<template>
  <div>
    <el-button v-bind="$attrs"
               v-on="$listeners"
               :type="type"
               :icon="icon"
               :size="size"
               @click="download"
               style="margin-left:10px;"
               :style="{'background-color':color,'borderColor':color}">
      {{name}}
    </el-button>
    <a ref="aHref" style="color: #ffffff;display: none"></a>
  </div>
</template>

<script>
/**
 * @author ff
 * @date 2021/7/31
 * @Description: 下载模板组件 props里面的属性是对按钮样式的改变，默认与原来保持一致
 * @update by: 简单使用方式：<download ref="download" @downloadAction="downloadData"></download>
 *           this.$refs.download.aHrefAction(res.data, downloadName);
 */
export default {
  name: 'DownLoad',
  props: {
    color: {
      type: String,
      default: '#67C23A',
    },
    type: {
      type: String,
      default: 'success',
    },
    icon: {
      type: String,
      default: 'el-icon-document',
    },
    size: {
      type: String,
      default: 'mini',
    },
    name: {
      type: String,
      default: '下载',
    },
  },
  methods: {
    download() {
      this.$emit('downloadAction')
    },
    /**
     *
     * @param data 请求下载返回的数据
     * @param downloadName 下载文件名称
     */
    aHrefAction(data, downloadName = 'data.xlsx') {
      let blob = data
      blob = new Blob([blob], { type: 'text/csv;charset=utf-8;' })
      const aHref = this.$refs.aHref
      aHref.href = URL.createObjectURL(blob);
      aHref.download = downloadName
      aHref.click()
    },
  },
}
</script>

<style scoped>

</style>
