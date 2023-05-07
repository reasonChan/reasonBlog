<template>
  <catalogue :title="title" :catalogueList="data.articleTitleList"></catalogue>
</template>
<script setup>
import catalogue from '../../../components/common/catalogue.vue'
import {onMounted, reactive, ref} from "vue";
import {getTitleListByTag} from "../../../api/article.js";
import {user} from "../../../store/index.js";
import {useRoute} from "vue-router";

let data = reactive({
  articleTitleList: []
})
let title = ref('')
onMounted(()=>{
  getTitleListByTag(user().articleTag.get('js基础')).then(res => {
    data.articleTitleList = res.data
    title.value = 'js基础'
  })
})
</script>

<style scoped>

</style>
