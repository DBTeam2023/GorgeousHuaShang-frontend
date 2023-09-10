<!--展示分类筛选后的商品列表页-->
<!--html模板-->
<template>
  <el-container class="container">
    <!--把搜索栏、购物车固定在顶部-->
    <div class="searchBar">
      <SearchBar @performSearch="receiveSearchVal" />
    </div>

    <el-main>
      <div style="margin-left: 10vw;">
        <el-button @click="() => {
          router.push({ path: 'classify', query: { class: 'peishi' } });
        }" text bg>配饰</el-button>
        <el-button @click="() => { router.push({ path: 'classify', query: { class: 'nanzhuang' } }) }" text
          bg>男装</el-button>
        <el-button @click="() => { router.push({ path: 'classify', query: { class: 'nvzhuang' } }) }" text
          bg>女装</el-button>
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
            <el-divider border-style="dashed" class="small-divider" />
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
            <el-divider border-style="dashed" class="small-divider" />
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
            <el-divider border-style="dashed" class="small-divider" />
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
            <el-divider border-style="dashed" class="small-divider" />
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
            <el-divider border-style="dashed" class="small-divider" />
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
            <el-divider border-style="dashed" class="small-divider" />
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
        <SortRow @PriceChange="receivePriceVal" />
      </div>

      <!--推荐商品-->
      <div style="width: 98%">
        <!--        <RecommendCol @pageOption="receivePageVal" :value="commodities"/>-->
        <div class="recommend">
          <!-- 行 -->
          <el-row v-for="(row, index) in itemRows" :key="index" class="itemrow">
            <!-- 列 -->
            <el-col v-for="(item, i) in row" :key="i" class="itemcol" :xs="24" :sm="12" :md="8"
              :lg="4"><!--响应式布局：超小屏幕、小屏幕、中等屏幕、大屏幕-->
              <Card class="card">
                <!--                query: {goodsId: itemList.value[index * rowSize + i].productId-->
                <div class="router-link-active" @click="turnToProduct(index, i)">
                  <!-- 商品图片 -->
                  <div class="item">
                    <img :src="item.url" class="img" />
                  </div>
                  <div class="info">
                    <!-- 商品名称 -->
                    <div class="name">{{ item.productName }}</div>
                    <!-- 商品价格 -->
                    <div class="price">￥{{ item.price }}</div>
                  </div>
                </div>
              </Card>
            </el-col>
          </el-row>
          <el-row class="pagination">
            <!-- <div class="demonstration">Jump to</div> -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
              layout="prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />

          </el-row>

        </div>
      </div>

    </el-main>

    <el-footer class="my-footer">
      <img src="../../assets/homePage/footer.png">
    </el-footer>

  </el-container>
</template>
  
<!--js脚本函数-->
<script setup>
import store from "@/store";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import SortRow from "@/components/HomePage/SortRow.vue";
import { useRoute } from "vue-router";
import { getGoodsInPage } from '@/api/goods'
import { ElMessage } from "element-plus";
import Card from "@/components/common/Card.vue";
import router from "@/router";
import { base64ToUrl } from '@/utils/photo'
import SearchBar from "@/components/HomePage/SearchBar.vue"

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

watch(selectedTags, (newValue) => {
  filters.value.selectedTag = newValue
})

onMounted(() => {
  if (route.query.class === "peishi") {
    filters.value.selectedTag = [{ value: '配饰' }];
    selectedTags.value.push({ value: '配饰' })
  } else if (route.query.class === 'nanzhuang') {
    filters.value.selectedTag = [{ value: '男装' }];
    selectedTags.value.push({ value: '男装' })
  } else if (route.query.class === 'nvzhuang') {
    filters.value.selectedTag = [{ value: '女装' }];
    selectedTags.value.push({ value: '女装' })
  }

  if (route.query.search !== null) {
    filters.value.searchVal = route.query.search;
  }

  // nextTick(() => {
  //   watch(filters.value, (newVal) => {
  //     getCommodities();
  //     console.log(filters.value)
  //   })
  // })
  getCommodities();
})


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
};

const clearAllTags = () => {
  selectedTags.value = [];
};

const types = ['primary']
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


