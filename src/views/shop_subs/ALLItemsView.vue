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
      <el-col :span="6">
        <el-button type="primary" @click="searchProducts">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-col>
      <el-col :span="6">
        <div class="sort-box">
          <el-icon style="margin-right: 8px;"><Filter /></el-icon>
          <el-select v-model="sortKey" placeholder="排序方式">
            <el-option label="按价格升序" value="priceAsc"></el-option>
            <el-option label="按价格降序" value="priceDesc"></el-option>
            <el-option label="按发布时间升序" value="timeAsc"></el-option>
            <el-option label="按发布时间降序" value="timeDesc"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="product-list">
      <el-col :span="5.5" v-for="(product, index) in currentProducts" :key="product.id" :gutter="20">
        <Card class="card">
          <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
            <img class="product-image" :src="product.image" alt="Product Image" />
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="button-group">
              <p style="color: orange;">￥{{ product.price }}</p>
            </div>
          </div>
        </Card>
      </el-col>
    </el-row>
    <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="filteredProducts.length" @current-change="handlePageChange"></el-pagination>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination } from 'element-plus';
import Card from "@/components/common/Card.vue";
import { Search,Filter } from '@element-plus/icons-vue';

const products = reactive([
  {
    id: '1',
    name: '商品A',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T10:30:00', // 时间信息
    price: 10.99, // 价格信息
  },
  {
    id: '2',
    name: '商品B',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T11:00:00', // 时间信息
    price: 15.99, // 价格信息
  },
  {
    id: '3',
    name: '商品C',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T12:00:00', // 时间信息
    price: 20.99, // 价格信息
  },
  {
    id: '4',
    name: '商品D',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T13:30:00', // 时间信息
    price: 12.99, // 价格信息
  },
  {
    id: '5',
    name: '商品E',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T14:15:00', // 时间信息
    price: 18.99, // 价格信息
  },
  {
    id: '6',
    name: '商品F',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T15:00:00', // 时间信息
    price: 9.99, // 价格信息
  },
  {
    id: '7',
    name: '商品G',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T16:30:00', // 时间信息
    price: 22.99, // 价格信息
  },
  {
    id: '8',
    name: '商品H',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T17:00:00', // 时间信息
    price: 16.99, // 价格信息
  },
  {
    id: '9',
    name: '商品I',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T18:00:00', // 时间信息
    price: 13.99, // 价格信息
  },
  {
    id: '10',
    name: '商品J',
    image: 'https://picsum.photos/200/200',
    time: '2023-07-30T19:30:00', // 时间信息
    price: 24.99, // 价格信息
  },
  // 更多商品...
]);

const searchProductName = ref('');
const sortKey = ref(''); // 排序方式，默认为空
const isHovered = reactive(Array(products.length).fill(false));
const currentPage = ref(1);
const pageSize = 8;

const searchProducts = () => {
  const searchText = searchProductName.value.trim().toLowerCase();

  if (searchText === '') {
    // 当搜索商品名称为空时，显示所有商品
    currentPage.value = 1;
  } else {
    // 根据商品名称进行过滤
    const filtered = products.filter(product => product.name.toLowerCase().includes(searchText));

    // 更新当前页码并重置排序方式
    currentPage.value = 1;
    sortKey.value = '';

    // 将过滤后的商品列表更新到页面上
    filteredProducts.value = filtered;
  }
};

const resetFilters = () => {
  searchProductName.value = '';
  sortKey.value = '';
  currentPage.value = 1;
};

const filteredProducts = computed(() => {
  const searchText = searchProductName.value.trim().toLowerCase();

  let sortedProducts = [...products];

  if (sortKey.value === 'priceAsc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortKey.value === 'priceDesc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortKey.value === 'timeAsc') {
    sortedProducts.sort((a, b) => new Date(a.time) - new Date(b.time));
  } else if (sortKey.value === 'timeDesc') {
    sortedProducts.sort((a, b) => new Date(b.time) - new Date(a.time));
  }

  if (searchText === '') {
    return sortedProducts;
  } else {
    return sortedProducts.filter(product => product.name.toLowerCase().includes(searchText));
  }
});

const currentProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
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

.sort-box {
  display: flex;
  align-items: center;
  margin-right: auto;
}
</style>
