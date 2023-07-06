<template>
    <el-card class="custom-card"
             :body-style="{ padding: '20px' }"
             :shadow="isHovered ? 'hover' : 'never'"
             :style="{ backgroundColor: isHovered ? '#f0f5ff' : '#ffffff', borderRadius: '10px' }"
             @mouseenter="isHovered = true"
             @mouseleave="isHovered = false">
        <slot><!-- 插入的东西在这里 --></slot>
    </el-card>

  </template>

  <script setup>
  import { ref } from 'vue';
  import { ElCard } from 'element-plus';

  const isHovered = ref(false);
  </script>

  <style scoped>
  .custom-card {
    transition: all 0.3s ease;
  }

  .custom-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  </style>
