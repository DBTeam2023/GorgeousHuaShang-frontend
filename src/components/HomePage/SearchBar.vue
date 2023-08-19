<template>
  <div class="search-container">
    <div class="search-box">
      <div class="my-logo">
        <img src="../../assets/homePage/font-logo.png" style="margin-left: -200px">
      </div>
      <div class="my-search-box-in">
        <el-input
            v-model="searchKeyword"
            placeholder="请输入商品相关名称"
            clearable
            class="search-input"
        />
        <el-button type="primary" @click="performSearch" class="search-button">搜索</el-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['performSearch'])
// 绑定搜索关键词
const searchKeyword = ref('');

// 执行搜索的函数
const performSearch = () => {
  if (searchKeyword.value.trim() !== '') {
    emit('performSearch', searchKeyword.value)
    // 在这里调用你的搜索逻辑函数
    // 例如：调用API，发送搜索请求等
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
  height: 8vh; /* 可以根据需要调整居中方式 */
}

.my-search-box-in{
  //width:500px;
  //height:40px;
  border:2px solid red;
  margin:auto;
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
  float:left;
  width:400px;/*宽400*/
  height:40px;/*高38（因为文本框内外边框要占用1像素所以总体高度减2，其他盒子同理）*/
  outline:none;
  border:none;/*取消文本框内外边框*/
}



.search-button {
  min-width: 80px;
  float:left;
  width:96px;
  height:40px;
  color:white;
  background-color:red;/*将按钮背景设置为红色，字体设置为白*/
  border:none;
  outline:none;/*取消边框和外边框将按钮边框去掉*/

}
</style>
