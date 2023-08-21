<template>
  <div class="shop-info">
    <div class="shop-header">
      <img :src="shopIcon" alt="Shop Icon" class="shop-icon" />
      <h1 class="shop-name">{{ shopName }}</h1>
      <div class="shop-rating">
        <el-rate v-model="shopRating" disabled></el-rate>
      </div>
    </div>
    <div class="shop-content">
      <h2>店铺简介</h2>
      <p>{{ shopDescription }}</p>
      <h2>店铺地址</h2>
      <p>{{ shopAddress }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElRate } from 'element-plus';

export default {
  components: {
    ElRate,
  },
  setup() {
    const shopIcon = ref('https://picsum.photos/200/300');
    const shopName = ref('我是斯黛拉姐姐的狗');
    const shopRating = ref(4); // 假设初始评分为4
    const shopDescription = ref('这是一家很不错的店铺。');
    const shopAddress = ref('北京市朝阳区');

    return {
      shopIcon,
      shopName,
      shopRating,
      shopDescription,
      shopAddress,
    };
  },
};
</script>

<style scoped>
.shop-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* ... */
}

.shop-header {
  margin-bottom: 20px;
  /* ... */
}

</style>
