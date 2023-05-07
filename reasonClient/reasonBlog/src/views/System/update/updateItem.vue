<template>
  <el-form :model="addArticleForm" label-width="120px" ref="addArticleFormRef" :rules="addArticleFormRule">
    <el-form-item label="文章标题" class="form-item" prop="title">
      <el-input class="upload-input" v-model="addArticleForm.title" placeholder="请输入文章标题"/>
      <el-button type="primary" class="upload-btn" @click="upload(addArticleFormRef)">
        <span v-if="!loading">修改文章</span>
        <span v-else>上 传 中...</span>
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </el-form-item>
    <el-form-item label="文章分类" class="form-item" prop="tag">
      <el-select v-model="addArticleForm.tag" placeholder="请选择文章分类">
        <el-option v-for="key in user().articleTag.keys()" :label="key" :value="user().articleTag.get(key)"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章内容" class="form-item">
      <RichTextEditor  v-model="addArticleForm.content" v-model:textValue="addArticleForm.abstract"></RichTextEditor>
    </el-form-item>
  </el-form>
  <a href="javascript:alert('XSS')">66666</a>
</template>

<script setup>
import RichTextEditor from "../../../components/RichTextEditor.vue";
import {ref, reactive} from "vue";
import {user} from "../../../store/index.js";
import {addArticle, getArticleById, updateArticle} from "../../../api/system.js";
import {useRouter,useRoute} from "vue-router";
import xss from 'xss'
const route = useRoute()

const addArticleForm = reactive({
  tag: null, //Number类型
  title: '',
  content: null,
  img: '',
  abstract: ''
})

//
// const options = {
//   whiltList: {
//     script: ["src"]
//   }
// }
// const myxss = new xss.FilterXSS(options)
// console.log(myxss.process(addArticleForm.title), 'xss')
// console.log(myxss)
// let str = 'href=""'
// console.log(xss(str))

//请求数据
let {data} = await getArticleById(route.params.articleId)
addArticleForm.tag = data[0].tag
addArticleForm.title = data[0].title
addArticleForm.content = data[0].content


const addArticleFormRule = reactive({
  title: [
    { required: true, trigger: "blur", message: "请输入标题" },
    { min: 1, max: 50, message: '长度应该在1-50之间'}
  ]
})
const addArticleFormRef = ref()   //表单dom元素
let loading = ref(false)    //上传过程是否loading中flag
const router = useRouter()
const upload = (formEle) => {
  if(!formEle) return
  formEle.validate(valid => {
    // addArticleForm.content = $xss(addArticleForm.content)
    // addArticleForm.title = xss(addArticleForm.title)
    console.log('add', addArticleForm)
    if (valid && addArticleForm.content.length > 0 && addArticleForm.abstract.length && typeof addArticleForm.tag === 'number') {
      loading.value = true;
      updateArticle(addArticleForm.tag, addArticleForm.title, addArticleForm.content, addArticleForm.abstract.slice(0,100), route.params.articleId).then(() => {
        ElMessageBox.confirm(
            '文章修改成功',
            '系统提示',
            {
              distinguishCancelAndClose: true,
              confirmButtonText: '继续',
              cancelButtonText: '首页'
            }
        ).then(() => {
          loading.value = false
          addArticleForm.tag = null
          addArticleForm.title = ''
          addArticleForm.content = ''
        }).catch( () => {
          loading.value = false
          router.push('/home')
        })

      }).catch(() => {
        loading.value = false
      })
    }
  });
}
</script>
<style scoped>
.form-item{
  font-weight: 600;
}
.upload-input{
  width: 800px;
  margin-right: 20px;
}
</style>
