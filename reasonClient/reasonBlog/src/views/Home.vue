<template>
  <div>
    <Header></Header>
    <div class="home-content">
      <el-card class="home--card">
        <template #header>
          <div class="home-card-header">
            <span :class="data.isActive ?'active':'deactive'" @click="getLatestArticles">最新</span>
            <span :class="!data.isActive ?'active':'deactive'" @click="getHotArticles">最热</span>
          </div>
        </template>
        <div class="">文章</div>
        <div class="">文章</div>
        <div class="">文章</div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// import {ElButton} from 'element-plus'
import Header from '../components/common/Header.vue'
import {latestArticles} from '../api/home'
import {ref, reactive} from "vue";
let data = reactive({
  isActive : true,
  articleList: []
})
//获取最新文章
let query = reactive({
  latest: {
    page: 1,
    limit: 10
  }
})
const getLatestArticles = () => {
  data.isActive = !data.isActive
  latestArticles(query.latest).then(res => {
    data.articleList = res.data
  })
}
getLatestArticles()


//获取最热文章
const getHotArticles = () => {
  data.isActive = !data.isActive
}
</script>

<style scoped>
.home-content{
  width: 720px;
  height: 500px;
  margin: 20px auto;
  background-color: #222222;
}
.home-card-header:hover{
  color: #007fff
}
.home-card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.home-card-header span{
  padding: 0 10px;
}
.active{
  color: #43464f;
  cursor: pointer;
}
.deactive{
  color: #9a9a9a;
  cursor: pointer;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

</style>