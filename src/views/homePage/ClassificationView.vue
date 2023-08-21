<!--展示分类筛选后的商品列表页-->
<!--html模板-->
<template>
  <el-container class="container">
      <!--把搜索栏、购物车固定在顶部-->
      <div>
        <SearchBar @performSearch="receiveSearchVal" />
      </div>
      <div class="my-classificaion-1" v-if="route.query.class === 'peishi'">
        <el-card class="top-card" shadow="always">
          <div class="custom-font">
            筛选类别
          </div>
          <ul>
            <li>
              <span class="my-classification-item-head" @click="toggleSelection('配饰,民族')">民族</span>
              <span class="classification-item" @click="toggleSelection('配饰,民族,头饰')">头饰</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('配饰,民族,耳饰')">耳饰</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('配饰,民族,腰饰')">腰饰</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('配饰,民族,项链')">项链</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('配饰,民族,手饰')">手饰</span>
            </li>
          </ul>
        </el-card>
      </div>
      <div class="my-classificaion-2" v-else-if="route.query.class === 'nanzhuang'">
        <el-card class="top-card" shadow="always">
          <div class="custom-font">
            筛选类别
          </div>
          <ul>
            <li>
              <span class="my-classification-item-head" @click="toggleSelection('男装,上衣')">上衣</span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,麻布大褂')">麻布大褂</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,鱼皮衣')">鱼皮衣</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,羊皮大衣')">羊皮大衣</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,土布衣')">土布衣</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,中山装')">中山装</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,马褂')">马褂</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,上衣,长袍')">长袍</span>
            </li>
            <el-divider border-style="dashed" class="small-divider"/>
            <li>
              <span class="my-classification-item-head" @click="toggleSelection('男装,下衣')">下衣</span>
              <span class="classification-item" @click="toggleSelection('男装,下衣,腰裙')">腰裙</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,下衣,膝裤')">膝裤</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,下衣,裤裙')">裤裙</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,下衣,长裤')">长裤</span>
            </li>
            <el-divider border-style="dashed" class="small-divider"/>
            <li>
              <span class="my-classification-item-head" @click="toggleSelection('男装,鞋')">鞋</span>
              <span class="classification-item" @click="toggleSelection('男装,鞋,长筒靴')">长筒靴</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,鞋,牛皮靴')">牛皮靴</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,鞋,布鞋')">布鞋</span>
              <span> / </span>
              <span class="classification-item" @click="toggleSelection('男装,鞋,草鞋')">草鞋</span>
            </li>
            <el-divider border-style="dashed" class="small-divider"/>
            <li>
              <span class="my-classification-item-head" @click="toggleSelection('男装,民族')">民族</span>
<!--              <span class="classification-item" @click="toggleSelection('男装,民族,汉族')">汉族</span>-->
<!--              <span> / </span>-->
              <span v-for="(ethnicity, index) in ethnicities" :key="index">
                <span class="classification-item" @click="toggleSelection(`男装,民族,${ethnicity}`)">{{ ethnicity }}</span>
                <span v-if="index < ethnicities.length - 1"> / </span>
              </span>
            </li>
          </ul>
      </el-card>
      </div>
      <div class="my-classificaion-2" v-else-if="route.query.class === 'nvzhuang'">


      <el-card class="top-card" shadow="always">
        <div class="custom-font">
          筛选类别
        </div>
        <ul>
          <li>
            <span class="my-classification-item-head" @click="toggleSelection('女装,上衣')">上衣</span>
            <span class="classification-item" @click="toggleSelection('女装,上衣,坎肩')">坎肩</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,上衣,鱼皮衣')">鱼皮衣</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,上衣,羊皮大衣')">羊皮大衣</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,上衣,土布衣')">土布衣</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,上衣,长袍')">长袍</span>
          </li>
          <el-divider border-style="dashed" class="small-divider"/>
          <li>
            <span class="my-classification-item-head" @click="toggleSelection('女装,下衣')">下衣</span>
            <span class="classification-item" @click="toggleSelection('女装,下衣,凤尾裙')">凤尾裙</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,下衣,裤裙')">裤裙</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,下衣,筒裙')">筒裙</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,下衣,长裤')">长裤</span>
          </li>
          <el-divider border-style="dashed" class="small-divider"/>
          <li>
            <span class="my-classification-item-head" @click="toggleSelection('女装,鞋')">鞋</span>
            <span class="classification-item" @click="toggleSelection('女装,鞋,长筒靴')">长筒靴</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,鞋,牛皮靴')">牛皮靴</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,鞋,布鞋')">布鞋</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,鞋,草鞋')">草鞋</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,鞋,绣花鞋')">绣花鞋</span>
            <span> / </span>
            <span class="classification-item" @click="toggleSelection('女装,鞋,锦鞋')">锦鞋</span>
          </li>
          <el-divider border-style="dashed" class="small-divider"/>
          <li>
            <span class="my-classification-item-head" @click="toggleSelection('女装,民族')">民族</span>
            <span v-for="(ethnicity, index) in ethnicities" :key="index">
                <span class="classification-item" @click="toggleSelection(`女装,民族,${ethnicity}`)">{{ ethnicity }}</span>
                <span v-if="index < ethnicities.length - 1"> / </span>
              </span>
          </li>
        </ul>
      </el-card>
    </div>

      <div class="classification-tag">
      <!-- 已选筛选条件标签 -->
        <div v-if="selectedTags.length > 0" class="selected-tags">
          <el-tag v-for="(tag, index) in selectedTags" :key="index" class="tag" closable @close="removeTag(tag)"
            :type=getRandomColor()>
            {{ tag.value }}
          </el-tag>

          <el-button class="clear-all-btn" size="small" @click="clearAllTags">清空</el-button>
        </div>
      </div>


      <!--排序-->
      <div class="sort">
        <SortRow @PriceChange="receivePriceVal"/>
      </div>


      <!--推荐商品-->
      <div style="width: 98%">
        <RecommendCol @pageOption="receivePageVal" :pageValue="commodities"/>
      </div>


    <el-footer class="my-footer">
      <img src="../../assets/homePage/footer.png">
    </el-footer>

  </el-container>
