<template>
  <el-container class="container">

    <!--把搜索栏、购物车固定在顶部-->
    <div class="searchBar">
      <SearchBar @performSearch="receiveSearchVal" />
    </div>

    <!-- 装饰图 -->
    <div class="long">
      <img src="../../assets/homePage/long-logo.gif" class="long-logo">
    </div>

    <!-- 分类大卡片 -->
    <div class="card-container">
      <div class="view view-first" id="male">
        <div class="mask">
          <h1>男款</h1>
          <p>体验古老文化的魅力，穿上男装感受传统的力量！</p>
          <p>独特的剪裁与细节，让你在任何场合都与众不同！</p>
          <a href="#/classify?class=nanzhuang" class="info">查看更多</a>
        </div>
      </div>
      <div class="view view-first" id="peishi">
        <div class="mask">
          <h1>配饰</h1>
          <p>独特配饰，点亮你的造型，彰显你的个性！</p>
          <p>细节诠释华美，体验传统与现代的完美交融！</p>
          <a href="#/classify?class=peishi" class="info">查看更多</a>
        </div>
      </div>
      <div class="view view-first" id="female">
        <div class="mask">
          <h1>女款</h1>
          <p>穿上民族服饰女装，展现你独特的个性与风情！</p>
          <p>展现你的优雅，成为华丽民族风的代言人！</p>
          <a href="#/classify?class=nvzhuang" class="info">查看更多</a>
        </div>
      </div>
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
import { defineEmits } from 'vue';
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from 'vue'
import Card from "@/components/common/Card.vue";
import { getGoodsInPage } from "@/api/goods";
import { ElMessage } from "element-plus";
import router from "@/router";
import { base64ToUrl } from '@/utils/photo'


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
  background-color: #F4F4F4;
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
  margin: 10px 120px;
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
  width: 100%;
}

.itemcol {
  border: 0;
  /*1像素宽度、实现样式、灰色颜色的边框 */
  border-radius: 5px;
  /*5像素的圆角边框 */
  padding: 1px;
  /*元素内部内容与边框之间的距离 */
  text-align: center;
  margin-left: 30px;
  margin-top: 10px;
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

.searchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  width: 98%;
  box-sizing: border-box;
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

.card-container .view {
  position: relative;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.card-container:hover .view {
  opacity: 1;
  transform: translateY(0px);
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

.item {
  margin: 0 auto;
  width: 170px;
  height: 170px;
  overflow: hidden;
}

.item .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.view {
  width: 350px;
  height: 350px;
  margin: 10px;
  float: left;
  border: 10px solid #fff;
  overflow: hidden;
  position: relative;
  text-align: center;
  box-shadow: 1px 1px 2px #e6e6e6;
  cursor: default;
}

.view .mask,
.view .content {
  width: 350px;
  height: 350px;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0
}

.view img {
  display: block;
  position: relative
}

.view h1 {
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  position: relative;
  font-size: 17px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  margin: 20px 0 0 0
}

.view p {
  color: #fff;
  font-style: italic;
  font-size: 14px;
  font-weight: 800px;
  position: relative;
  margin: 40px auto;
  text-align: center
}

.view a.info {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  background: #000;
  color: #fff;
  text-transform: uppercase;
  box-shadow: 0 0 1px #000
}

.view a.info:hover {
  box-shadow: 0 0 5px #000
}

.view-first img {
  transition: all 0.2s linear;
}

.view-first .mask {
  opacity: 0;
  background-color: rgba(74, 71, 70, 0.7);
  // background-color: rgba(234, 174, 162, 0.7);
  transition: all 0.4s ease-in-out;
}

.view-first h1 {
  transform: translateY(-100px);
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.view-first p {
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.2s linear;
}

.view-first a.info {
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.view-first:hover img {
  transform: scale(1.1);
}

.view-first:hover .mask {
  opacity: 1;
}

.view-first:hover h1,
.view-first:hover p,
.view-first:hover a.info {
  opacity: 1;
  transform: translateY(0px);
}

.view-first:hover p {
  transition-delay: 0.1s;
}

.view-first:hover a.info {
  transition-delay: 0.2s;
}
</style>