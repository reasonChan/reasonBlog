<template>
  <detail :articleContent="data.articleContent" :articleTitle="data.articleTitle"></detail>
</template>

<script setup>
import detail from '../../../components/common/detail.vue'
import {reactive, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import {getArticleById} from "../../../api/article.js";
let data = reactive({
  articleContent: '',
  articleTitle: ''
})
const route = useRoute()
const getArticle = id => {
  if(id !== 'catalogue'){
    getArticleById(id).then(res => {
      data.articleContent = res.data[0].content
      data.articleTitle = res.data[0].title
    })
  }
}
watch(()=>route.path, (newVal, oldVal) => {
  getArticle(route.path.split('/')[2])
})
getArticle(route.path.split('/')[2])

</script>

<style scoped>

</style>
