<template>
  <div class="product-management">
    <h1 class="title">全部宝贝</h1>
    <el-row :gutter="20" class="product-list">
      <el-col :span="5.5" v-for="(product, index) in currentProducts" :key="index" :gutter="20">
        <Card class="card">
          <RouterLink
            :to="{ path: '/goodsdetail', query: { productName: product.productName, goodsId: product.productId, storeId: route.query.storeid } }"
            class="router-link-active">
            <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
              <div class="picture-container">
                <img class="product-picture" :src="product.imageurl" alt="Product Image" />
              </div>
              <h3 class="product-name">{{ product.productName }}</h3>
              <div class="button-group">
                <p style="color: orange;">￥{{ product.price }}</p>
              </div>
            </div>
          </RouterLink>
        </Card>
      </el-col>
    </el-row>
    <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="total"
      @current-change="handlePageChange"></el-pagination>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination, ElMessage } from 'element-plus';
import Card from "@/components/common/Card.vue";
import { Search, Filter } from '@element-plus/icons-vue';
import { getGoodsInPage } from "@/api/goods";
import { useRoute } from "vue-router";
import { base64ToUrl } from "@/utils/photo";
import { getStoreInfo } from "@/api/store";

const route = useRoute()

const products = ref([]);

const isHovered = reactive(Array(products.value.length).fill(false));
const currentPage = ref(1);
const pageSize = 8;
let total = ref();

const currentProducts = computed(() => {
  const startIndex = 0;
  const endIndex = startIndex + pageSize;
  return products.value.slice(startIndex, endIndex);
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

onMounted(() => {
  getCommodities();
})

watch(currentPage, () => {
  getCommodities();
})

const getCommodities = () => {
  getGoodsInPage({
    pageSize: pageSize,
    pageIndex: currentPage.value,
    commodityId: null,
    storeId: route.query.storeid,
    pricemin: null,
    pricemax: null,
    type: null,
    name: null,
    description: ""
  })
    .then(resp => {
      products.value = []
      for (let i = 0; i < resp.data.records.length; i++) {
        products.value.push({
          productId: resp.data.records[i].productId,
          productName: resp.data.records[i].productName,
          description: resp.data.records[i].description,
          price: resp.data.records[i].price,
          imageurl: base64ToUrl(resp.data.records[i].image.fileContents, resp.data.records[i].image.contentType),
        })
      }
      total.value = resp.data.total;
    })
    .catch(resp => {
      ElMessage({
        message: '删除失败',
        type: 'warning',
      })
    })
}

</script>

<style scoped>
.card {
  width: 240px;
  height: 325px;
  margin-top: 20px
}

.product-management {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
}

.product-list {
  margin-bottom: 20px;
}

.product-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-image {
  border-radius: 20px;
  width: 100%;
}

.product-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-box .el-input {
  margin-left: 10px;
  /* 修改 icon 和 input 之间的间距 */
}

.sort-box {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.router-link-active {
  text-decoration: none;
  cursor: pointer;
}

.picture-container {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  overflow: hidden;
}

.picture-container .product-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
