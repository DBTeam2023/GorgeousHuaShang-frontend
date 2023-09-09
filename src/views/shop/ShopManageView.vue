@@ -0,0 +1,222 @@
<template>
    <div>
      <!-- 顶栏 -->
      <div class="shop-header">
        <div style=" display: flex;align-items: center;justify-content: space-between;">
          <el-icon style="font-size: 25px;"><house /></el-icon>
          <div class="shop-name">{{ shopName }}</div>
        </div>
        <div class="shop-stats">
          <div class="shop-stat">
            <el-icon style="font-size: 25px;"><star /></el-icon>
            <div class="shop-stat-info">
              <div class="shop-stat-value">{{ favoriteUserCount }}</div>
              <div class="shop-stat-label">收藏用户</div>
            </div>
          </div>
<!--          <div class="shop-stat">-->
<!--            <el-icon style="font-size: 25px;"><DocumentAdd /></el-icon>-->
<!--            <div class="shop-stat-info">-->
<!--              <div class="shop-stat-value">{{ toBeShippedOrderCount }}</div>-->
<!--              <div class="shop-stat-label">待发货订单</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="shop-stat">-->
<!--            <el-icon style="font-size: 25px;"><Document/></el-icon>-->
<!--            <div class="shop-stat-info">-->
<!--              <div class="shop-stat-value">{{ toBeReceivedOrderCount }}</div>-->
<!--              <div class="shop-stat-label">待收货订单</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="shop-stat">-->
<!--            <el-icon style="font-size: 25px;"><Collection/></el-icon>-->
<!--            <div class="shop-stat-info">-->
<!--              <div class="shop-stat-value">{{ completedOrderCount }}</div>-->
<!--              <div class="shop-stat-label">已完成订单</div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
      <!-- 侧边栏 -->
      <el-row class="tac">
        <el-col :span="4">
          <div style="display: flex; align-items: center;">
          <el-icon><Tools /></el-icon>
          <h5 class="mb-2" style="margin-left: 10px;">店铺管理选项</h5>
        </div>
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="selectMenu('ShopInfo')">
                <el-icon><InfoFilled /></el-icon>
                店铺信息
            </el-menu-item>
<!--            <el-menu-item index="2" @click="selectMenu('ShopAnalysis')">-->
<!--                <el-icon><Histogram /></el-icon>-->
<!--                店铺分析-->
<!--            </el-menu-item>-->
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Menu /></el-icon>
                <span>店铺管理</span>
              </template>
              <el-menu-item index="3-1" @click="selectMenu('ProductManagement')">
                <el-icon><Goods /></el-icon>
                已上架商品管理
              </el-menu-item>
              <el-menu-item index="3-2" @click="selectMenu('ProductIncrease')">
                <el-icon><Sell /></el-icon>
                  新增商品
              </el-menu-item>
            </el-sub-menu>
<!--            <el-menu-item index="4" @click="selectMenu('OrderManage')">-->
<!--                <el-icon><MoreFilled /></el-icon>-->
<!--                订单管理-->
<!--            </el-menu-item>-->
            <el-menu-item index="5" @click="selectMenu('storeSellers')">
              <el-icon><UserFilled /></el-icon>
                卖家管理
            </el-menu-item>
            <el-menu-item index="6" @click="selectMenu('CouponManage')">
              <el-icon><Discount /></el-icon>
                优惠券管理
            </el-menu-item>
            
          </el-menu>
        </el-col>
    <el-col :span="20">
      <div class="info">
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
      <template v-else-if="selectedMenu === 'storeSellers'">
        <StoreSellers></StoreSellers>
      </template>
      <template v-else-if="selectedMenu === 'CouponManage'">
        <CouponManage></CouponManage>
      </template>
    </div>
    </el-col>
      </el-row>
    </div>
  </template>

  <script setup>
import {
  House,
  Star,
  InfoFilled,
  UserFilled,
  Discount,
  Sell,
  Goods,
  Menu,
  Tools,
} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import ShopInfo from '@/views/shop/ShopInfoView.vue'
import OrderManage from '@/views/shop/OrderManageView.vue'
import ProductIncrease from '@/views/shop/ProductIncreateView.vue';
import ProductManagement from '@/views/shop/ProductManagementView.vue';
import ShopAnalysis from '@/views/shop/ShopAnalysisView.vue';
import StoreSellers from '@/views/shop/StoreSellersView.vue';
import CouponManage from '@/views/shop/CouponManageView.vue';
import {ElIcon, ElMessage} from 'element-plus';
import {getFollowedStore} from "@/api/userinfo";
import {getBuyers, getStoreInfo} from "@/api/store";
import {useRoute} from "vue-router";

const route = useRoute();

const storeName = ref("");

const getStore = () => {
  getStoreInfo({
    storeId: route.query.storeid
  })
      .then(resp => {
        storeName.value = resp.data.storeName

        getBuyers({
          pageNo: 1,
          pageSize: 1,
          storeId: route.query.storeid
        })
            .then(resp => {
              favoriteUserCount.value = resp.data.total;
            })
            .catch(resp => {
              ElMessage.error("获取商家信息错误")
            })
      })
      .catch(resp => {
        ElMessage.error("获取商家信息失败")
      })
}


onMounted(() => {
  getStore()
})

const selectedMenu = ref('ShopInfo');

// 商店名字
const shopName = ref('我的店铺')

// 收藏用户数
const favoriteUserCount = ref(0)

// // 待发货订单数
// const toBeShippedOrderCount = ref(10)
//
// // 待收货订单数
// const toBeReceivedOrderCount = ref(5)
//
// // 已完成订单数
// const completedOrderCount = ref(100)

function selectMenu(menu) {
    selectedMenu.value = menu;
}

</script>

  <style scoped>
  .info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 20px;
}
  .shop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }

  .shop-name {
    font-size: 24px;
    font-weight: bold;
    margin-left: 10px;
  }

  .shop-stats {
    display: flex;
    align-items: center;
  }

  .shop-stat {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.shop-stat-info {
  display: flex;
  flex-direction: column;
  margin-left: 5px; /* 调整适当的数值来增加左侧空隙 */
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
