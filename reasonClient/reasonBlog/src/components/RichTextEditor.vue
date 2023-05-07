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
import '@wangeditor/editor/dist/css/style.css'
import {onBeforeUnmount, ref, shallowRef, onMounted, nextTick, watch, computed} from 'vue';
import {Toolbar, Editor} from '@wangeditor/editor-for-vue'
import {user} from "../store/index.js";
import {uploadImage} from '../api/upload'
let startTime = window.performance.now()
onMounted(()=>{
  let endTime = window.performance.now()
})
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

valueEditor.value = props.modelValue//父子传参后更新数据

nextTick(() => {
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
//file对象转化为图片url
const getFileUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

const canvasToFile = (canvas, filename) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      const file = new File([blob], filename, {type: 'image/jpeg'})
      resolve(file)
    })
  })
}
const loadImageAsync = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const canvas = document.createElement('canvas')
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      const watermarkWidth = image.width * 0.2
      const watermarkHeight = image.height * 0.2
      const x = image.width - watermarkWidth - 10
      const y = image.height - watermarkHeight - 10 //水印为高宽的20%， 距离右下都是10px
      const ctx = canvas.getContext('2d');


      ctx.drawImage(image, 0, 0);
      ctx.font = '24px Arial'; // 设置字体大小和样式

      const textWidth = ctx.measureText('@reason')
      const ratio = textWidth / watermarkWidth
      const fontHeight = 24
      const textHeight = ratio * fontHeight
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(x, y, watermarkWidth, textHeight)

      ctx.fillStyle = 'red'; // 设置字体颜色（白色）
      ctx.textBaseline = 'top'
      ctx.fillText('@reason', x, y); // 在 Canvas 上添加文本水印
      resolve(canvas)
    }
    image.onerror = ()=>{
    }
    image.src = url
  })
}
//
//上传图片设置
let token = 'Bearer ' + user().token
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/api/upload/images',
  base64LimitSize: 10 * 1024, // 小于10kb变成base64
  headers: {
    'Authorization': token
  },

  async customUpload(file, insertFn) {
    // file 即选中的文件
    // 自己实现上传，并得到图片 url alt href
    let base64 = await getFileUrl(file)
    let canvas = await loadImageAsync(base64)  //添加水印并返回对应base64
    let newFile = await canvasToFile(canvas, file.name)
    let formData = new FormData()
    formData.append("wangeditor-uploaded-image", newFile)
    const res = await uploadImage(formData)
    console.log('res',res)
    let [url, alt, href] = [res.data[0].url, res.data[0].alt, res.data[0].href]
    insertFn(url, alt, href)   // 最后插入图片
  }
}
// let valueEditor = computed(()=>{
//   let endTime = window.performance.now()
//   console.log(`子组件最终更新时间：${endTime-startTime}`)
//   return props.modelValue
// })
// watch(()=>props.modelValue, (newValue, oldValue) => {
//   // TODO: 处理路由变化
//   valueEditor.value = props.modelValue
//   console.log('watch到新数据并更新页面')
//   let endTime = window.performance.now()
//   console.log(`子组件最终更新时间：${endTime-startTime}`)
// })
</script>

<style scoped>

</style>
