<template>
  <div style="margin-top:20px;" class="search-form-advanced">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="formData"
      :rules="rules"
      class="demo-form-inline"
      :label-width="labelWidth"
      v-bind="$attrs"
      v-on="$listeners"
      @submit.native.prevent
    >
      <div v-for="item in formOptions" :key="item.key" style="display:inline-block">
        <template v-if="!item.isHideForm">
          <el-form-item v-if="isAdvanced ? checkIsShow(item) : checkIsShowDefault(item)" :prop="item.key" :label="!item.titleShow ? item.title+'：':''" :label-width="item.labelWidth || labelWidth" :class="item.class ? item.class : ''">
            <el-input
                v-if="item.type === 'input'"
                v-model="formData[item.key]"
                :maxlength="item.maxlength"
                :minlength="item.minlength"
                :clearable="item.clearable"
                :disabled="item.disabled"
                :size="item.size"
                :prefix-icon="item.prefixIcon"
                :suffix-icon="item.suffixIcon"
                :readonly="item.readonly"
                :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                :style="item.width ? `width:${item.width}` : ''"
                @focus="item.focus?item.focus():null"
                @change="item.change?item.change():null"
            />
            <el-date-picker
                v-else-if="item.type==='month'"
                v-model="formData[item.key]"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择月份"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='year'"
                v-model="formData[item.key]"
                type="year"
                value-format="yyyy"
                placeholder="请选择年"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-select
                v-else-if="item.type==='select'"
                ref="Select"
                v-model="formData[item.key]"
                :multiple="item.multiple"
                :multiple-limit="item.multipleLimit"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :remote="item.remote"
                :size="item.size"
                :disabled="item.disabled"
                :collapse-tags="item.collapsetags"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :style="item.width ? `width:${item.width}` : ''"
                :filter-method="item.filterMethod"
                :remote-method="item.remoteMethod"
                @change="item.change ? item.change() : null"
            >
              <el-option
                  v-for="option in item.options"
                  :key="option[item.label]+option[item.value]"
                  :label="option[item.label]"
                  :value="option[item.value]"
                  :disabled="option.disabled"
              />
            </el-select>
            <el-select
                v-else-if="item.type==='selectID'"
                ref="Select"
                v-model="formData[item.key]"
                :multiple="item.multiple"
                :multiple-limit="item.multipleLimit"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :disabled="item.disabled"
                :remote="item.remote"
                :size="item.size"
                :collapse-tags="item.collapsetags"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :style="item.width ? `width:${item.width}` : ''"
                :filter-method="item.filterMethod"
                :remote-method="item.remoteMethod"
                @change="item.change ? item.change() : null"
            >
              <el-option
                  v-for="option in item.options"
                  :key="option[item.label]+option[item.value]"
                  :label="option[item.label]+'('+option[item.value]+')'"
                  :value="option[item.value]"
                  :disabled="option.disabled"
              />
            </el-select>
            <el-time-picker
                v-else-if="item.type==='time'"
                v-model="formData[item.key]"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="HH:mm:ss"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='datetime'"
                v-model="formData[item.key]"
                type="datetime"
                :clearable="item.clearable"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='datetimeNO'"
                v-model="formData[item.key]"
                type="datetime"
                :clearable="item.clearable"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="yyyyMMddHHmmss"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='date'"
                v-model="formData[item.key]"
                type="date"
                :clearable="item.clearable"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="yyyy-MM-dd"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='dateH'"
                v-model="formData[item.key]"
                type="date"
                :clearable="item.clearable"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                value-format="yyyy-MM-dd HH:mm:ss"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='datetimerange'"
                v-model="formData[item.key]"
                type="datetimerange"
                :clearable="item.clearable"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-date-picker
                v-else-if="item.type==='daterange'"
                v-model="formData[item.key]"
                type="daterange"
                :clearable="item.clearable"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <el-cascader
                v-else-if="item.type==='cascader'"
                v-model="formData[item.key]"
                :options="item.options"
                :clearable="item.clearable"
                :props="item.props"
                :collapse-tags="item.collapseTags"
                :show-all-levels="item.showAllLevels"
                :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                :style="item.width ? `width:${item.width}` : ''"
            />
            <div v-else-if="item.type==='radio'" style="text-align: left" >
              <el-radio-group v-model="formData[item.key]" :size="item.size" :readonly="item.readonly" @change="item.change ? item.change() : null">
                <el-radio-button v-for="option in item.options"
                                 :key="option[item.label]"
                                 :label="option[item.label]">
                </el-radio-button>
              </el-radio-group>
            </div>
            <div v-else-if="item.type==='checkbox'" style="text-align: left" >
              <el-checkbox-group v-model="formData[item.key]" :size="item.size" :readonly="item.readonly" @change="item.change ? item.change() : null">
                <el-checkbox v-for="option in item.options"
                             :key="option[item.label]"
                             :label="option[item.label]"
                             :border="item.border"
                             :disabled="item.disabled"
                >
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-else-if="item.type==='inputNumber'" style="text-align: left">
              <el-input-number v-model="formData[item.key]"
                               controls-position="right"
                               @change="item.change ? item.change() : null"
                               :min="item.min"
                               :max="item.max"
                               :style="item.width ? `width:${item.width}` : ''"
              >
              </el-input-number>
            </div>
            <div v-else-if="item.type==='switch'" style="text-align: left">
              <el-switch
                  v-model="formData[item.key]"
                  :active-text="item.activeText"
                  :inactive-text="item.inactiveText">
              </el-switch>
            </div>
            <div v-else-if="item.type==='datePicker'" style="text-align: left">
              <date-picker-has-ops @changeDate="item.change ? item.change($event) : null" :searchDateRange="formData[item.key]"></date-picker-has-ops>
            </div>
            <div v-else-if="item.type==='slot'" style="text-align: left">
              <expand-dom :item="item" :render="item.render"/>
            </div>
            <div v-else-if="item.type==='slotFormItem'" style="text-align: left">
              <slot :name="item.key" />
            </div>
          </el-form-item>
        </template>
      </div>
      <el-form-item v-if="$scopedSlots['formItem']">
        <slot name="formItem" />
      </el-form-item>
      <el-form-item v-if="(isAdvanced ? open || mode == 'normal' : true)&& this.$listeners['submit']">
        <el-button type="primary" native-type="submit" :icon="submitBtn.icon" @click="save('searchForm')">{{ submitBtn.name }}</el-button>
      </el-form-item>
      <el-form-item v-if="(isAdvanced ? open || mode == 'normal' : true) && this.$listeners['reset']">
        <el-button icon="el-icon-refresh" @click="rest('searchForm')">重置</el-button>
      </el-form-item>
      <el-form-item v-if="$scopedSlots['button']">
        <slot name="button" />
      </el-form-item>
      <el-form-item v-if="isAdvanced && !isSearch">
        <div id="AdvancedSearch" type="primary" :icon=" open ? 'el-icon-arrow-up':'el-icon-arrow-down'" @click="changeOpen">高级搜索</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DatePickerHasOps from '../DatePickerHasOps/DatePickerHasOps'

