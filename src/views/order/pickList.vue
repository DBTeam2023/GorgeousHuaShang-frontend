<template>
  <div class="pick-container">
      <el-row class="pick-row" v-for="pick in orderPicks" :key="index" style="padding:10px;margin: 5px;" :gutter="30">
        <!-- 商品图片 -->
        <el-col :span="5" class="img-col">
          <img :src="pick.picture" class="image"/>
        </el-col>
        <!-- 基本信息 -->
        <el-col :span="8">
            <div class="description">{{ pick.description }}</div>
            <div>{{  getPropertyValues(pick.property)  }}</div>
        </el-col>
        <!-- 价格 -->
        <el-col :span="4">
          <div>￥{{ pick.price }}</div>
        </el-col>
        <!-- 数量 -->
        <el-col :span="4">
          <div>{{ pick.number }}</div>
        </el-col>
    </el-row>
  </div>
</template>



<script setup>
  import { ref, defineProps, onMounted } from 'vue'

  const props = defineProps({
        orderPicks: Array,
  })

  // 获取商品的pick款式信息
  const getPropertyValues = (obj) => {
      return Object.values(obj).join(';');
  };


</script>

<style scoped>
  .pick-container{
    /* background-color: yellow; */
    margin:10px auto;
  }

  .pick-container {
    /* 可以设置一个最大宽度以限制图片大小 */
    max-width: 100%;
  }

  .pick-container .pick-row{
    background-color: #faf7ef;
  }
  .img-col{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    overflow: hidden; /* 隐藏超出容器的部分 */
  }

  .img-col .image{
    width: 90px; 
    height: 90px; 
  }

  .description{
    overflow: hidden;/*超出部分隐藏*/
    text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
		white-space: nowrap; /* 防止内容换行 */
  }
</style>
