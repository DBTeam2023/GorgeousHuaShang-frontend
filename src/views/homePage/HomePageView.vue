<template>
  <el-container class="container">
    <el-main class="my-main">
      <!--把搜索栏、购物车固定在顶部-->
      <div>
        <SearchBar @performSearch="receiveSearchVal" />
      </div>

      <!--分类和轮播图、个人信息-->
      <div class="homeBanner">
        <HomeBanner />
      </div>

      <div class="divCenter">
        <img src="../../assets/homePage/fire.png">
        <div class="custom-font">
          为你推荐
        </div>
      </div>

      <!--推荐商品-->
      <div style="width: 98%">
        <RecommendCol />
      </div>
    </el-main>
    <!--底部-->

    <el-footer class="my-footer">
      <img src="../../assets/homePage/footer.png">
    </el-footer>

  </el-container>
</template>

  <!--js脚本函数-->
<script setup>
import SearchBar from "@/components/HomePage/SearchBar.vue"
import HomeBanner from "@/components/HomePage/HomeBanner.vue"
import RecommendCol from "@/components/HomePage/RecommendCol.vue"
import { ref } from 'vue'

let searchVal = ref("")

const receiveSearchVal = (val) => {
  searchVal.value = val;
  console.log(searchVal.value)
}

  //可以使用v-model指令将搜索框中的文本内容与search数据属性进行双向绑定，以便在组件中可以实时获取和更新搜索框中的内容
</script>


  <!--CSS风格-->
<style scoped>
.my-footer {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  height: 100%;
}

.container {
  background-color: #F4F4F4;
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
  width: 95%;
}


</style>

<style lang="scss" scoped>

.custom-font {
  font-family: 'Poppins', sans-serif; /* 应用 Poppins 字体 */
  font-weight: 600; /* 加粗 */
  font-size: 24px; /* 字号较大 */
}

.divCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>