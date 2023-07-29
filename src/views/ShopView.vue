<template>
    <div>
        <!-- 顶栏 -->
        <div class="shop-header">

            <div class="shop-avatar">
              <ElIcon name="el-icon-house"></ElIcon>
                <img :src="shopAvatar" alt="Shop Avatar" />
            </div>
            <div class="shop-name">{{ shopName }}</div>
            <div class="shop-stats">
            <div class="shop-stat">
                <div class="shop-stat-value">{{ fanCount }}</div>
                <div class="shop-stat-label">收藏用户</div>
            </div>
            <div class="shop-stat">
                <div class="shop-stat-value">{{ starRating }}</div>
                <div class="shop-stat-label">店铺星级</div>
            </div>
            <div class="shop-stat">
                <div class="shop-stat-value">{{ address }}</div>
                <div class="shop-stat-label">店铺地址</div>
            </div>
            </div>
        </div>
        <!-- 侧边栏 -->
      <el-row class="tac">
        <el-col :span="4">
          <h5 class="mb-2">店铺选项</h5>
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="selectMenu('AllItems')">
                <el-icon><location /></el-icon>
                全部宝贝
            </el-menu-item>
            <el-menu-item index="2" @click="selectMenu('ShopAnalysis')">
                <el-icon><setting /></el-icon>
                店铺动态
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><document /></el-icon>
                <span>宝贝分类</span>
              </template>
              <el-menu-item index="3-1" @click="selectMenu('ProductManagement')">
                <el-icon><setting /></el-icon>
                分类1
            </el-menu-item>
            <el-menu-item index="3-2" @click="selectMenu('ProductIncrease')">
                <el-icon><setting /></el-icon>
                分类2
            </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4" @click="selectMenu('ShopAnalysis')">
                <el-icon><setting /></el-icon>
                联系客服
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
      <template v-if="selectedMenu === 'AllItems'">
        <AllItems></AllItems>
      </template>
        </el-col>
      </el-row>
    </div>
  </template>

  <script setup>
  import {onMounted, ref} from 'vue';
  import AllItems from '@/views/shop_subs/ALLItemsView.vue'
  import { ElIcon } from 'element-plus';

    const selectedMenu=ref('AllItems')

    const shopAvatar = ref('https://picsum.photos/id/1018/400/200');
    const shopName = ref('A Test Shop');
    const fanCount = ref(1000);
    const address = ref('Beijing, China');
    const starRating = ref('4.5');

    onMounted(() => {
      checkPermission(["seller"]);
    })
  </script>

<style scoped>
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
.shop-avatar img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}
.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
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
