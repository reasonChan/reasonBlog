<template>
  <div class="container">
    <Header></Header>
    <el-aside style="" class="siderbar">
      <el-menu
          class="menu"
          :router="true"
      >
        <el-menu-item
            v-for="(item, index) in articleTitleList"
            :index = "item._id"
            :key="index+1"
            class="siderbar-item"
        >
          <span>{{index+1 + '.' + item.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <div class="main"><slot></slot></div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
const props = defineProps({
  articleTag:{
    type: Number,
    required: true
  },
  articleTitleList:{
    type: Array
  }
})

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
  margin-left: 300px;
  padding-top: 38px;
  height: 100%;
}
</style>

