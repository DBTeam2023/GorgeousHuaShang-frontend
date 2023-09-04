<template>
    <div>
      <h1>商店分析</h1>
      <!-- 其他具体内容 -->
      <p>这里面放各种分析图，就像用户交互那次作业一样</p>
      <p>修改评分</p>
      <el-input-number v-model="score" :min="0" :max="5" @change="handleChange" />
    </div>
  </template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {getStoreInfo, setScore} from "@/api/store";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const route = useRoute();

const score = ref();

onMounted(() => {
  getStoreInfo({
    storeId: route.query.storeid,
  })
      .then(resp => {
        score.value = resp.data.score;
      })
      .catch(resp => {
        ElMessage.error("获取评分失败");
      })
})

watch(score, newVal => {
  setScore({
    storeId: route.query.storeid,
    score: score.value
  })
      .then(resp => {
        console.log(score.value)
      })
      .catch(resp => {
        ElMessage.error("修改评分失败");
      })
})


</script>

  <style>
  /* 组件样式 */
  </style>
