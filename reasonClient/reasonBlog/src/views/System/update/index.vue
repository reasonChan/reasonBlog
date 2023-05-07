<template>
  <router-view v-if="flag"></router-view>
  <div class="theme-main" v-else>
    <h1>{{title}}</h1>
    <ul class="cata-ul">
      <li v-for="(item, index) in data.articleTitleList">
        <router-link
            class="cata-item"
            :key="item._id"
            :to="'/system/update/'+item._id">
          {{`【${String(index).padStart(2,'0')}】` + item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import layout from '../../../components/common/layout.vue'
import catalogue from '../../../components/common/catalogue.vue'
import {getTitleList} from "../../../api/system";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";

let data = reactive({
  articleTitleList: []
})
let title = ref('')
onMounted(()=>{
  getTitleList().then(res => {
    data.articleTitleList = res.data
    title.value = '文章修改'
  })
})
//控制flag
let route = useRoute()
let flag = computed(()=>{
  if(route.matched.length > 2) return true
  else return false
})
</script>

<style scoped>
.theme-main{
  margin: 0 auto;
  max-width: 500px;
}
.theme-main h1{
  margin: 25px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  color: #2c3e50;
}
.cata-ul{
  padding-left: 10px;
  line-height: 1.7;
  list-style-type: disc;
}
cata-ul li{
  display: list-item;
}
cata-ul li::marker{
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
  text-transform: none;
  text-indent: 0px !important;
  text-align: start !important;
  text-align-last: start !important;
}
.cata-item{
  font-weight: 500;
  color: #3eaf7c
}
.cata-item:hover{
  text-decoration: underline;
}
</style>
