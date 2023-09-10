<template>
  <div>
    <!-- 顶栏 -->
    <div class="shop-header">
      <div style=" display: flex;align-items: center;justify-content: space-between;">
        <el-icon style="font-size: 25px;"><house /></el-icon>
        <div class="shop-name">{{ storeInfo.shopName }}</div>
      </div>
      <div style=" display: flex;align-items: center;justify-content: space-between;">
        <div >{{ storeInfo.description }}</div>
      </div>
      <div class="shop-stats">
        <div class="shop-stat">
          <el-icon style="font-size: 25px;"><User /></el-icon>
          <div class="shop-stat-info">
            <div class="shop-stat-value">{{ storeInfo.favoriteUserCount }}</div>
            <div class="shop-stat-label">收藏用户</div>
          </div>
        </div>
        <div class="shop-stat">
          <el-icon style="font-size: 25px;"><Star /></el-icon>
          <div class="shop-stat-info">
            <div class="shop-stat-value">{{ storeInfo.score }}</div>
            <div class="shop-stat-label">店铺星级</div>
          </div>
        </div>
        <div class="shop-stat">
          <el-icon style="font-size: 25px;"><Location/></el-icon>
          <div class="shop-stat-info">
            <div class="shop-stat-value">{{ storeInfo.address }}</div>
            <div class="shop-stat-label">店铺地址</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <el-row class="tac">
      <el-col :span="4" backgroundColor="#545c64">
        <!-- <div style="display: flex; align-items: center;">
        <el-icon><Tools /></el-icon>
        <h5 class="mb-2" style="margin-left: 10px;">店铺管理选项</h5>
      </div> -->
      <el-header class="header" >
          <!--用户头像-->
          <el-row class="avatar-row">
              <el-avatar :size="100" src='https://picsum.photos/id/1018/200/200' />
          </el-row>
          <!--用户姓名-->
          <el-row class="name-row">{{ storeInfo.shopName }}</el-row>
      </el-header>
        <el-menu default-active="1"  active-text-color="#ffd04b"
                  background-color="#545c64"
                  class="el-menu-vertical-demo"
                  text-color="#fff"
                  style="height: 60%;border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;"
                  >
          <el-menu-item index="1" @click="selectMenu('ShopInfo')">
              <el-icon><Grid /></el-icon>
              全部宝贝
          </el-menu-item>
<!--          <el-menu-item index="2" @click="selectMenu('ShopAnalysis')">-->
<!--              <el-icon><Comment /></el-icon>-->
<!--              店铺动态-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="3" @click="selectMenu('ShopAnalysis')">-->
<!--              <el-icon><Menu /></el-icon>-->
<!--              宝贝分类-->
<!--          </el-menu-item>-->
          <el-menu-item index="4" @click="selectMenu('OrderManage')">
              <el-icon><Avatar /></el-icon>
              联系客服
          </el-menu-item>
        </el-menu>

<!--      todo shoucang  -->
        <el-button v-if="!collect" type="info" plain style="width: 100%; margin-top: 20px" @click="collectBtn">收藏</el-button>
        <el-button v-if="collect" type="info" plain style="width: 100%; margin-top: 20px" @click="removeCollectBtn">取消收藏</el-button>
      </el-col>
  <el-col :span="20">
    <template v-if="selectedMenu === 'ShopInfo'">
      <ALLItems></ALLItems>
    </template>
    <template v-else-if="selectedMenu === 'OrderManage'">
       <img src="../../assets/homePage/kefu.png" style="width: 50%;margin-left: 25%;">
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
House,
Star,
Grid,
User,
Comment,
Location,
Menu,
Avatar,
} from '@element-plus/icons-vue'
import {onMounted, reactive, ref, watch} from 'vue'
// import Chat from '@/views/shop_subs/Chat2SellerView.vue'
// import OrderManage from '@/views/shop_subs/OrderManageView.vue'
import ProductIncrease from '@/views/shop/ProductIncreateView.vue';
import ALLItems from '@/views/shop/ALLItemsView.vue';
import ShopAnalysis from '@/views/shop/ShopAnalysisView.vue';
import {ElIcon, ElMessage} from 'element-plus';
import {collectStore, getBuyers, getStoreInfo, removeCollectStore} from "@/api/store";
import {useRoute} from "vue-router";
import {getFollowedStore} from "@/api/userinfo";

const route = useRoute();

let collect = ref(false);

// 由于没办法获得当前用户是否收藏过，所以调用api手动测试

onMounted(() => {
  // 由于没办法获得当前用户是否收藏过，所以调用api手动测试
  collectStore({
    storeId: route.query.storeid
  })
      .then(resp => {
        collect.value = false;
      })
      .catch(resp => {
        collect.value = true;
      })
})

function collectBtn() {
  if (localStorage.getItem("role") === "seller") {
    ElMessage({
      message: '您是卖家，不能收藏！',
      type: 'warning',
    })
    return;
  }

  collectStore({
    storeId: route.query.storeid
  })
      .then(resp => {
        ElMessage({
          message: '成功收藏',
          type: 'success',
        })
        collect.value = true;
      })
      .catch(resp => {
        ElMessage({
          message: '收藏失败',
          type: 'warning',
        })
      })
}

function removeCollectBtn() {
  if (localStorage.getItem("role") === "seller") {
    ElMessage({
      message: '您是卖家，不能收藏！',
      type: 'warning',
    })
    return;
  }

  removeCollectStore({
    storeId: route.query.storeid
  })
      .then(resp => {
        ElMessage({
          message: '成功取消收藏',
          type: 'success',
        })
        collect.value = false;
      })
      .catch(resp => {
        ElMessage({
          message: '取消收藏失败',
          type: 'warning',
        })
      })
}

const storeInfo = reactive({
  storeId: "",
  shopName: "",
  favoriteUserCount: 0,
  score: 1,
  address: "山西",
})

const getFollowedStoreForPage = () => {
  getBuyers({
    pageNo: 1,
    pageSize: 1,
    storeId: route.query.storeid
  })
      .then(resp => {
        storeInfo.favoriteUserCount = resp.data.total;
      })
      .catch(resp => {
        ElMessage.error("获取商家信息错误")
      })
}

watch(collect, () => {
  getFollowedStoreForPage()
})


const getStoreInfoById = () => {
  getStoreInfo({
    storeId: route.query.storeid
  })
      .then(resp => {
        storeInfo.shopName = resp.data.storeName;
        storeInfo.score = resp.data.score;
        storeInfo.address = resp.data.address;
        storeInfo.storeId = resp.data.storeId;
        storeInfo.description = resp.data.description;
        console.log(resp)
      })
      .catch(resp => {
        ElMessage.error('商店信息获取异常');
      })
}

const selectedMenu = ref('ShopInfo');

function selectMenu(menu) {
    selectedMenu.value = menu;
}

onMounted(() => {
  getStoreInfoById();
})

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
.header {
      /* background-color: #fff; */
      /* width: 300px; */
      background-color: #393f44;
      padding-top:20px;
      height:200px;
      /* border-right: 1px solid #d7d4d4;
      border-left: 1px solid #d7d4d4;
      border-bottom: 1px solid #d7d4d4; */
      display: flex;
      flex-direction:column;
      align-items: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
  }
.header .name-row{
      align-self: center;
      color:#fff
  }
</style>
