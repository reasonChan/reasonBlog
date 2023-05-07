<template>
  <div class="container">
    <Header></Header>
    <el-aside style="" class="siderbar">
      <el-menu
          :default-active="route.path"
          class="menu"
          :router="true"
      >
        <el-menu-item v-for="(item, index) in data.menu" :index = item.path :key="index">
          <el-icon><component :is="item.icon"/></el-icon>
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <div class="main"><router-view></router-view></div>
  </div>
</template>

<script setup>
import Header from "../../components/common/Header.vue";
import {ref, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
const data = reactive({
  menu: {}
})
const router = useRouter()
const route = useRoute()
data.menu = router.options.routes.filter(obj => obj.name === '后台管理')[0].children
console.log(data.menu)
</script>

<style scoped>
.container{
  height: 100%;
  overflow-y: auto
}
.siderbar{
  position: fixed;
  top: 38px;
  left: 0;
  height: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.7;
}
.el-menu span{
  color: #2c3e50;
}
.menu{
  height: 100%;
}

.main{
  padding-left: 300px;
  padding-top: 38px;
  height: 100%;
}
.menu{
  height: 100%;
}
</style>
