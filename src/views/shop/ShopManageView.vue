<template>
    <div>
      <!-- 顶栏 -->
      <div class="shop-header">
        <div class="shop-name">{{ shopName }}</div>
        <div class="shop-stats">
          <div class="shop-stat">
            <div class="shop-stat-value">{{ favoriteUserCount }}</div>
            <div class="shop-stat-label">收藏用户</div>
          </div>
          <div class="shop-stat">
            <div class="shop-stat-value">{{ toBeShippedOrderCount }}</div>
            <div class="shop-stat-label">待发货订单</div>
          </div>
          <div class="shop-stat">
            <div class="shop-stat-value">{{ toBeReceivedOrderCount }}</div>
            <div class="shop-stat-label">待收货订单</div>
          </div>
          <div class="shop-stat">
            <div class="shop-stat-value">{{ completedOrderCount }}</div>
            <div class="shop-stat-label">已完成订单</div>
          </div>
        </div>
      </div>
      <!-- 侧边栏 -->
      <el-row class="tac">
        <el-col :span="4">
          <h5 class="mb-2">店铺管理选项</h5>
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="selectMenu('ShopInfo')">
                <el-icon><location /></el-icon>
                店铺信息
            </el-menu-item>
            <el-menu-item index="2" @click="selectMenu('ShopAnalysis')">
                <el-icon><setting /></el-icon>
                店铺分析
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><document /></el-icon>
                <span>店铺管理</span>
              </template>
              <el-menu-item index="3-1" @click="selectMenu('ProductManagement')">
                <el-icon><setting /></el-icon>
                已上架商品管理
            </el-menu-item>
            <el-menu-item index="3-2" @click="selectMenu('ProductIncrease')">
                <el-icon><setting /></el-icon>
                新增商品
            </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4" @click="selectMenu('OrderManage')">
                <el-icon><setting /></el-icon>
                订单管理
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
            <template v-if="selectedMenu === 'ShopInfo'">
        <ShopInfo></ShopInfo>
      </template>
      <template v-else-if="selectedMenu === 'OrderManage'">
        <OrderManage></OrderManage>
      </template>
      <template v-if="selectedMenu === 'ProductIncrease'">
        <ProductIncrease></ProductIncrease>
      </template>
      <template v-else-if="selectedMenu === 'ProductManagement'">
        <ProductManagement></ProductManagement>
      </template>
      <template v-else-if="selectedMenu === 'ShopAnalysis'">
        <ShopAnalysis></ShopAnalysis>
      </template>
        </el-col>
      </el-row>
    </div>
  </template>

  <script setup>
  import {
    // Location,
    Setting,
  } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import ShopInfo from '@/views/shop/ShopInfoView.vue'
  import OrderManage from '@/views/shop/OrderManageView.vue'
  import ProductIncrease from '@/views/shop/ProductIncreaseView.vue';
  import ProductManagement from '@/views/shop/ProductManagementView.vue';
  import ShopAnalysis from '@/views/shop/ShopAnalysisView.vue';


//   const handleOpen = (key, keyPath) => {
//     console.log(key, keyPath)
//   }

//   const handleClose = (key, keyPath) => {
//     console.log(key, keyPath)
//   }
const selectedMenu = ref('ShopInfo');

  // 商店名字
  const shopName = ref('我的店铺')

  // 收藏用户数
  const favoriteUserCount = ref(123)

  // 待发货订单数
  const toBeShippedOrderCount = ref(10)

  // 待收货订单数
  const toBeReceivedOrderCount = ref(5)

  // 已完成订单数
  const completedOrderCount = ref(100)

  function selectMenu(menu) {
      selectedMenu.value = menu;
    }

//   // 计算总订单数
//   const totalOrderCount = computed(() => {
//     return toBeShippedOrderCount.value + toBeReceivedOrderCount.value + completedOrderCount.value
//   })
  </script>

  <style scoped>
  .shop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .shop-name {
    font-size: 24px;
    font-weight: bold;
  }

  .shop-stats {
    display: flex;
    align-items: center;
  }

  .shop-stat {
    margin-left: 20px;
    line-height: 1.5;
  }

  .shop-stat-value {
    font-size: 20px;
    font-weight: bold;
  }

  .shop-stat-label {
    font-size: 14px;
    color: #999;
  }

  .el-row {
    margin-top: 20px;
  }

  .el-col {
    padding: 0 10px;
  }
  .no-link-style {
    color: inherit;
    text-decoration: none;
    cursor: default;
  }
  </style>
