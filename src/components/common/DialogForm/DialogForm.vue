<template>
  <div>
    <el-form v-bind="$attrs"
             v-on="$listeners" ref="ruleForm" :model="formData" :rules="rules" @submit.native.prevent>
      <el-row>
        <el-col v-for="item in formList" :key="item.key + item.title" :span="item.span?item.span:span">
          <template v-if="!item.isHideForm">
            <el-form-item
                :label="item.title+':'"
                :label-width="LabelWidth"
                :prop="rules && rules[item.key]!==undefined?item.key:''"
                :class="item.class ? item.class : ''"
            >
               <span slot="label" v-if="item.isLabel">
                {{ item.title}}
                 <el-tooltip :placement="item.desAlign || 'right'">
                  <div :class="item.desClassP ? item.desClassP : ''" slot="content">{{item.desContent || '描述信息'}}
                    <img v-if="item.desImg" :class="item.desClass ? item.desClass : ''" style="display: block" :src="item.desImg" alt="">
                  </div>
                  <el-button type="text" style="color: #001528"><i :class="item.icon || 'el-icon-question'"></i></el-button>
                 </el-tooltip>
                 :
              </span>
              <el-input
                  v-if="item.type === 'input'"
                  v-model="formData[item.key]"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :readonly="item.readonly"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  :size="item.size"
                  :prefix-icon="item.prefixIcon"
                  :suffix-icon="item.suffixIcon"
                  :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                  @change="item.change ? item.change() : null"
                  @focus="item.focus?item.focus():null"
              />
              <el-input
                  v-if="item.type === 'number'"
                  type="number"
                  v-model="formData[item.key]"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :readonly="item.readonly"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  :size="item.size"
                  :prefix-icon="item.prefixIcon"
                  :suffix-icon="item.suffixIcon"
                  :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                  @change="item.change ? item.change() : null"
                  @focus="item.focus?item.focus():null"

              />
              <el-input
                  v-else-if="item.type==='password'"
                  v-model="formData[item.key]"
                  type="password"
                  :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :readonly="item.readonly"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  :size="item.size"
                  :prefix-icon="item.prefixIcon"
                  :suffix-icon="item.suffixIcon"
                  @change="item.change ? item.change() : null"
                  @focus="item.focus?item.focus():null"
              />
              <el-input
                  v-else-if="item.type === 'textarea'"
                  v-model="formData[item.key]"
                  type="textarea"
                  :rows="item.rows"
                  autocomplete="off"
                  :placeholder="item.placeholder?item.placeholder:'请填写'+item.title"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :readonly="item.readonly"
                  :minlength="item.minlength"
                  :size="item.size"
                  @change="item.change ? item.change() : null"
                  @focus="item.focus?item.focus():null"
              />
              <el-select
                  v-else-if="item.type==='select'"
                  v-model="formData[item.key]"
                  :multiple="item.multiple"
                  :multiple-limit="item.multipleLimit"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  :filterable="item.filterable"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :remote-method="item.remoteMethod"
                  :remote="item.remote"
                  :loading="item.loading"
                  style="width: 100%;"
                  @focus="item.focus ? item.focus() : null"
                  @clear="item.clear ? item.clear() : null"
                  @change="item.change ? item.change() : null"
              >
                <el-option
                    v-for="option in item.options"
                    :key="option[item.label]+option[item.value]"
                    :label="option[item.label]"
                    :value="item.merge?`${option[item.value]}@${option[item.label]}`:option[item.value]"
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
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  :style="item.width ? `width:${item.width}` : ''"
                  :filter-method="item.filterMethod"
                  :remote-method="item.remoteMethod"
                  style="width: 100%;"
                  :loading="item.loading"
                  @focus="item.focus ? item.focus() : null"
                  @clear="item.clear ? item.clear() : null"
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
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='datetime'"
                  v-model="formData[item.key]"
                  type="datetime"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='datetimeNO'"
                  v-model="formData[item.key]"
                  type="datetime"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  value-format="yyyyMMddHHmmss"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='date'"
                  v-model="formData[item.key]"
                  type="date"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='year'"
                  v-model="formData[item.key]"
                  type="year"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  value-format="yyyy"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='month'"
                  v-model="formData[item.key]"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="请选择月份"
                  style="width: 100%"
              />
              <el-date-picker
                  v-else-if="item.type==='dateH'"
                  v-model="formData[item.key]"
                  type="date"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='datetimerange'"
                  v-model="formData[item.key]"
                  type="datetimerange"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
              />
              <el-date-picker
                  v-else-if="item.type==='daterange'"
                  v-model="formData[item.key]"
                  type="daterange"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
              />
              <el-cascader
                  v-else-if="item.type==='cascader'"
                  v-model="formData[item.key]"
                  :options="item.options"
                  :clearable="item.clearable"
                  :props="item.props"
                  :placeholder="item.placeholder?item.placeholder:'请选择'+item.title"
                  :collapse-tags="item.collapseTags"
                  :show-all-levels="item.showAllLevels"
                  style="width:100%;"
              />
              <div v-else-if="item.type==='radio'" style="text-align: left">
                <el-radio-group v-model="formData[item.key]" size="small">
                  <el-radio-button v-for="option in item.options"
                                   :key="option[item.label]"
                                   :label="option[item.label]"
                                   :disabled="item.disabled"
                  >
                  </el-radio-button>
                </el-radio-group>
              </div>
              <div v-else-if="item.type==='radioNO'" style="text-align: left">
                <el-radio-group v-model="formData[item.key]" size="small">
                  <el-radio v-for="option in item.options"
                            :key="option[item.label]"
                            :label="option[item.label]"
                            :disabled="item.disabled"
                  >
                  </el-radio>
                </el-radio-group>
              </div>
              <div v-else-if="item.type==='checkbox'" style="text-align: left">
                <el-checkbox-group v-model="formData[item.key]" size="small">
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
              <div v-else-if="item.type==='uploadImg'" style="text-align: left">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :file-list="formData[item.key]"
                    :on-change="item.change ? item.change : null"
                    :on-remove="item.change ? item.change : null"
                    :limit="item.limit"
                    accept="image/*">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                  </div>
                </el-upload>
              </div>
              <div v-else-if="item.type==='slot'" style="text-align: left">
                <expand-dom :item="item" :render="item.render"/>
              </div>
              <slot v-else-if="item.type==='slotFormItem'" :name="item.key" :row="item"/>
            </el-form-item>
            <el-form-item v-if="$scopedSlots['formItem']">
              <slot name="formItem" />
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" v-if="this.$listeners['CANCEL']">{{ closeText }}</el-button>
      <el-button :loading="loading" type="primary" @click="save('ruleForm')" v-if="this.$listeners['submit']">{{ submitText }}</el-button>
    </div>
  </div>
