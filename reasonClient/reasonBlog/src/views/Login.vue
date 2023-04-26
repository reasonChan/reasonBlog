<template>
  <el-card class="box-card">
    <div class="login">
      <el-form ref="loginFormRef" :model="login.loginForm" :rules="login.loginRules" class="login-form">
        <h3 class="title">ReasonBlog后台登录</h3>
        <el-form-item prop="username">
          <el-input v-model="login.loginForm.username" type="text" auto-complete="off" placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="login.loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin(loginFormRef)"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
              :loading="login.loading"
              size="default"
              type="primary"
              style="width:100%;"
              @click="handleLogin(loginFormRef)"
          >
            <span v-if="!login.loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2021 scut_automation_302lab All Rights Reserved.</span>
      </div>
    </div>
  </el-card>
</template>


<script setup>
import { reactive, ref } from 'vue'
import {user} from "../store/index.js";
import {useRoute, useRouter} from "vue-router";
import {ElMessageBox} from 'element-plus'
const loginFormRef = ref()
const login = reactive({
  loginForm: {
    username: 'admin',
    password: '@qazQAZ+',
  },
  loginRules: {
    username: [
      { required: true, trigger: "blur", message: "请输入您的账号" }
    ],
    password: [
      { required: true, trigger: "blur", message: "请输入您的密码" }
    ]
  },
  loading: false
})
const router = useRouter()
const  handleLogin = (formEle) => {
  if(!formEle) return
  formEle.validate(valid => {
    if (valid) {
      login.loading = true;
      user().Login(login.loginForm).then(() => {
        router.push({ path:  "/system" });
      }).catch(() => {
        login.loading = false;
      });
    }
  });
}
</script>


<style scoped>
.box-card{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
}
.login-form .el-input{
  height: 38px;
}
.login-form .el-input input{
  height: 38px;
}
.login-form .input-icon {
  height: 39px;
  width: 14px;
  margin-left: 2px;
}
/*.login-tip {*/
/*  font-size: 13px;*/
/*  text-align: center;*/
/*  color: #bfbfbf;*/
/*}*/
/*.login-code {*/
/*  width: 33%;*/
/*  height: 38px;*/
/*  float: right;*/
/*}*/
.login-code img {
  cursor: pointer;
  vertical-align: middle;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>