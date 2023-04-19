<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>ReasonBlog后台登录</span>
      </div>
    </template>
    <el-form
        ref="loginForm"
        :model="loginForm"
        status-icon
        label-width="120px"
        class="loginForm"
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="loginForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm" prop="password">
        <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandle">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>


<script setup>
import { reactive, ref } from 'vue'
// import {login} from "../api/login.js";
const loginForm = reactive({
  username: '',
  password: '',
})
const  loginHandle = () => {
  // login(loginForm).then(res => {
  //   console.log(res)
  // })
}
</script>


<style scoped>
.box-card{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  height: 250px;
}
.card-header{
  text-align: center;
}
</style>