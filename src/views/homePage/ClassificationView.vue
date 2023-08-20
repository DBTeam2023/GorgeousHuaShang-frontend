<!--展示分类筛选后的商品列表页-->
<!--html模板-->
<template>
  <el-container class="container">
      <!--把搜索栏、购物车固定在顶部-->
      <div>
        <SearchBar @performSearch="receiveSearchVal" />
      </div>
      <div class="my-classificaion">
        <el-card class="top-card" shadow="always">
          <div class="custom-font">
            筛选类别
          </div>
          <ul>
            <li>
              <span class="my-classification-item-head">朝代</span>
              <span class="classification-item" @click="toggleSelection( '朝代,唐朝')">唐朝</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '朝代,宋朝')">宋朝</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '朝代,明朝')">明朝</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('朝代,清朝')">清朝</span>
            </li>
            <el-divider border-style="dashed" class="small-divider"/>
            <li>
              <span class="my-classification-item-head">适用人群</span>
              <span class="classification-item" @click="toggleSelection('男')">男</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '女')">女</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '儿童')">儿童</span>
            </li>
            <el-divider border-style="dashed"   class="small-divider"/>
            <li>
              <span class="my-classification-item-head">类别</span>
              <span class="classification-item" @click="toggleSelection('上衣')">上衣</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '下衣')">下衣</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('鞋')">鞋</span>
            </li>
            <el-divider border-style="dashed"   class="small-divider"/>
            <li>
              <span class="my-classification-item-head">服饰配件</span>
              <span class="classification-item" @click="toggleSelection('帽子')">帽子</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '项链')">项链</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('手工艺品')">手工艺品</span>
            </li>
            <el-divider border-style="dashed"   class="small-divider"/>
            <li>
              <span class="my-classification-item-head">民族</span>
              <span class="classification-item" @click="toggleSelection( '苗族')">苗族</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '汉族')">汉族</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '藏族')">藏族</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection( '蒙古族')">蒙古族</span>
            </li>
          </ul>
        </el-card>
      </div>

      <div class="classification-tag">
        <!--分类标签-->
<!--        <el-tag v-for="tag in tags" :key="tag.name" class="mx-1" closable :type="tag.type">-->
<!--          {{ tag.name }}-->
<!--        </el-tag>-->

      <!-- 已选筛选条件标签 -->
        <div v-if="selectedTags.length > 0" class="selected-tags">
          <el-tag v-for="(tag, index) in    selectedTags   " :key="index" class="tag" closable @close="removeTag(tag)"
            :type=getRandomColor()>
            {{ tag.value }}
          </el-tag>

          <el-button class="clear-all-btn" size="small" @click="clearAllTags">清空</el-button>
        </div>
      </div>


      <!--排序-->
      <div class="sort">
        <SortRow />
      </div>


      <!--推荐商品-->
      <div style="width: 98%">
        <RecommendCol />
      </div>


    <el-footer class="my-footer">
      <img src="../../assets/homePage/footer.png">
    </el-footer>

  </el-container>
</template>
  
<!--js脚本函数-->
<script setup>
import store from "@/store";
import {onMounted, ref} from "vue";
import RecommendCol from "@/components/HomePage/RecommendCol.vue";
import SearchBar from "@/components/HomePage/SearchBar.vue";
import SortRow from "@/components/HomePage/SortRow.vue";

let filters = ref({
  selectClassification: "",
  searchVal: "",
})
//分类筛选标签
const selectedTags = ref([])

onMounted(() => {
  // 页面跳转后选择的类别
  filters.value.selectClassification = store.state.homepage.selectClassification;
  if (filters.value.selectClassification !== "") {
    selectedTags.value.push({
      value: filters.value.selectClassification
    });
  }
});

const toggleSelection = (value) => {
  const existingTag = selectedTags.value.find(tag => tag.value === value);
  console.log(selectedTags.value)
  if (existingTag) {
    removeTag(existingTag);
  } else {
    selectedTags.value.push({ value });
  }
};

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);//过滤函数，将不等于传入值的元素保留下来
  if (store.state.homepage.selectClassification === tag.value) {
    store.commit("setSelectClassification", "")
  }

};

const clearAllTags = () => {
  selectedTags.value = [];
  store.commit("setSelectClassification", "")
};

const types = ['primary', 'success', 'info', 'warning', 'danger']
const colorIndex = ref(0); //响应式变量，跟踪当前使用的颜色索引
const getRandomColor = () => {

  const color = types[colorIndex.value];
  colorIndex.value = (colorIndex.value + 1) % types.length;
  return color;
}

const receiveSearchVal = (val) => {
  filters.value.searchVal = val;
}

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

.sort {
  margin-left: 10vw;
}

.classification-item {
  cursor: pointer;
  transition: all .5s;
}

.my-classification-item-head {
  display: inline-block;
  width: 100px;
}

.my-classificaion {
  display: flex;
  height: 250px;
  width: auto;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.my-classificaion li {
  display: block;
  margin-right: 10px;
  /* 调整水平间距 */
  //margin-bottom: 10px;
  /* 调整垂直间距 */
  background-color: white;
}

.my-classificaion ul {
  height: auto;
  overflow: hidden;
  list-style-type: none;
  padding-inline-start: 0px;
  //display: flex;
  //flex-wrap: wrap;
  margin-top: -8px;
}

.classification-item:hover {
  background-color: white;
  color: blue;
  padding-left: 10px;
}

.top-card {
  width: 80vw;
}

.classification-tag {
  margin-left: 10vw;
}

.small-divider {
  height: 1px; /* 设置分割线的高度 */
  margin: 5px 0; /* 调整分割线的上下间距 */
}

</style>

<style lang="scss" scoped>

.custom-font {
  font-family: 'Poppins', sans-serif; /* 应用 Poppins 字体 */
  font-weight: 600; /* 加粗 */
  font-size: 24px; /* 字号较大 */
  margin-bottom: 20px;
}

.divCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>