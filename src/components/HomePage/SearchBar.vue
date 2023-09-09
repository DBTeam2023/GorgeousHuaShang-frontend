<template>
  <div class="search-container">
    <div class="search-box">
      <div class="my-logo">
        <img src="../../assets/homePage/font-logo.png" style="margin-left: -200px">
      </div>
      <div class="my-search-box-in">
        <el-input v-model="searchKeyword" placeholder="请输入商品相关名称" clearable class="search-input" />
        <el-button type="danger" @click="performSearch" class="search-button">搜索</el-button>
      </div>
      <div class="shopCart"></div>
      <router-link to="/cart">
        <el-button type="danger" size="large">
          <el-icon style="vertical-align: middle" size="20px">
            <ShoppingCart />
          </el-icon>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useRoute } from "vue-router";
import router from "@/router";
import { ShoppingCart } from '@element-plus/icons-vue';

const route = useRoute()
const emit = defineEmits(['performSearch'])
// 绑定搜索关键词
let searchKeyword = ref('');

// 执行搜索的函数
const performSearch = () => {
  emit('performSearch', searchKeyword.value)

  if (route.path === "/homepage/") {
    router.push({ path: '/classify', query: { search: searchKeyword.value } })
  }
};
</script>

<style scoped>
.my-logo {
  margin-right: -50px;
  scale: 40%;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
}

.my-search-box-in {
  border: 2px solid red;
  margin: auto;
  border-radius: 6px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 50vw;
}

.search-input {
  flex: 1;
  float: left;
  width: 400px;
  /*宽400*/
  height: 40px;
  /*高38（因为文本框内外边框要占用1像素所以总体高度减2，其他盒子同理）*/
  outline: none;
  border: none;
  /*取消文本框内外边框*/
}

.search-button {
  min-width: 80px;
  float: left;
  width: 96px;
  height: 40px;
  color: white;
  /* background-color: red; */
  /*将按钮背景设置为红色，字体设置为白*/
  border: none;
  outline: none;
  /*取消边框和外边框将按钮边框去掉*/
}
</style>
