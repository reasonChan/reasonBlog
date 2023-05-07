<template>
  <layout :articleTag="articleTag" :article-title-list="data.articleTitleList">
    <router-view></router-view>
  </layout>
</template>

<script setup>
import layout from "../../../components/common/layout.vue"
import {user} from "../../../store/index.js";
import {ref, reactive, onMounted, computed} from "vue";
import {getTitleListByTag} from "../../../api/article.js";

let articleTag = ref(0)
let data = reactive({
  articleTitleList: []
})
let title = ref('')
onMounted(()=>{
  getTitleListByTag(user().articleTag.get('js基础')).then(res => {
    data.articleTitleList = res.data
    data.articleTitleList.unshift({
      _id: 'catalogue',
      title: '目录'
    })
    title.value = 'js基础'
  })
})

</script>

<style scoped>
</style>
