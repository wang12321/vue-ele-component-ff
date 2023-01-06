<template>
  <div
    class="btn-group"
    :class="'btn-group-inline'"
    :style="{ height: height || 'auto' }"
  >
    <template v-if="isButton">
      <template>
        <div class="btn-list">
          <template v-for="(btn, key) in list">
            <template v-if="btn.type === 'delete'">
              <el-popconfirm
                :key="key"
                :title="btn.label || '这是一段内容确定删除吗？'"
                :confirm-button-text="btn.deleteConfirmText || '确定'"
                :cancel-button-text="btn.deleteCancelText || '取消'"
                icon="el-icon-info"
                icon-color="red"
                class="delete-btn"
                @onConfirm="btn.method(key, rowData)"
              >
                <el-button
                  slot="reference"
                  :type="btn.btnType"
                  :size="btn.size || size || 'mini'"
                  :icon="btn.icon"
                  :disabled="btn.disabled"
                  :plain="btn.plain"
                  class="button"
                >
                  删除
                </el-button>
              </el-popconfirm>
            </template>
            <template v-else-if="btn.type === 'popconfirm'">
              <el-popconfirm
                  :key="key"
                  :title="btn.popLabel || ''"
                  :confirm-button-text="btn.deleteConfirmText || '确定'"
                  :cancel-button-text="btn.deleteCancelText || '取消'"
                  icon="el-icon-info"
                  icon-color="red"
                  class="delete-btn"
                  @onConfirm="btn.method(key, rowData)"
              >
                <el-button
                    slot="reference"
                    :type="btn.btnType"
                    :size="btn.size || size || 'mini'"
                    :icon="btn.icon"
                    :disabled="btn.disabled"
                    :plain="btn.plain"
                    class="button"
                >
                  {{btn.label }}
                </el-button>
              </el-popconfirm>
            </template>
            <template v-else-if="btn.type === 'dropdown'">
              <el-dropdown :key="key" class="dropdownBtn">
                <el-button
                    :type="btn.btnType"
                    :size="btn.size || size || 'mini'"
                    :icon="btn.icon"
                    :disabled="btn.disabled"
                    :plain="btn.plain"
                    class="button"
                >
                  {{btn.label }}
                  <i style="margin: 0" class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(itemBtn,index) in  btn.dropdownList" :key="index" @click.native.prevent="itemBtn.method(index, rowData)">
                    {{ itemBtn.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <el-button
              v-else
              :key="key"
              :type="btn.btnType"
              :size="btn.size || size || 'mini'"
              :icon="btn.icon"
              :disabled="btn.disabled"
              :plain="btn.plain"
              class="button"
              @click.native.prevent="btn.method(key, rowData)"
            >
              {{ btn.label }}
            </el-button>
          </template>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="btn-list">
        <template v-for="(btn, key) in list">
          <template v-if="btn.type === 'delete'">
            <el-popconfirm
              :key="key"
              :title="btn.label || '这是一段内容确定删除吗？'"
              :confirm-button-text="btn.deleteConfirmText || '确定'"
              :cancel-button-text="btn.deleteCancelText || '取消'"
              icon="el-icon-info"
              icon-color="red"
              class="text-del-btn"
              @onConfirm="btn.method(key, rowData)"
            >
              <el-button
                slot="reference"
                type="text"
                :icon="btn.icon"
                :size="btn.size || size || 'mini'"
              >删除</el-button>
            </el-popconfirm>
          </template>
          <template v-else-if="btn.type === 'popconfirm'">
            <el-popconfirm
                :key="key"
                :title="btn.popLabel || ''"
                :confirm-button-text="btn.deleteConfirmText || '确定'"
                :cancel-button-text="btn.deleteCancelText || '取消'"
                icon="el-icon-info"
                icon-color="red"
                class="delete-btn"
                @onConfirm="btn.method(key, rowData)"
            >
              <el-button
                  slot="reference"
                  type="text"
                  :icon="btn.icon"
                  :size="btn.size || size || 'mini'"
              >
                {{btn.label }}
              </el-button>
            </el-popconfirm>
          </template>
          <template v-else-if="btn.type === 'dropdown'">
            <el-dropdown :key="key + 100" class="dropdownBtn">
              <el-button
                  type="text"
                  :icon="btn.icon"
                  :size="btn.size || size || 'mini'"
              >
                {{btn.label }}
                <i style="margin: 0" class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(itemBtn,index) in btn.dropdownList" :key="index" @click.native.prevent="itemBtn.method(index, rowData)">
                  {{ itemBtn.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <el-button
            v-else
            style="margin-left: 5px"
            :key="key"
            type="text"
            :icon="btn.icon"
            :size="btn.size || size || 'mini'"
            :disabled="btn.disabled"
            @click="btn.method(key, rowData)"
          >{{ btn.label }}</el-button>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import ElPopconfirm from "../Popconfirm/Popconfirm.vue";
export default {
  name: 'ButtonGroup',
  components:{
    ElPopconfirm,
  },
  props: {
    size: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: ''
    },
    isButton: {
      type: Boolean,
      default: true
    },
    rowData: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Array,
      required: true,
      default: () => ([
        {
          type: 'normal',
          btnType: 'default',
          label: '',
          method: (key, value) => {
            console.log(key, value)
          }
        }
      ])
    }
  }
}
</script>

<style scoped lang="scss">
  .btn-group {
    width: 100%;
    height: auto;

    &.btn-group-inline {
      width: 100%;
      height: 100%;

      .btn-list {
        width: 100%;
        height: 100%;
        display: flex;
      }
    }

    .button {
      margin-left: 5px;
      margin-top: 5px;

      &:first-child {
        margin-left: 0;
      }
    }

    .delete-btn {
      display: inline-block;

      button, button:first-child {
        margin-left: 5px;
      }
    }

    .text-del-btn {
      padding-left: 10px;
    }
    .text-btn {
      padding: 10px 15px;
      display: inline-block;
      cursor: pointer;

      &[type=primary] {
        color: #1890ff;

        &:hover {
          color: #515254;
        }
      }

      &[type=normal] {
        color: #464646;

        &:hover {
          color: #515254;
        }
      }

      &[type=warning] {
        color: #E6A23C;

        &:hover {
          color: #515254;
        }
      }

      &[type=danger] {
        color: #F56C6C;

        &:hover {
          color: #515254;
        }
      }
    }
  }

  .dropdownBtn{
    margin-left: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
