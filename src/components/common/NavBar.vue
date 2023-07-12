<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="background-color: transparent;"
  >
    <el-menu-item index="0" style="height: 4em;">
<!--      <img src="../../assets/login/HuashangLogo.png" style="width: 4em; height: 4em;">-->
      首页
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">其他</el-menu-item>

<!--  添加其他导航  -->

    <el-sub-menu index="2">
      <template #title>个人信息</template>
      <el-menu-item :index="!store.state.user.isLogin ? '2-1' : '2-0'" v-if="!store.state.user.isLogin">注册</el-menu-item>
      <el-menu-item :index="!store.state.user.isLogin ? '2-2' : '2-0'" v-if="!store.state.user.isLogin">登录</el-menu-item>
      <el-menu-item :index="'2-3'" v-if="store.state.user.isLogin">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router";
import store from "@/store";
import {ElMessage} from "element-plus";

// let showRegister = ref(store.state.user.isLogin);
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  keyPath; // 用不到但是要写
  if (key === '0'){
    router.push('/');
  } else if (key === '2-1') {
    router.push('/register/');
  } else if (key === '2-2') {
    router.push('/login/');
  } else if (key === '2-3') {
    logout();
  }
}

const logout = () => {
  store.commit("setIsLogin", false);
  store.commit("setToken", "");
  if (localStorage.getItem("jwtToken") != null) {
    localStorage.removeItem("jwtToken");
  }
  ElMessage('退出登录');
  router.push('/');

  // console.log(store.state.user)
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>