const ethnicities = ref([
  "汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族",
  "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "僳僳族",
  "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族",
  "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族",
  "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "崩龙族", "保安族", "裕固族", "京族", "塔塔尔族",
  "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"
])

const itemList = ref([]);

// 分页栏用到的数据
const currentPage = ref(1)  //当前页数，默认为第1页
const pageSize = 10  //每页的图片数量
const rowSize = 5  //每行rowSize个商品

let total = ref(0);

filters.value.pageSize = pageSize;
filters.value.pageIndex = currentPage;

// 计算属性，计算imageList中图片对应的行；每行4列
const itemRows = computed(() => {
  const start = 0; //当前页的起始数据编号
  const end = start + pageSize;  //当前页的最后数据号
  const paginatedItemRows = itemList.value.slice(start, end);
  const rows = []
  const rowCount = pageSize / rowSize //行数
  for (let i = 0; i < rowCount; i++) {
    rows.push(paginatedItemRows.slice(i * rowSize, (i + 1) * rowSize))
  }
  return rows
})
const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const getCommodities = () => {
  getGoodsInPage({
    pageSize: filters.value.pageSize,
    pageIndex: filters.value.pageIndex,
    commodityId: null,
    storeId: null,
    pricemin: filters.value.minPrice,
    pricemax: filters.value.maxPrice,
    type: filters.value.selectedTag.length > 0 ? filters.value.selectedTag[0].value : null,
    name: filters.value.searchVal,
    description: ""
  })
    .then(resp => {
      itemList.value = resp.data.records;
      total.value = resp.data.total;

      for (const item of itemList.value) {
        item.url = base64ToUrl(item.image.fileContents, item.image.contentType);
      }
      // console.log(itemList.value);
    })
    .catch(resp => {
      ElMessage("商品拉取失败")
    })
}

setInterval(() => {
  console.log(total.value)
}, 1000)


setTimeout(() => {
  watch(filters.value, (newVal) => {
    getCommodities();
    console.log(filters.value)
  })
}, 2000)

function turnToProduct(index, i) {
  router.push({
    path: '/goodsdetail',
    query: {
      goodsId: itemList.value[index * rowSize + i].productId,
      storeId: itemList.value[index * rowSize + i].storeId,
      productName: itemList.value[index * rowSize + i].productName,
    },
  });
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
  transition: all .5s;
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
  height: 1px;
  /* 设置分割线的高度 */
  margin: 5px 0;
  /* 调整分割线的上下间距 */
}

.card {
  width: 100%;
  height: auto;
  border: 0;
  /*被覆盖了？ */
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  /* 设置卡片之间的水平间距 */

}

.recommend {
  padding-bottom: 20px;
  margin: 10px 140px;
  /*上下左右四个方向的外部空白区域 */
  border: 0;
  /* 设置边框样式 */
  border-radius: 10px;
  /* 设置圆角半径 */
  background-color: #ffffff;
}

.recommend h2 {
  font-size: 24px;
  /*字体大小 */
  font-weight: bold;
  /*加粗 */
  margin-bottom: 20px;
}

.itemrow {
  width: 100%;
}

.itemcol {
  border: 0;
  /*1像素宽度、实现样式、灰色颜色的边框 */
  border-radius: 5px;
  /*5像素的圆角边框 */
  padding: 1px;
  /*元素内部内容与边框之间的距离 */
  text-align: center;
  margin-left: 30px;
  margin-top: 10px;
}

.item img {
  width: 100%;
  border-radius: 5px;
}

.info .name {
  margin: 10px 0;
  font-size: 16px;
}

.info .price {
  font-size: 18px;
  font-weight: bold;
  color: red
}

.logo img {
  height: 32px;
  margin-right: 10px;
}

/* 禁用 router-link 的下划线 */
.router-link-active {
  text-decoration: none;
  cursor: pointer;
}

/*分页栏样式 */
.pagination {
  margin-top: 10px;

  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}
</style>

<style lang="scss" scoped>
.custom-font {
  font-family: 'Poppins', sans-serif;
  /* 应用 Poppins 字体 */
  font-weight: 600;
  /* 加粗 */
  font-size: 24px;
  /* 字号较大 */
  margin-bottom: 20px;
}

.divCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.item .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.searchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 98%;
  margin: 15px;
}
</style>