<template>
  <div class="product-management">
    <h1 class="title">已上架商品管理</h1>
    <el-row :gutter="20" class="filters">
      <el-col :span="6">
        <el-input v-model="searchProductName" placeholder="商品名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="searchProducts">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="product-list">
      <el-col :span="6" v-for="product in filteredProducts" :key="product.id">
        <el-card class="product-card">
          <a href="" target="_blank">
          <div class="product-image">
            <img :src="product.image" alt="商品图片">
          </div>
        </a>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-actions">
              <el-button type="primary" size="small" @click="editProduct(product)">修改</el-button>
              <el-button type="danger" size="small" @click="deleteProduct(product)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed,reactive, ref } from 'vue';
import { ElButton, ElCard, ElCol, ElInput, ElRow } from 'element-plus';

export default {
  components: {
    ElButton,
    ElCard,
    ElCol,
    ElInput,
    ElRow,
  },
  setup() {
    const products = reactive([
      {
        id: '1',
        name: '商品A',
        image:
          'https://picsum.photos/200/300',
      },
      {
        id: '2',
        name: '商品B',
        image:
          'https://picsum.photos/200/300',
      },
      // 其他商品数据...
    ]);

    const searchProductName = ref('');

    const searchProducts = () => {
      // 根据商品名称进行查询逻辑
    };

    const resetFilters = () => {
      searchProductName.value = '';
    };

    const filteredProducts = computed(() => {
      // 根据商品名称进行筛选逻辑
      return products.filter((product) =>
        product.name.includes(searchProductName.value)
      );
    });

    // const editProduct = (product) => {
    //   // 编辑商品
    // };

    // const deleteProduct = (product) => {
    //   // 删除商品
    // };

    return {
      searchProductName,
      searchProducts,
      resetFilters,
      filteredProducts,
    };
  },
};
</script>

<style>
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
  text-align: center;
  margin-bottom: 10px;
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
</style>
