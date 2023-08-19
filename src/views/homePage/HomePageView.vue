<!--首页-->
<!--html模板-->
<template>
  <el-container class="container">

    <!--把搜索栏、购物车固定在顶部-->
    <div>
      <SearchBar />
    </div>
    <!--分类标签-->
    <!-- <el-tag v-for="tag in tags" :key="tag.name" class="mx-1" closable :type="tag.type">
      {{ tag.name }}
    </el-tag> -->
    <!--分类和轮播图、个人信息-->
    <div class="homeBanner">
      <HomeBanner />
    </div>




    <!--排序-->
    <div class="sort">
      <SortRow />
    </div>


    <!--推荐商品-->
    <div>
      <RecommendCol />
    </div>

    <!--底部-->
    <el-footer class="footer" justify="center">
      footer

    </el-footer>


  </el-container>
</template>

  <!--js脚本函数-->
<script setup>
//import { ElHeader, ElMenu, ElMenuItem, ElSubMenu, ElButton, ElRow, ElCol, ElInput } from 'element-plus';
import SearchBar from "@/components/HomePage/SearchBar.vue"
import HomeBanner from "@/components/HomePage/HomeBanner.vue"
import RecommendCol from "@/components/HomePage/RecommendCol.vue"
import SortRow from "@/components/HomePage/SortRow.vue"
// import { ref } from 'vue'

// const tags = ref([
//   { name: 'Tag 1', type: '' },
//   { name: 'Tag 2', type: 'success' },
//   { name: 'Tag 3', type: 'info' },
//   { name: 'Tag 4', type: 'warning' },
//   { name: 'Tag 5', type: 'danger' },
// ])

  //可以使用v-model指令将搜索框中的文本内容与search数据属性进行双向绑定，以便在组件中可以实时获取和更新搜索框中的内容
</script>


  <!--CSS风格-->
<style scoped>
.container {
  background-color: #b6e0eb;
  margin-top: 5px;
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

}

.footer {
  margin: 10px 60px;
  /*上下左右四个方向的外部空白区域均为 20px */
  border: 1px solid #fffcfc;
  /* 设置边框样式 */
  border-radius: 10px;
  /* 设置圆角半径 */
  background-color: #f5f5f5;
}
</style>