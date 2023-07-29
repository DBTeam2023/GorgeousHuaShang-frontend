<template>
  <div class="product-management">
    <el-row :gutter="20" class="product-list">
      <el-col :span="5.5" v-for="(product, index) in currentProducts" :key="product.id"  :gutter="20">
        <Card class="card">
        <div :style="{ color: isHovered[index] ? '#69c0ff' : '' }">
          <img class="product-image" :src="product.image" alt="Product Image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="button-group">
            <p>店铺描述</p>
          </div>
        </div>
      </Card>
      </el-col>
    </el-row>
    <div class="container">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="filteredProducts.length"
      @current-change="handlePageChange"
      :hide-on-single-page="value"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { ElButton, ElCol, ElInput, ElRow, ElIcon, ElPagination } from 'element-plus';
import Card from "@/components/common/Card.vue";
import { Search } from '@element-plus/icons-vue';

const products = reactive([
  {
    id: '1',
    name: '店铺A',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: '2',
    name: '店铺B',
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
const isHovered = reactive(Array(products.length).fill(false));
const currentPage = ref(1);
const pageSize = 2;

const searchProducts = () => {
  // 根据商品名称进行查询逻辑
};

const resetFilters = () => {
  searchProductName.value = '';
  currentPage.value = 1;
};

const filteredProducts = computed(() => {
  const searchText = searchProductName.value.trim().toLowerCase();
  if (searchText === '') {
    return products;
  } else {
    return products.filter(product => product.name.toLowerCase().includes(searchText));
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
.product-management.sign-up-model{
    opacity: 0;
    transition: 1s ease-in-out;
    z-index: 0;
}
.card{
  width: 240px;
  height: 375px;
  margin-top: 20px
}

.product-management {
  grid-column: 1;
    grid-row: 1;
    opacity: 1;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    /* 上下 | 左右 */
    padding: 0% 10%;
    z-index: 1;
    justify-content: center;
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
.container {
  display: flex;
  justify-content: center;
  margin-left: -30px;
}
</style>
