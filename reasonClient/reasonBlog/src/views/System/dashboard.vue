<template>
  <el-container class="container">
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside style="width: 150px" class="aside">
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
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </el-container>



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
</script>

<style scoped>
.container{
  height: 100%;
}
.aside{
  height: 100%;
}
.menu{
  height: 100%;
}
</style>