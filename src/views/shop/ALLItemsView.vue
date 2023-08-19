<template>
    <div class="shop-page">
      <div class="search-sort-row">
        <div class="search-bar">
          <input v-model="searchText" class="search-input" placeholder="请输入关键字进行搜索" />
          <button class="search-btn" @click="search">
            <i class="el-icon-search"></i>
          </button>
        </div>
        <el-select v-model="sortBy" placeholder="请选择排序方式" class="sort-select">
          <el-option label="价格升序" value="priceAsc"></el-option>
          <el-option label="价格降序" value="priceDesc"></el-option>
          <el-option label="发布日期升序" value="dateAsc"></el-option>
          <el-option label="发布日期降序" value="dateDesc"></el-option>
          <el-option label="销量升序" value="salesAsc"></el-option>
          <el-option label="销量降序" value="salesDesc"></el-option>
          <el-option label="收藏数升序" value="favoritesAsc"></el-option>
          <el-option label="收藏数降序" value="favoritesDesc"></el-option>
        </el-select>
      </div>

      <div class="card-list">
        <div v-for="item in filteredList" :key="item.id" class="card">
          <div class="card-image">
            <img :src="item.imageUrl" alt="Product Image" />
          </div>
          <div class="card-content">
            <div class="card-title">{{ item.name }}</div>
            <div class="card-price">价格：{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue';

  const searchText = ref('');
  const sortBy = ref('');

  const productList = ref([
    {
      id: 1,
      name: '商品1',
      description: '这是商品1的描述',
      price: 50,
      imageUrl: 'https://picsum.photos/id/1018/400/200',
      date: '2022-01-01',
      sales: 100,
      favorites: 50
    },
    {
      id: 2,
      name: '商品2',
      description: '这是商品2的描述',
      price: 100,
      imageUrl: 'https://picsum.photos/id/1018/400/200',
      date: '2022-02-01',
      sales: 200,
      favorites: 80
        },
        {
    id: 3,
    name: '商品3',
    description: '这是商品3的描述',
    price: 80,
    imageUrl: 'https://picsum.photos/id/1018/400/200',
    date: '2022-03-01',
    sales: 150,
    favorites: 60
  },
  {
    id: 4,
    name: '商品4',
    description: '这是商品4的描述',
    price: 120,
    imageUrl: 'https://picsum.photos/id/1018/400/200',
    date: '2022-04-01',
    sales: 80,
    favorites: 30
  },
  {
    id: 5,
    name: '商品5',
    description: '这是商品5的描述',
    price: 90,
    imageUrl: 'https://picsum.photos/id/1018/400/200',
    date: '2022-05-01',
    sales: 120,
    favorites: 70
        },
        {
    id: 6,
    name: '商品6',
    description: '这是商品6的描述',
    price: 70,
    imageUrl: 'https://picsum.photos/id/1018/400/200',
    date: '2022-06-01',
    sales: 90,
    favorites: 40
  },
  {
    id: 7,
    name: '商品7',
    description: '这是商品7的描述',
    price: 110,
    imageUrl: 'https://picsum.photos/id/1018/400/200',
    date: '2022-07-01',
    sales: 180,
    favorites: 90
  }

    // 添加更多商品...
  ]);

  const filteredList = computed(() => {
    let list = productList.value;

    // 根据搜索关键字进行模糊搜索
    if (searchText.value) {
      list = list.filter(item =>
        item.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.value.toLowerCase())
      );
    }

    // 根据排序方式进行排序
    switch (sortBy.value) {
      case 'priceAsc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'dateAsc':
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'dateDesc':
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'salesAsc':
        list.sort((a, b) => a.sales - b.sales);
        break;
      case 'salesDesc':
        list.sort((a, b) => b.sales - a.sales);
        break;
      case 'favoritesAsc':
        list.sort((a, b) => a.favorites - b.favorites);
        break;
      case 'favoritesDesc':
        list.sort((a, b) => b.favorites - a.favorites);
        break;
    }

    return list;
  });
  </script>

  <style scoped>
  .shop-page {
    padding: 20px;
  }

  .search-sort-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    width: 300px;
  }

  .search-input {
    width: 100%;
    padding: 8px 30px 8px 10px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-btn {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .sort-select {
    width: 200px;
  }

  .card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 350px));
  gap: 20px; /* 添加卡片之间的间隔 */
  margin-top: 20px;
}


  .card {
    border: 1px solid #ccc;
    padding: 10px;
    width: 300px; /* 添加固定宽度限制 */
    height: 200px; /* 添加固定高度限制 */
    transition: box-shadow 0.3s ease-in-out;
  }

  .card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .card-image img {
    width: 100%;
    height: 100%; /* 添加图片高度以保持固定比例 */
    object-fit: cover; /* 图片等比例缩放填充容器 */
  }

  .card-content {
    margin-top: 10px;
  }

  .card-title {
    font-size: 16px;
    font-weight: bold;
  }

  .card-price {
    margin-top: 5px;
    color: #888;
  }
  </style>
