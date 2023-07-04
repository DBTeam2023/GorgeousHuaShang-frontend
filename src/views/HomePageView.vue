<!--html模板-->
<template>
    <div>
      <el-header class="header"> <!--导航栏-->
        <div class="logo">
          <img src="../assets/logo2.jpg" alt="logo" />   <!--logo图片-->
          <h1>电商平台</h1>
        </div>
        <el-input
          class="search"
          v-model="search"
          placeholder="请输入搜索内容"
          suffix-icon="el-icon-search"
        />         <!--搜索栏-->
        <el-button class="login" type="text">登录</el-button> <!--登录按钮-->
      </el-header>
      <el-menu class="menu" mode="horizontal"> <!--子菜单：水平布局-->
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2" popper-class="submenu">  <!--默认是垂直布局，popperclass可以结合下拉弹框等使用-->
          <template #title>商品分类</template> <!--自定义插槽，是对v-slot:title的缩写，以便于灵活布局和渲染-->
          <el-menu-item index="2-1">男装</el-menu-item>
          <el-menu-item index="2-2">女装</el-menu-item>
          <el-menu-item index="2-3">童装</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">购物车</el-menu-item>
        <el-menu-item index="4">我的订单</el-menu-item>
      </el-menu>
      <div class="banner">
        <img src="../assets/logo.png" alt="banner" />
      </div>
      <div class="recommend">
        <h2>推荐商品</h2>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <div class="item">
              <img src="../assets/logo.png" alt="item" />
              <p class="name">商品名称</p>
              <p class="price">¥100</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <div class="item">
              <img src="../assets/logo.png" alt="item" />
              <p class="name">商品名称</p>
              <p class="price">¥200</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <div class="item">
              <img src="../assets/logo.png" alt="item" />
              <p class="name">商品名称</p>
              <p class="price">¥300</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <div class="item">
              <img src="../assets/logo.png" alt="item" />
              <p class="name">商品名称</p>
              <p class="price">¥400</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  <!--js脚本函数-->
  <script>
  import { defineComponent } from 'vue';
  import { ElHeader, ElMenu, ElMenuItem, ElSubMenu, ElButton, ElRow, ElCol, ElInput } from 'element-plus';
  
  export default defineComponent({
    name: 'HomePage',
    components: {
      [ElHeader.name]: ElHeader,
      [ElMenu.name]: ElMenu,
      [ElMenuItem.name]: ElMenuItem,
      [ElSubMenu.name]: ElSubMenu,
      [ElButton.name]: ElButton,
      [ElRow.name]: ElRow,
      [ElCol.name]: ElCol,
      [ElInput.name]: ElInput,
    },
    data() {
      return {
        search: '',
      };
    },
  });
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
  </style>