<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" style="height: 4em;">
      <img src="../../assets/login/HuashangLogo.png" style="width: 4em; height: 4em;">
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">其他</el-menu-item>

<!--  添加其他导航  -->

    <el-sub-menu index="2">
      <template #title>个人信息</template>
      <el-menu-item :index="showRegister ? '2-1' : '2-0'" v-if="showRegister">注册</el-menu-item>
      <el-menu-item :index="showRegister ? '2-2' : '2-0'" v-if="showRegister">登录</el-menu-item>
      <el-menu-item :index="'2-3'" v-if="!showRegister">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router";

let showRegister = ref(true);
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
    router.push('/item-three/');
  }

}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>