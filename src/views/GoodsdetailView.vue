<template>
<div class="product-detail">
    <div class="left-section">
      <div class="search">
        <img :src="selectedImage" alt="1" class="main-image" width="350px" height="350px"/>
      </div>
     <div class="thumbnail-images">
      <div v-for="item in product.images" :key="item.index">
       <img :src="item.imgsrc" :class="{ active: selectedImage === item.imgsrc }" alt="" @click="selectImage(item.imgsrc)">
      </div>
     </div>
    </div>
    <div class="right-section">
     <h2>{{ product.name }}</h2>
     <p>{{ product.info }}</p >
     <div class="color-selection">
      <h3>颜色</h3>
      <el-radio-group v-model="selectedColor">
       <el-radio label="黑色">黑色</el-radio>
       <el-radio label="白色">白色</el-radio>
       <el-radio label="红色">红色</el-radio>
      </el-radio-group>
     </div>
     <div class="size-selection">
      <h3>尺寸</h3>
      <el-radio-group v-model="selectedSize">
       <el-radio label="155">155</el-radio>
       <el-radio label="160">160</el-radio>
       <el-radio label="165">165</el-radio>
       <el-radio label="170">170</el-radio>
       <el-radio label="175">175</el-radio>
      </el-radio-group>
     </div>
     <div class="quantity-selection">
      <h3>数量</h3>
      <el-input-number v-model="selectedQuantity" :min="1"></el-input-number>
     </div>
     <div class="buttons">
      <el-button type="primary" @click="addToCart">加入购物车</el-button>
       <el-button type="success" @click="buyNow">立即购买</el-button>
     </div>
    </div>
   </div>
   <comment-view/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import mjpic from "../assets/product/1.png";
  import yfpic from "../assets/product/2.png";
  import lgpic from "../assets/product/3.png";
  import CommentView from './CommentView.vue';
  const product = {
    name: '商品名称',
    info: '商品信息',
    images: [
      {
        index: 1,
        info: "YF",
        imgsrc: mjpic
      },
      {
        index: 2,
        info: "MJ",
        imgsrc: yfpic
      },
      {
        index: 3,
        info: "LG",
        imgsrc: lgpic
      }
    ]
  };
  
  const selectedImage = ref('');
  const selectedColor = ref('');
  const selectedSize = ref('');
  const selectedQuantity = ref(1);
  
  // 默认选中第一张图片
  selectedImage.value = product.images[0].imgsrc;
  
  function selectImage(image) {
    selectedImage.value = image;
  }
  
  function addToCart() {
    console.log(2); // 加入购物车
  }
  
  function buyNow() {
    console.log(1); // 立即购买
  }
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

.color-selection,
.size-selection,
.quantity-selection {
  margin-bottom: 10px;
}

.buttons {
  margin-top: 20px;
}
</style>