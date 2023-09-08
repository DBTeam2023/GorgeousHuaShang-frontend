<template>
  <el-container class="container">

    <!-- 装饰图 -->
    <div class="long">
      <img src="../../assets/homePage/long-logo.gif" class="long-logo">
    </div>
    <!-- 分类大卡片 -->
    <div class="card-container">
      <el-card class="box-card" id="male" shadow="always">
        <h1>男款</h1>
      </el-card>
      <el-card class="box-card" id="peishi" shadow="always">
        <h1>配饰</h1>
      </el-card>
      <el-card class="box-card" id="female" shadow="always">
        <h1>女款</h1>
      </el-card>
    </div>
    <el-main>
      <!--分类和轮播图、个人信息-->
      <div class="homeBanner">
        <HomeBanner />
      </div>

      <div class="divCenter">
        <img src="../../assets/homePage/fire.png">
        <div class="custom-font">
          为你推荐
        </div>
      </div>

      <!--推荐商品-->
      <!--      <div style="width: 98%">-->
      <!--        <RecommendCol />-->
      <!--      </div>-->
      <div style="width: 98%">
        <!--        <RecommendCol @pageOption="receivePageVal" :value="commodities"/>-->
        <div class="recommend">
          <!-- 行 -->
          <el-row v-for="(row, index) in itemRows" :key="index" class="itemrow">
            <!-- 列 -->
            <el-col v-for="(item, i) in row" :key="i" class="itemcol" :xs="24" :sm="12" :md="8"
              :lg="4"><!--响应式布局：超小屏幕、小屏幕、中等屏幕、大屏幕-->
              <Card class="card">
                <div @click="turnToProduct(index, i)" class="router-link-active">
                  <!-- 商品图片 -->
                  <div class="item">
                    <img :src="item.url" class="img" />
                  </div>
                  <div class="info">
                    <!-- 商品名称 -->
                    <div class="name">{{ item.productName }}</div>
                    <!-- 商品价格 -->
                    <div class="price">￥{{ item.price }}</div>
                  </div>
                </div>
              </Card>
            </el-col>
          </el-row>
          <!--          <el-row class="pagination">-->
          <!--            &lt;!&ndash; <div class="demonstration">Jump to</div> &ndash;&gt;-->
          <!--            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"-->
          <!--                           layout="prev, pager, next, jumper" :total="total"-->
          <!--                           @current-change="handleCurrentChange" />-->

          <!--          </el-row>-->

        </div>
      </div>
    </el-main>

    <!--底部-->
    <el-footer class="my-footer">
      <img src="../../assets/homePage/footer.png">
    </el-footer>

  </el-container>
</template>

  <!--js脚本函数-->
<script setup>
import SearchBar from "@/components/HomePage/SearchBar.vue"
import HomeBanner from "@/components/HomePage/HomeBanner.vue"
import RecommendCol from "@/components/HomePage/RecommendCol.vue"

import { computed, onMounted, ref } from 'vue'
import Card from "@/components/common/Card.vue";
import { getGoodsInPage } from "@/api/goods";
import { ElMessage } from "element-plus";
import router from "@/router";
import { base64ToUrl } from '@/utils/photo'


const itemList = ref([]);

// 分页栏用到的数据
const currentPage = ref(1)  //当前页数，默认为第1页
const pageSize = 10  //每页的图片数量
const rowSize = 5  //每行rowSize个商品

// 计算属性，计算imageList中图片对应的行；每行4列
const itemRows = computed(() => {
  const start = 0; //当前页的起始数据编号
  const end = start + pageSize;  //当前页的最后数据号
  const paginatedItemRows = itemList.value.slice(start, end);
  const rows = []
  const rowCount = pageSize / rowSize //行数
  for (let i = 0; i < rowCount; i++) {
    rows.push(paginatedItemRows.slice(i * rowSize, (i + 1) * rowSize))
  }
  return rows
})


const getCommodities = () => {
  getGoodsInPage({
    pageSize: pageSize,
    pageIndex: 1,
    commodityId: null,
    storeId: null,
    pricemin: 0,
    pricemax: Infinity,
    type: null,
    name: "",
    description: ""
  })
    .then(resp => {
      itemList.value = resp.data.records;

      for (const item of itemList.value) {
        item.url = base64ToUrl(item.image.fileContents, item.image.contentType);
      }

    })
    .catch(resp => {
      ElMessage("商品拉取失败")
    })
}

onMounted(() => {
  getCommodities();
})

function turnToProduct(index, i) {
  router.push({
    path: '/goodsdetail',
    query: {
      productName: itemList.value[index * rowSize + i].productName,
      goodsId: itemList.value[index * rowSize + i].productId,
      storeId: itemList.value[index * rowSize + i].storeId,
    },
  });
}
</script>


  <!--CSS风格-->
<style scoped>
.my-footer {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  height: 100%;
}

.container {
  padding: 0px;
  background-color: #fff;
  height: 100%;
}

.sort-select {
  justify-content: right;
  margin-right: 10px;
  display: flex;
  float: right;

}

.homeBanner {
  border-radius: 10px;
  width: 95%;
}
</style>

<style lang="scss" scoped>
.custom-font {
  font-family: 'Poppins', sans-serif;
  /* 应用 Poppins 字体 */
  font-weight: 600;
  /* 加粗 */
  font-size: 24px;
  /* 字号较大 */
}

.divCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 100%;
  height: auto;
  border: 0;
  /*被覆盖了？ */
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  /* 设置卡片之间的水平间距 */
}

.recommend {
  padding-bottom: 20px;
  margin: 10px 140px;
  /*上下左右四个方向的外部空白区域 */
  border: 0;
  /* 设置边框样式 */
  border-radius: 10px;
  /* 设置圆角半径 */
  background-color: #ffffff;
}

.recommend h2 {
  font-size: 24px;
  /*字体大小 */
  font-weight: bold;
  /*加粗 */
  margin-bottom: 20px;
}

.itemrow {
  margin-left: 2%;
  margin-right: -16%;
  margin-top: 30px;

}

.itemcol {
  border: 0;
  /*1像素宽度、实现样式、灰色颜色的边框 */
  border-radius: 5px;
  /*5像素的圆角边框 */
  padding: 1px;
  /*元素内部内容与边框之间的距离 */
  text-align: center;
}

.item img {
  width: 100%;
  border-radius: 5px;
}

.info .name {
  margin: 10px 0;
  font-size: 16px;
}

.info .price {
  font-size: 18px;
  font-weight: bold;
  color: red
}

.logo img {
  height: 32px;
  margin-right: 10px;
}

/* 禁用 router-link 的下划线 */
.router-link-active {
  text-decoration: none;
  cursor: pointer;
}

/*分页栏样式 */
.pagination {
  margin-top: 10px;

  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}

.long-logo {
  width: 100%;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 150px;
  margin-right: 150px;
}

.box-card {
  display: flex;
  justify-content: center;
  width: 350px;
  height: 350px;
}

#male {
  background-image: url("../../assets/homePage/male.jpg");
  background-size: cover;
}

#female {
  background-image: url("../../assets/homePage/female.jpg");
  background-size: cover;
}

#peishi {
  background-image: url("../../assets/homePage/peishi.jpg");
  background-size: cover;
}
</style>