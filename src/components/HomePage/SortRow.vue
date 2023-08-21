<!--排序-->
<template>
<!--      &lt;!&ndash; 综合排序选择器 &ndash;&gt;-->
<!--      <el-select v-model="sortOption" placeholder="选择排序方式" @change="fetchProducts">-->
<!--          <el-option label="综合排序" value="default"></el-option>-->
<!--      </el-select>-->

<!--      &lt;!&ndash; 销售量排序选择器 &ndash;&gt;-->
<!--      <el-select v-model="salesSortOption" placeholder="选择销售量排序" @change="fetchProducts">-->
<!--          <el-option label="销售量从高到低" value="salesDesc"></el-option>-->
<!--          <el-option label="销售量从低到高" value="salesAsc"></el-option>-->
<!--      </el-select>-->

<!--      &lt;!&ndash; 价格排序选择器 &ndash;&gt;-->
<!--      <el-select v-model="priceSortOption" placeholder="选择价格排序" @change="fetchProducts">-->
<!--          <el-option label="价格从高到低" value="priceDesc"></el-option>-->
<!--          <el-option label="价格从低到高" value="priceAsc"></el-option>-->
<!--      </el-select>-->

      <!-- 价格区间选择器 -->
      <div class="price-range">
          <span>价格区间：</span>
          <el-input-number v-model="minPrice" :min="0" :max="maxPrice" placeholder="最低价格"
              @change="fetchProducts"></el-input-number>
          <span>-</span>
          <el-input-number v-model="maxPrice" :min="minPrice" placeholder="最高价格"
              @change="fetchProducts"></el-input-number>
      </div>

<!--      &lt;!&ndash; 商品列表 &ndash;&gt;-->
<!--      <div v-for="product in products" :key="product.id">-->
<!--          <h3>{{ product.name }}</h3>-->
<!--          <p>销售量: {{ product.sales }}</p>-->
<!--          <p>价格: {{ product.price }}</p>-->
<!--      </div>-->
</template>
  

<script setup>
import {defineEmits, ref, watch} from 'vue';

// const products = ref([]);
// const sortOption = ref('default');
// const salesSortOption = ref('');
// const priceSortOption = ref('');

const minPrice = ref(0);
const maxPrice = ref(Infinity);

const tupPrice = [minPrice, maxPrice]

const emit = defineEmits(['PriceChange'])

watch(tupPrice, (newValue, oldValue) => {
  emit('PriceChange', newValue)
})

const fetchProducts = () => {
    // setTimeout(() => {
    //     const sortedProducts = sortProducts(sortOption.value);
    //     const filteredProducts = filterProducts(sortedProducts);
    //     products.value = filteredProducts;
    // }, 500);

  // 暂时用不到
};

const sortProducts = (option) => {
    // 发送排序参数到后端接口，后端返回排序后的商品数据
    // 返回排序后的商品数组
    // ...
};

const filterProducts = (products) => {
    // 发送价格过滤参数到后端接口，后端返回满足价格区间的商品数据
    // 返回过滤后的商品数组
    // ...
};
</script>
  
<style>
.price-range {
    margin-top: 10px;
}


</style>