/**
 * @author ff
 * @date 2021/3/24
 * @Description: 表单搜索组件
 * @update by:
 * @param {Function} searchSubmit       必传，表单提交
 * @param {Function} reset              选传，表单重置方法,不传没有重置按钮
 * @param {Boolean} isAdvanced          选传，是否开启高级搜索，默认关闭
 * @param {String} mode                 选传，开启高级组件时有效，值为['normal':正常模式, 'special':特殊模式,只显示一个关键字搜索框在外面]，默认为normal模式
 * @param {Boolean} clearable           选传，是否开启清除，默认开启
 * @param {Object} formOptions          必传，表单项
 *        @param {Boolean} titleShow    选传，表单项label是否显示，为true时显示，默认false
 *       @param {String} title          必传，表单项label
 *       @param {String} key            必传，表单项model
 *        @param {String} placeholder   选传，表单项placeholder
 *       @param {String} type           必传, 表单项type:['input','select','month','year','cascader','date','daterange','datetimerange','dateH',','time','datetime','radio','checkbox','inputNumber','datePicker','slot']
 *       @param {String} options        选传，type为select,radio时有效
 *       @param {String} label          选传，type为select,radio时有效，option label
 *       @param {String} value          选传，type为select时有效，option value
 *       @param {String} width          选传，设置input宽度
 *       @param {Boolean} isAdvanced    选传，当mode为normal时有效，为true时显示在高级搜索外面，默认false
 *       @param {Boolean} hidden        选传，是否显示当前表单项，默认false
 *       @param {Function} change       选传，@change回调事件
 *       @param {String} activeText     选传，type为switch时有效
 *       @param {String} inactiveText   选传，type为switch时有效
 *       @param {String} min            选传，type为inputNumber时有效
 *       @param {String} max            选传，type为inputNumber时有效
 *       @param {Boolean} border        选传，checkbox 有效
 *       @param {Boolean} disabled      选传，disabled 默认关闭
 * @param {object} formData             必传，表单数据存储对象
 * @param {String} labelWidth           选传，表单label宽度，默认'100px'
 * @param {Object} submitBtn            选传，表单提交按钮，默认{ icon: "el-icon-search", name: "查询" }
 * @param {Object} rules                选传，表单校验规则，详见 element ui rules 规则
 * @param {String} placeholder          选传，special模式下关键字搜索input提示
 */

export default {
  name: 'SearchForm',
  props: {
    formOptions: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    isAdvanced: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      default: 'normal',
    },
    labelWidth: {
      type: String,
      required: false,
      default: '100px',
    },
    submitBtn: {
      type: Object,
      required: false,
      default: () => ({
        icon: 'el-icon-search',
        name: '查询',
      }),
    },
    rules: {
      type: Object,
      required: false,
    },
    placeholder: {
      type: String,
    },
  },
  components: {
    DatePickerHasOps,
    expandDom: {
      functional: true,
      props: {
        render: Function,
        item: {
          type: Object,
          default: {}
        }
      },
      render: (h, ctx) => {
        const params = {
          item: ctx.props.item,
        }
        if (ctx.props.item) params.item = ctx.props.item
        return ctx.props.render(h, params)
      }
    }
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    checkIsShow(item) {
      if (this.mode === 'normal') {
        // 当 hidden 为 true 时隐藏
        if (item.hidden) return false;
        // 当isAdvanced为true时一直显示
        else if (item.isAdvanced === true) return true;
        // 否则当open为true时显示，否则隐藏
        else if (this.open) return true;
        return false;
      } else if (this.mode === 'special') {
        // 当 hidden 为 true 时隐藏
        if (item.hidden) return false;
        // 否则当open为true时显示，否则隐藏
        else if (this.open) return true;
        return false;
      }
    },
    checkIsShowDefault(item) {
      if (item.hidden) return false;
      return true;
    },
    changeOpen() {
      this.open = !this.open;
      this.$emit('reset');
    },
    save(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过
          this.$emit('submit');
        } else {
          return false;
        }
      });
    },
    rest() {
      this.$emit('reset');
    }
  },
};
</script>

<style>
.search-form-advanced .el-input-group__append{
  background: #1890ff;
  border: 1px solid #1890ff;
  color: #fff;
  font-size: 20px;
}
</style>
