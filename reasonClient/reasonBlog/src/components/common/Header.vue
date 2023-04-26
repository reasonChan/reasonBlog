<template>
  <header>
    <div class="header-content">
      <h1 class="content-logo">
        reason进阶之路
      </h1>
      <div class="header-search">
        <input type="text">
        <i><el-icon style="color: #aaaaaa"><Search /></el-icon></i>
      </div>
      <div class="header-nav">
        <ul>
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/article/01">js基础</router-link></li>
          <li><router-link to="/article/02">动画渲染</router-link></li>
          <li><router-link to="/article/03">性能优化</router-link></li>
          <li><router-link to="/article/04">工程化和部署</router-link></li>
          <li><a href="https://github.com/reasonChan/reasonBlog">Github</a></li>
        </ul>
      </div>
      <div class="header-login"><router-link to="/login">登录</router-link></div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
header{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  background-color: #fff;
  border-bottom: solid 1px #dcdfe6;
  /*box-shadow: 0px 5px 6px rgba(0,0,0,0.16);*/
}
.header-content{
  display: flex;
  justify-content: space-around;
  width: 1200px;
  height: 100%;
}
.content-logo{
  width: 160px;
  height: 18px;
  line-height: 18px;
  font-weight: 600;
  text-align: center;
  color: #2c3e50;
  margin: 10px 0;
  cursor: pointer;
}

.header-search input{
  margin-top: 7px;
  padding: 0 10px;
  width: 230px;
  height: 24px;
  border: 0;
  border-radius: 8px;
  background-color: #F0F2F4;
  color: #808080;
  font-size: 16px;
  outline: none;
  border: solid 1px transparent;
}
.header-search input:focus{
  border: solid 1px #007fff
}
.header-search i{
  margin-left: -10px;
}
.header-login{
  height: 38px;
  line-height: 38px;
}
.header-login a{
  font-size: 14px;
  color: #2c3e50;
}
.header-login a:hover{
  border-bottom: 2px solid #007fff;
}
.header-nav{
  width: 500px;
  height: 75px;
  line-height: 75px;
}
.header-nav ul{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 38px;
  line-height: 38px;
}
.header-nav ul li{
  font-size: 14px;
}
.header-nav ul li a{
  color: #2c3e50;
}
.header-nav ul li a:hover{
  border-bottom: 2px solid #007fff;
}


</style>
