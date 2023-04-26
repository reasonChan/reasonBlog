<template>
  <el-form :model="addArticleForm" label-width="120px" ref="addArticleFormRef" :rules="addArticleFormRule">
    <el-form-item label="文章标题" class="form-item" prop="title">
      <el-input class="upload-input" v-model="addArticleForm.title" placeholder="请输入文章标题"/>
      <el-button type="primary" class="upload-btn" @click="upload(addArticleFormRef)">
        <span v-if="!loading">发布文章</span>
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
      <RichTextEditor v-model="addArticleForm.content" v-model:textValue="addArticleForm.abstract"></RichTextEditor>
    </el-form-item>
  </el-form>

</template>

<script setup>
import RichTextEditor from "../../components/RichTextEditor.vue";
import {ref, reactive} from "vue";
import {user} from "../../store/index.js";
import {addtArticle} from "../../api/system.js";
import {useRouter} from "vue-router";

const addArticleForm = reactive({
  tag: null, //Number类型
  title: '',
  content: '',
  img: '',
  abstract: ''
})
const addArticleFormRule = reactive({
    title: [
      { required: true, trigger: "blur", message: "请输入标题" },
      { min: 1, max: 25, message: '长度应该在1-25之间'}
    ]
  })
const addArticleFormRef = ref()   //表单dom元素
let loading = ref(false)    //是否加载中flag
const router = useRouter()
const upload = (formEle) => {
  if(!formEle) return
  formEle.validate(valid => {
    if (valid && addArticleForm.content.length > 0 && addArticleForm.abstract.length && typeof addArticleForm.tag === 'number') {
      loading.value = true;
      addtArticle(addArticleForm.tag, addArticleForm.title, addArticleForm.content, addArticleForm.abstract.slice(0,30)).then(() => {
        ElMessageBox.confirm(
            '文章发布成功',
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
