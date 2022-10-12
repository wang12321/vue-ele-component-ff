<template>
  <el-input
    slot="reference"
    ref="input"
    v-bind="$attrs"
    v-model="labelModel"
    suffix-icon="el-icon-coin"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="handleBlur"
    @change="handleChange"
    @focus="handlefoucs"
    @clear="onClickclear"
  >
    <span slot="suffix">/ 元 </span>
  </el-input>
</template>

<script>

/**
   * @author ff
   * @date 2021/4/19
   * @Description:金额输入框组件
   * @update by:
   */
export default {
  name: 'InputMoney',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: [String, Number],
    clearable: {
      type: Boolean,
      required: false,
      default: true
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入金额'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      inputData: {
        valueModel: ''
      }
    }
  },
  computed: {
    labelModel: {
      get: function() {
        return this.formatInput()
      },
      set: function() {
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.inputData.valueModel = val.toString().indexOf('.') > 0 ? val.toString() : val.toString() + '.00'
      } else {
        this.inputData.valueModel = ''
      }
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.value) {
        this.inputData.valueModel = this.value.toString().indexOf('.') > 0 ? this.value.toString() : this.value.toString() + '.00'
      } else {
        this.inputData.valueModel = ''
      }
    })
  },
  methods: {
    handleBlur() {
      this.inputData.valueModel = this.inputData.valueModel.replace(/[^0-9.]/g,'')
      if (this.inputData.valueModel.indexOf('.') < 0 && this.inputData.valueModel.length !== 0) {
        this.inputData.valueModel = this.inputData.valueModel + '.00'
      }
      if(this.inputData.valueModel.length === 0){
        this.inputData.valueModel = '0.00'
      }
    },
    handleInput(val) {
      this.inputData.valueModel = val.replace(/[^0-9.]/g,'')
    },
    handleChange(val) {
      const result = val.replace(/,/g, '').replace(/[^0-9.]/g,'')
      if (val.indexOf('.') > 0) {
        const xsd = val.substr(val.indexOf('.'), 3)
        if (xsd.length === 3) {
          this.$emit('input', result)
        }
        if (xsd.length === 2) {
          this.$emit('input', result + '0')
        }
        if (xsd.length === 1) {
          this.$emit('input', result + '00')
        }
      } else {
        this.$emit('input', result)
      }
    },
    onClickclear() {
      this.inputData.valueModel = ''
      this.$emit('input', this.inputData.valueModel)
    },
    /**
     * 格式化显示的金额样式123,123.00
     * @returns {string}
     */
    formatInput() {
      const str = JSON.parse(JSON.stringify(this.inputData)).valueModel
      let nopointstr = str
      let xsd = ''
      if (str.indexOf('.') > 0) { // 如果包含小数点
        nopointstr = str.substring(0, str.indexOf('.'))
        xsd = str.substr(str.indexOf('.'), 3)
      }
      nopointstr=nopointstr.replace(/[^0-9.]/g,'')
      nopointstr = nopointstr.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
      return nopointstr + xsd
    },
    handlefoucs() {
      if (this.inputData.valueModel.indexOf('.00') > 0) {
       let nopointstr = this.inputData.valueModel.substring(0, this.inputData.valueModel.indexOf('.'))
        if(Number(nopointstr) > 0) {
          this.inputData.valueModel = this.inputData.valueModel.substring(0, this.inputData.valueModel.indexOf('.'))
        }else {
          this.inputData.valueModel = ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
