<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect"
    style="background-color: transparent;">
    <el-menu-item index="0" style="height: 4em;">
      首页
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="1" v-if="store.state.user.role === 'buyer'">我的购物车</el-menu-item>
    <el-menu-item index="2" v-if="store.state.user.role === 'seller'">我的店铺</el-menu-item>
    <!--  添加其他导航  -->

    <el-sub-menu index="2" v-if="store.state.user.isLogin">
      <template #title>
        <div class="demo-fit">
          <el-avatar shape="square" :size="55" :fit="fit" :src="store.state.user.userPhoto" />
          <el-text tag="b" style="margin-left: 10px">{{ store.state.user.username }}</el-text>
        </div>
      </template>

      <!--   这里添加登录状态的路由跳转，如个人信息跳转   -->
      <el-menu-item :index="'2-4'" v-if="store.state.user.isLogin">个人中心</el-menu-item>
      <el-menu-item :index="'2-3'" v-if="store.state.user.isLogin">退出登录</el-menu-item>

    </el-sub-menu>
    <el-sub-menu index="2" v-else>
      <template #title>请登录</template>
      <el-menu-item :index="!store.state.user.isLogin ? '2-1' : '2-0'" v-if="!store.state.user.isLogin">注册</el-menu-item>
      <el-menu-item :index="!store.state.user.isLogin ? '2-2' : '2-0'" v-if="!store.state.user.isLogin">登录</el-menu-item>

      <!--   这里添加未登录状态的路由跳转   -->

    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import router from "@/router";
import store from "@/store";

// let activeIndex = ref('0')
const handleSelect = (key, keyPath) => {
  keyPath; // 用不到但是要写
  if (key === '0') {
    router.push('/');
  } else if (key === '2-1') {
    router.push('/register/');
  } else if (key === '2-2') {
    router.push('/login/');
  } else if (key === '2-3') {
    store.commit("logout");
  } else if (key === '2-4') {
    router.push('/userinfo/');
  } else if (key === '1') {
    router.push('/cart/')
  } else if (key === '2') {
    router.push('/shopselect/')
  }
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}

.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>