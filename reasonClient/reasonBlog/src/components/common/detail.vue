<template>
  <div class="articleItem-main">
    <h3 class="articleItem-title" v-html="$xss(articleTitle)"></h3>
    <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueEditor"
        style="height: 100%; overflow-y: hidden"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor} from '@wangeditor/editor-for-vue';
import {defineProps, onBeforeUnmount, reactive, ref, shallowRef, watch} from 'vue'
const props = defineProps({
  articleTitle: {
    type: String   //动态路由传参
  },
  articleContent: {
    type: String   //动态路由传参
  }
})
let valueEditor = ref('')
watch(()=>props.articleContent, (newVal, oldVal) => {
  valueEditor.value = newVal
})

//富文本编辑器显示正文
const editorRef = shallowRef();
// 内容 HTML
let textEditor = ref('')

const editorConfig = {
  placeholder: '',
  readOnly: true,
  scroll: false,
  MENU_CONF: {}
};

const mode = ref('default')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！

};
</script>

<style scoped>
.articleItem-main{
  margin: 0 auto;
  max-width: 600px;
}
.articleItem-title{
  margin: 25px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  color: #2c3e50;
}
</style>

