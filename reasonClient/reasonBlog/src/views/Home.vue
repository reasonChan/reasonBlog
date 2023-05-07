<template>
  <div>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main style="padding: 0 20px">
        <div class="home-content">
          <el-card class="home--card" shadow="never" body-style="padding: 0 20px 20px">
            <template #header>
              <div class="home-card-header">
            <span
                v-for="(item, index) in data"
                :class="isActive == index ? 'active' : 'deactive'"
                @click="toggle(item, index)"
            >
              {{item.name}}
            </span>
              </div>
            </template>
            <component :is="currentComponent"></component>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script setup>
// import {ElButton} from 'element-plus'
import Header from '../components/common/Header.vue'
import latestTab from '../components/homeTab/latestTab.vue'
import hotTab from '../components/homeTab/hotTab.vue'
import {ref, reactive, shallowRef, markRaw} from "vue";

let currentComponent = shallowRef(latestTab)
const data = reactive([
  {
    name: '最新',
    compo: markRaw(latestTab)
  },
  {
    name: '最热',
    compo: markRaw(hotTab)
  },
])
let isActive = ref(0)
const toggle = (item, index) => {
  currentComponent.value = item.compo
  isActive.value = index
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