</template>

<script>
/**
 * @author ff
 * @date 2021/3/25
 * @Description: 表单提交组件
 * @update by:
 * @param {Function} save               必传，表单提交
 * @param {Function} close              必传，关 闭
 * @param {Boolean} clearable           选传，是否开启清除，默认开启
 * @param {Object} formList             必传，表单项
 *       @param {String} title          必传，表单项label
 *       @param {String} key            必传，表单项model
 *        @param {String} placeholder   选传，表单项placeholder
 *       @param {String} type           必传, 表单项type:['input','select','month','year',','cascader','date','daterange','datetimerange','dateH','dataNo','time','datetime','radio','checkbox','inputNumber','switch','uploadImg','slot']
 *       @param {String} options        选传，type为select,radio时有效
 *       @param {String} label          选传，type为select,radio时有效，option label
 *       @param {String} value          选传，type为select时有效，option value
 *       @param {Function} change       选传，@change回调事件 附件可以在这个方法中处理绑定
 *       @param {String} activeText     选传，type为switch时有效
 *       @param {String} inactiveText   选传，type为switch时有效
 *       @param {String} min            选传，type为inputNumber时有效
 *       @param {String} max            选传，type为inputNumber时有效
 *       @param {Boolean} border        选传，checkbox 有效
 *       @param {Boolean} disabled      选传，disabled 默认关闭
 *       @param {number} limit          选传，uploadImg有效 最大允许上传个数
 * @param {object} formData             必传，表单数据存储对象
 * @param {Number} span                 选传，一行放几个表单，默认一个
 * @param {String} LabelWidth           选传，表单label宽度，默认'140px'
 * @param {Object} rules                选传，表单校验规则，详见 element ui rules 规则
 */

export default {
  name: 'DialogForm',
  components: {
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
  props: {
    rules: {
      type: Object,
      required: false,
    },
    formList: {
      type: Array,
      required: true,
    },
    formData: {},
    LabelWidth: {
      type: String,
      required: false,
      default: '140px',
    },
    span: {
      type: Number,
      required: false,
      default: 24,
    },
    loading:{
      type: Boolean,
      required: false,
      default:false,
    },
    closeText: {
      type: String,
      required: false,
      default:'关 闭',
    },
    submitText: {
      type: String,
      required: false,
      default:'确 定',
    },
  },
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit('CANCEL');
    },
    save(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) { // 校验通过
          this.$emit('submit');
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.dialog-footer{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
