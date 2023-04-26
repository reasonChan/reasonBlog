<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
    />
    <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueEditor"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import {user} from "../store/index.js";
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(["update:model-value",'update:textValue'])
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
// 内容 HTML
let valueEditor = ref('');
let textEditor = ref('')
let initFlag = ref(false)
const toolbarConfig = {};
const editorConfig = { placeholder: '' };
const mode = ref('default')

nextTick(() => {
  valueEditor.value = props.modelValue
  initFlag.value = true
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
  console.log('created', editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = async (editor) => {
  if(initFlag){
    textEditor.value = editor.getText()
    emit("update:model-value", valueEditor.value)
    emit('update:textValue', textEditor.value)
    console.log('change:', editor.getHtml());
  }
};
//上传图片设置
let token = 'Bearer ' + user().token
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/api/upload/images',
  base64LimitSize: 10 * 1024, // 小于10kb变成base64
  headers: {
    'Authorization' : token
  }
}
</script>

<style scoped>

</style>
