<template>
  <div class="product-management">
    <h1 class="title">已上架商品管理</h1>
<!--    <el-row :gutter="20" class="filters">-->
<!--      <el-col :span="6">-->
<!--        <div class="search-box">-->
<!--          <el-icon><Search /></el-icon>-->
<!--          <el-input v-model="searchProductName" placeholder="商品名称"></el-input>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <el-button type="primary" @click="searchProducts">查询</el-button>-->
<!--        <el-button @click="resetFilters">重置</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row :gutter="20" class="product-list">
      <el-col :span="5.5" v-for="(product, index) in currentProducts" :key="index"  :gutter="20">
        <Card class="card">
        <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
          <img class="product-image" :src="product.imageurl" alt="Product Image" />
          <h3 class="product-name">{{ product.productName }}</h3>
          <div class="button-group">
            <el-button type="primary" size="small" @click="editProduct(index)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteProduct(index)">删除</el-button>
          </div>
        </div>
      </Card>
      </el-col>
    </el-row>
    <el-pagination
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue';
import {ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination, ElMessage} from 'element-plus';
import Card from "@/components/common/Card.vue";
import { Search } from '@element-plus/icons-vue';
import {getGoodsInPage} from "@/api/goods";
import {base64ToUrl} from "@/utils/photo";
import {useRoute} from "vue-router";

const route = useRoute()

const products = ref([]);

const searchProductName = ref('');
const isHovered = reactive(Array(products.value.length).fill(false));
const currentPage = ref(1);
const pageSize = 8;

let total = ref();

onMounted(() => {
  getCommodities()
})

watch(currentPage, () => {
  getCommodities()
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
        for (let i = 0; i < resp.data.records.length; i ++) {
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
        ElMessage("商品拉取失败")
      })
}


const filteredProducts = computed(() => {
  const searchText = searchProductName.value.trim().toLowerCase();
  if (searchText === '') {
    return products.value;
  } else {
    return products.value.filter(product => product.name.toLowerCase().includes(searchText));
  }
});

const currentProducts = computed(() => {
  const startIndex = 0;
  const endIndex = startIndex + pageSize;
  return filteredProducts.value.slice(startIndex, endIndex);
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

</script>

<style scoped>

.card{
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
  margin-left: 10px; /* 修改 icon 和 input 之间的间距 */
}
</style>
