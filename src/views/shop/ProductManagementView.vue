<template>
  <div class="product-management">
    <h1 class="title">已上架商品管理</h1>
    <el-row :gutter="20" class="filters">
      <el-col :span="6">
        <div class="search-box">
          <el-icon><Search /></el-icon>
          <el-input v-model="searchProductName" placeholder="商品名称"></el-input>
        </div>
      </el-col>
<!--      <el-col :span="6">-->
<!--        <el-button type="primary" @click="searchProducts">查询</el-button>-->
<!--        <el-button @click="resetFilters">重置</el-button>-->
<!--      </el-col>-->
    </el-row>
    <el-row :gutter="20" class="product-list">
      <el-col :span="5.5" v-for="(product, index) in currentProducts" :key="product.id"  :gutter="20">
        <Card class="card">
        <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
          <img class="product-image" :src="product.image" alt="Product Image" />
          <h3 class="product-name">{{ product.name }}</h3>
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
      :total="filteredProducts.length"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination } from 'element-plus';
import Card from "@/components/common/Card.vue";
import { Search } from '@element-plus/icons-vue';

const products = ref([
  {
    id: '1',
    name: '商品A',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '2',
    name: '商品B',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '3',
    name: '商品C',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '4',
    name: '商品D',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '5',
    name: '商品E',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '6',
    name: '商品F',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '7',
    name: '商品G',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '8',
    name: '商品H',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '9',
    name: '商品I',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '10',
    name: '商品J',
    image: 'https://picsum.photos/200/200',
  },
  // 更多商品...
]);

const searchProductName = ref('');
const isHovered = reactive(Array(products.value.length).fill(false));
const currentPage = ref(1);
const pageSize = 8;

let total;


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
