<template>
    <div>
        <ol>
            <li>在原有dialog基础上底部增加‘确定’和‘取消’按钮</li>
            <li>支持dialog所有属性和事件</li>
            <li>支持dialog放大缩小可拖拽</li>

        </ol>
        <el-button @click="editSome" type="primary">打开对话框</el-button>
        <dialog-with-btn v-el-drag-dialog  title="对话框标题" :close-on-click-modal="false"  @cancelEvent="cancelCallback" @sureEvent="sureCallback" :visible.sync="visible">
            这是一个对话框
        </dialog-with-btn>

<!--        <dialog-with-btn-x title="对话框标题" :close-on-click-modal="false"  @cancelEvent="cancelCallback" @sureEvent="sureCallback" :visible.sync="visible">-->
<!--            这是一个对话框-->
<!--        </dialog-with-btn-x>-->
    </div>

</template>

<script>
    // const DialogWithBtnX = () => import('@/components/common/DialogWithBtn');

    export default {
        name: 'test-dialog',
        // components: {
        //     DialogWithBtnX,
        // },
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            editSome() {
                this.visible = true
                console.log('点击了编辑')
            },
            cancelCallback() {
                console.log('点击了取消按钮')
            },
            sureCallback() {
                console.log('点击了确定按钮')
            },
        },
    }
</script>

<style scoped>

</style>
