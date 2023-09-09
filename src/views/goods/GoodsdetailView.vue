<template>
  <el-descriptions
      style="margin-top: 15px"
      class="margin-top"
      title="商家信息"
      :column="3"
      border
  >
    <template #extra>
      <el-button type="primary" @click="turnToStore">商家主页</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <user />
          </el-icon>
          商店名称
        </div>
      </template>
      {{storeInfo.storeName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <iphone />
          </el-icon>
          联系方式
        </div>
      </template>
      0350-3173509
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <location />
          </el-icon>
          店铺地址
        </div>
      </template>
      {{ storeInfo.address }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <tickets />
          </el-icon>
          店铺评分
        </div>
      </template>
      <el-tag size="small">{{storeInfo.score}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <office-building />
          </el-icon>
          店铺描述
        </div>
      </template>
      {{storeInfo.description}}
    </el-descriptions-item>
  </el-descriptions>




  <div class="product-detail">
    <div class="left-section">
      <div class="search">
        <img :src="selectedImage" alt="1" class="main-image" width="350px" height="350px"/>
      </div>
     <div class="thumbnail-images">
      <div v-for="item in productImg.images" :key="item.index" >
       <img :src="item.imgsrc" :class="{ active: selectedImage === item.imgsrc }" alt="" @click="selectImage(item.imgsrc)">
      </div>
     </div>
    </div>

    <!-- 右侧 -->
    <div class="right-section">
      <div v-if="showGoodsDescriptionVar">
        <h2>{{ route.query.productName }}</h2>
        <p>{{ selectedcommodity.description }}</p>
      </div>
      <div v-else>
        <h2>商品未加载</h2>
        <p>商品描述未加载</p>
      </div>


      <div v-for="(properities, idx1) in mergedProperties" :key="idx1" class="my-selection">
        <h3>{{ idx1 }}</h3>
        <el-radio-group v-for="(properity, idx2) in properities" :key="idx2" v-model="selectProperties.value[idx1]" class="my-selection-item">
          <el-radio :label="properity">{{ properity }}</el-radio>
        </el-radio-group>
      </div>

      <div class="my-selection">
        <h3>数量</h3>
        <el-input-number v-model="selectedQuantity" :min="1"></el-input-number>
      </div>


      <!-- 商品价格 -->
      <div v-if="showGoodsDescriptionVar">
        <div class="price">￥{{ selectedcommodity.price * selectedcommodity.selectedQuantity}}</div>
      </div>
      <div v-else>
        <div class="price">￥ *** </div>
      </div>

     <div class="buttons">
      <el-button type="primary" @click="openCartForm">加入购物车</el-button>
      <el-button type="success" @click="openOrderForm">立即购买</el-button>
     </div>

      <el-dialog
          v-model="dialogVisibleCart"
          title="购买"
          width="40%"
      >
        <span>
          <div>商品名称：{{ route.query.productName }}</div>
          <div>商品描述：{{ selectedcommodity.description }}</div>
          <div>商品单价：{{ selectedcommodity.price }}</div>
          <div>购买数量：{{ selectedcommodity.selectedQuantity }}</div>
          <div>商品总价：{{ selectedcommodity.totalPrice }}</div>
          <div>款式：{{ selectedcommodity.property }}</div>
        </span>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddCart">取消</el-button>
          <el-button type="primary" @click="confirmAddCart">确认加入</el-button>
        </span>
        </template>
      </el-dialog>

      <el-dialog
          v-model="dialogVisibleOrder"
          title="购买"
          width="40%"
      >
        <span>
          <div>商品名称：{{ route.query.productName }}</div>
          <div>商品描述：{{ selectedcommodity.description }}</div>
          <div>商品单价：{{ selectedcommodity.price }}</div>
          <div>购买数量：{{ selectedcommodity.selectedQuantity }}</div>
          <div>商品总价：{{ selectedcommodity.totalPrice }}</div>
          <div>款式：{{ selectedcommodity.property }}</div>
        </span>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddOrder">取消</el-button>
          <el-button type="primary" @click="confirmAddOrder">确认支付</el-button>
        </span>
        </template>
      </el-dialog>

    </div>
  </div>

<!--  <comment-view/>-->
</template>



<script setup>
import {onMounted, reactive, ref, watch} from 'vue';
import mjpic from "../../assets/product/1.png";
import yfpic from "../../assets/product/2.png";
import lgpic from "../../assets/product/3.png";
import CommentView from './CommentView.vue';
import router from "@/router";
import {useRoute} from "vue-router";
import {addCartByGoods, createOrderInGoods, getGoodsDetail} from "@/api/goods";
import {ElMessage} from "element-plus";
import { base64ToUrl } from '@/utils/photo'
import { ElMessageBox } from 'element-plus';
import {getStoreInfo} from "@/api/store";
import {findIndicesWithProperties, mergeSimilarProperties, handleSelectProperties} from '@/utils/storeShow'


const route = useRoute()
const _ = require('lodash');

const productImg = ref({
  images: [
    // {
    //   index: 1,
    //   imgsrc: mjpic
    // },
  ]
});

const selectedImage = ref('');
let selectedQuantity = ref(1);

let commodityIdToBackend = ref({
  commodityId: route.query.goodsId,
})

let response; // 接收后端的数据resp
let mergedProperties = ref([]); // 产品的所有属性
let selectProperties = reactive({}); // 顾客选中的属性
let selectIndex = ref(0);       // 选中产品对应的index
let selectedcommodity = ref({});// 选中属性对应的那个产品

// setInterval(resp => {
//   console.log(mergedProperties.value)
//   // 尺寸
//   //     :
//   //     (3) ['大', '小', '中']
//   // 松紧
//   //     :
//   //     (2) ['oversize', 'overfit']
//   // 款式
//   //     :
//   //     (2) ['欧美', '日韩']
//
//   console.log(selectProperties.value)
//   // {款式: '欧美', 松紧: 'oversize', 尺寸: '大'}
//   console.log(selectIndex.value)
//   // 0
//   console.log(selectedcommodity.value)
//   // {pickId: '0c826a3c-a7dc-4163-b915-eaba4092eade', price: 10086, description: '欧美款更加时尚！', stock: 0, image: {…}, …}
// },2000)

// todo: 加入购物车，加入订单
/*
selectedcommodity:
{
  commodityId: "a618c78d-3329-4126-a7fe-4120b050e54c",
  pickId: "",
  description: "小哥哥小姐姐都可以穿的汉服哟！",
  price: 300,
  totalPrice: 600,
  selectedQuantity: 2,
  property: {
    尺码: "S"
    男女款: "男款"
    颜色: "白"
  }
  stock: 0,
}
  */



watch(selectProperties, (newVal) => {
  selectIndex.value = findIndicesWithProperties(response.commodityInfo, newVal.value)
  selectedcommodity.value = {
    ...response.commodityInfo[selectIndex.value],
    commodityId: route.query.goodsId,
    selectedQuantity: selectedQuantity.value,
    totalPrice: selectedQuantity.value * response.commodityInfo[selectIndex.value].price
  }
});

watch(selectedQuantity, (newVal) => {
  selectIndex.value = findIndicesWithProperties(response.commodityInfo, newVal.value)
  selectedcommodity.value = {
    ...response.commodityInfo[selectIndex.value],
    selectedQuantity: selectedQuantity.value,
    totalPrice: selectedQuantity.value * response.commodityInfo[selectIndex.value].price
  }
});

function selectImage(image) {
  selectedImage.value = image;
}

const dialogVisibleCart = ref(false);
const dialogVisibleOrder = ref(false)

function openCartForm() {
  if (localStorage.getItem("role") === "seller") {
    ElMessage.error('卖家无法加入购物车！');
    return;
  }
  dialogVisibleCart.value = true
}

function openOrderForm() {
  if (localStorage.getItem("role") === "seller") {
    ElMessage.error('卖家无法购买！');
    return;
  }
  dialogVisibleOrder.value = true
}

function cancelAddCart() {
  dialogVisibleCart.value = false
}

function confirmAddCart() {
  // 添加购物车
  addCartByGoods({
    pickId: selectedcommodity.value.pickId,
    number: selectedcommodity.value.selectedQuantity,
  })
      .then(resp => {
        ElMessage.success("成功加入购物车")
      })
      .catch(resp => {
        ElMessage.error("加入购物车失败")
      })

  dialogVisibleCart.value = false
}

function cancelAddOrder() {
  dialogVisibleOrder.value = false
}

function confirmAddOrder() {
  // 跳转支付页面
  createOrderInGoods({
    orderCreate: [
      {
        pickId: selectedcommodity.value.pickId,
        number: selectedcommodity.value.selectedQuantity,
      }
    ]
  })
      .then(resp => {
        ElMessage.success("订单创建成功，正在跳转支付页面")
      //   跳转支付
        router.push({
          path: '/pay',
          query: {
            orderId: resp.data.orderID
          }
        })
      })
      .catch(resp => {
        ElMessage.error("订单创建失败")
      })
  // 创建订单

  dialogVisibleOrder.value = false
}

getGoodsDetail(commodityIdToBackend.value)
    .then(resp => {
      if (resp.code === 200)
      {
        response = resp.data;
        mergedProperties.value = mergeSimilarProperties(response.commodityInfo);
        selectProperties.value = handleSelectProperties(_.cloneDeep(mergedProperties.value));
        selectIndex.value = findIndicesWithProperties(response.commodityInfo, selectProperties.value)
        selectedcommodity.value = {
          ...response.commodityInfo[selectIndex.value],
          commodityId: route.query.goodsId,
        }

        for (let i = 0; i < response.commodityInfo.length; i ++) {
          productImg.value.images.push({
            index: i + 1,
            imgsrc: base64ToUrl(response.commodityInfo[i].image.fileContents, response.commodityInfo[i].image.contentType),
          })
        }

        // 默认选中第一张图片
        selectedImage.value = productImg.value.images[0].imgsrc;

        showGoodsDescriptionVar = true;
      }
    })
    .catch(resp => {
      ElMessage({
        message: "商品已下架!",
        type: "warning",
      });
    })

// setInterval(() => {
//   console.log(selectedcommodity.value)
// }, 2000)

// ***************  处理接收的数据  ***************

let showGoodsDescriptionVar = ref(false)
// const showGoodsDescription = () => {
//   if (showGoodsDescriptionVar.value) {
//     return true;
//   }
//   else {
//     return false;
//   }
// }


const storeInfo = reactive({
  storeId: "",
  storeName: "",
  score: "",
  description: "",
  address: "",
})

function getStoreInfoInGoods() {
  getStoreInfo({
    storeId: route.query.storeId
  })
      .then(resp => {
        storeInfo.storeName = resp.data.storeName;
        storeInfo.score = resp.data.score;
        storeInfo.address = resp.data.address;
        storeInfo.storeId = resp.data.storeId;
        storeInfo.description = resp.data.description;
      })
      .catch(resp => {
        ElMessage.error('商店信息获取异常');
      })
}

function turnToStore() {
  router.push({
    path: "/shop",
    query: {
      storeid: route.query.storeId
    }
  })
}

onMounted(() => {
  getStoreInfoInGoods()
})

</script>



<!--CSS风格-->
<style scoped>
.header {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;/*子元素沿着主轴等间距地分布，并且第一个子元素和最后一个子元素分别对齐容器的起始端和末尾端 */
  align-items: center;/*子元素在垂直方向上居中对齐 */
  padding: 0 20px;/*容器的左右内边距为 20px，padding 属性可以用来控制元素的内部空白区域的大小，上下填充空间为0，左右留出间距20，还可以用百分比*/
}

.logo {
  display: flex;/*布局*/ 
  align-items: center;
}

.logo img {
  height: 32px;
  margin-right: 10px;
}

.menu {
  background-color: #fff;
}

.submenu {
  background-color: #fff;
}

.login {
  color: #fff;
}

.banner img {
  width: 50%;
}

.recommend {
  margin: 20px;/*上下左右四个方向的外部空白区域均为 20px */
}

.recommend h2 {
  font-size: 24px; /*字体大小 */
  font-weight: bold;/*加粗 */
  margin-bottom: 20px;
}

.item {
  border: 1px solid #eee; /*1像素宽度、实现样式、灰色颜色的边框 */
  border-radius: 5px;/*5像素的圆角边框 */
  padding: 10px;/*元素内部内容与边框之间的距离 */
  text-align: center;
}

.item img {
  width: 100%;
}

.item .name {
  margin: 10px 0;
  font-size: 16px;
}

.item .price {
  font-size: 18px;
 font-weight: bold;
 color:red
}

.search {
  width: 300px;
}
.shower img {
  width: 600px;
}

.mr-cont {
	margin: 20px auto;
	height: 565px;
	width: 950px;
	border: 1px solid #F00
}
.mr-pic {
	float: left;
	margin: 50px auto
}
.mr-mess {
	float: left;
	width: 528px;
	margin: 30px 20px;
}
dl {
	margin: 20px;
	text-align: center;
	width: 340px;
	height: 435px;
	border: 1px #999999 solid
}
dt {
	margin-top: 70px;
}
dd {
	float: left;
	margin: 30px 5px;
	border: 1px solid #CCC;
}
.mr-sel {
	margin-left: 50px;
	border: 1px solid #C00;
}
ul li {
	list-style: none;
	float: left;
	height: 30px;
	text-align: center;
	line-height: 30px;
}
.list1~li {
	width: 120px;
	border: 1px dashed #999999;
	margin: 0 5px;
}
.mr-price {
	background: #FBECFF
}
.dul ul{
	margin:0px auto;
}
.product-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left-section {
  flex: 1;
}

.main-image {
  width: 500px;
  height: 500px;
}

.thumbnail-images {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  width: 500px;
}

.thumbnail-images img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
}

.thumbnail-images img.active {
  border: 2px solid #000;
}

.right-section {
  flex: 1;
  padding-left: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.my-selection {
  margin-bottom: 10px;
}

.my-selection-item {
  margin-right: 20px;
}

.buttons {
  margin-top: 20px;
}

.price {
  color:orangered;
  margin-bottom: 20px;
  font-size: 35px;
  font-weight: bold;
}
</style>