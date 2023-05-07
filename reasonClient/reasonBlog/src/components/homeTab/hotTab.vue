<template>
  hot
  <div class="left clearfix">
    <ul
        class="articles-list"
    >
      <transition-group name="el-fade-in">
        <li
            v-for="(article) in data.articlesList"
            :key="article._id"
            class="item"
        >
          <a
              :href="article._id"
              target="_blank"
          >
            <img
                class="wrap-img img-blur-done"
                data-has-lazy-src="false"
                :src="article.img"
                alt="文章封面"
            />
            <div class="content">
              <h4 class="title">{{article.title}}</h4>
              <p class="abstract">{{article.abstract}}</p>
              <div class="meta">
                <span
                    v-if="article.create_time"
                    class="time"
                >
                  {{formatTime(article.updatedAt)}}
                </span>
              </div>
            </div>
          </a>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup>
import Header from "../../components/common/Header.vue";
import {user} from "../../store/index.js";
import {ref, reactive, onMounted} from "vue";
import {getArticleListByTag} from "../../api/article.js";

let data = reactive({
  articlesList: []
})
onMounted(()=>{
  getArticleListByTag(user().articleTag.get('js基础')).then(res => {
    console.log(res.data)
    data.articlesList = res.data
  })
})
</script>

<style scoped>
.left{
  width: 100%;
  margin: 0 auto
}
.title {
  color: #333;
  margin: 7px 0 4px;
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}
.item > div {
  padding-right: 140px;
}
.item .wrap-img {
  position: absolute;
  top: 50%;
  margin-top: -50px;
  right: 20px;
  width: 125px;
  height: 100px;
}
li {
  line-height: 20px;
  position: relative;
  width: calc(100% - 125px);
  padding: 15px 150px 15px 0px;
  border-bottom: 1px solid #f0f0f0;
  word-wrap: break-word;
  cursor: pointer;
}
li:hover .title{
  color: #000;
}

.abstract {
  min-height: 30px;
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 24px;
  color: #555;
}
.meta {
  padding-right: 0 !important;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}
.meta span{
  margin-right: 10px;
  color: #666;
}

</style>