</template>
  
<!--js脚本函数-->
<script setup>
import store from "@/store";
import {onMounted, ref, watch} from "vue";
import RecommendCol from "@/components/HomePage/RecommendCol.vue";
import SearchBar from "@/components/HomePage/SearchBar.vue";
import SortRow from "@/components/HomePage/SortRow.vue";
import {useRoute} from "vue-router";
import {getGoodsInPage} from '../../api/goods.js'
import { ElMessage } from "element-plus";
const route = useRoute()

const selectedTags = ref([])

let filters = ref({
  pageSize: 10,
  pageIndex: 1,
  searchVal: "",
  selectedTag: [],
  minPrice: 0,
  maxPrice: Infinity,
})

let commodities = ref();

watch(selectedTags, (newValue) => {
  filters.value.selectedTag = newValue
})

onMounted(() => {
  if (route.query.class === "peishi") {
    filters.value.selectedTag = [{value: '配饰'}];
    selectedTags.value.push({value: '配饰'})
  } else if (route.query.class === 'nanzhuang'){
    filters.value.selectedTag = [{value: '男装'}];
    selectedTags.value.push({value: '男装'})
  } else if (route.query.class === 'nvzhuang'){
    filters.value.selectedTag = [{value: '女装'}];
    selectedTags.value.push({value: '女装'})
  }

  getCommodities();
})

// setInterval(() => {
//   console.log(filters.value)
// },1000)
//分类筛选标签

const toggleSelection = (value) => {
  const existingTag = selectedTags.value.find(tag => tag.value === value);
  // console.log(selectedTags.value)
  if (existingTag) {
    removeTag(existingTag);
  } else {
    selectedTags.value.push({ value });
  }

  if (selectedTags.value.length > 1) {
    clearAllTags();
    selectedTags.value.push({ value });
  }
};

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);//过滤函数，将不等于传入值的元素保留下来
  // if (store.state.homepage.selectClassification === tag.value) {
  //   store.commit("setSelectClassification", "")
  // }

};

const clearAllTags = () => {
  selectedTags.value = [];
  // store.commit("setSelectClassification", "")
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

const receivePriceVal = (val) => {
  filters.value.minPrice = val[0];
  filters.value.maxPrice = val[1];
}

const receivePageVal = (val) => {
  filters.value.pageSize = val.pageSize;
  filters.value.pageIndex = val.pageIndex;
}


const ethnicities = ref([
  "汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族",
  "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "僳僳族",
  "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族",
  "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族",
  "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "崩龙族", "保安族", "裕固族", "京族", "塔塔尔族",
  "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"
])

const getCommodities = () => {
  getGoodsInPage({
    pageSize: filters.value.pageSize,
    pageIndex: filters.value.pageIndex,
    commodityId: null,
    storeId: null,
    pricemin: filters.value.minPrice,
    pricemax: filters.value.maxPrice,
    type: null,
    name: filters.value.sear,
    description: ""
  })
    .then(resp => {
      commodities = {

      }
    })
    .catch(resp => {
      ElMessage("商品拉取失败")
    })
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
  cursor: pointer;
  transition: all  .5s;
}

.my-classification-item-head:hover {
  cursor: pointer;
  color: blue;
}

.my-classificaion-1 {
  display: flex;
  height: 110px;
  width: auto;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.my-classificaion-2 {
  display: flex;
  height: 275px;
  width: auto;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.my-classificaion li {
  display: block;
  margin-right: 10px;
  /* 调整水平间距 */
  /* //margin-bottom: 10px; */
  /* 调整垂直间距 */
  background-color: white;
}

.my-classificaion ul {
  height: auto;
  overflow: hidden;
  list-style-type: none;
  padding-inline-start: 0px;
  /* //display: flex; */
  /* //flex-wrap: wrap; */
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