<!--分类栏和轮播图、个人信息-->
<template>
  <div class="d-center">

    <!-- 已选筛选条件标签 -->
    <div v-if="selectedTags.length > 0" class="selected-tags">
      <el-tag v-for="(tag, index) in    selectedTags   " :key="index" class="tag" closable @close="removeTag(tag)"
        :type=getRandomColor()>
        {{ tag.value }}
      </el-tag>

      <el-button class="clear-all-btn" size="small" @click="clearAllTags">清空</el-button>
    </div>

    <el-row justify="center" :gutter="45">

      <!--分类栏-->
      <el-col span="4" class="center-left">
        <!--这里应该是从后端获取的分类类别-->
        <ul>
          <li>
            <span>朝代：</span>
            <span @click="toggleSelection('朝代', '唐朝')">唐朝 </span>
            <span @click="toggleSelection('朝代', '宋朝')">宋朝 </span>
            <span @click="toggleSelection('朝代', '明朝')">明朝 </span>
            <span @click="toggleSelection('朝代', '清朝')">清朝 </span>
          </li>
          <li>
            <span>适用人群：</span>
            <span @click="toggleSelection('适用人群', '男')">男 </span>
            <span @click="toggleSelection('适用人群', '女')">女 </span>
            <span @click="toggleSelection('适用人群', '儿童')">儿童 </span>
          </li>
          <li>
            <span>类别：</span>
            <span @click="toggleSelection('类别', '上衣')">上衣 </span>
            <span @click="toggleSelection('类别', '下衣')">下衣 </span>
            <span @click="toggleSelection('类别', '鞋')">鞋 </span>
          </li>

          <li>
            <span>服饰配件：</span>
            <span @click="toggleSelection('服饰配件', '帽子')">帽子 </span>
            <span @click="toggleSelection('服饰配件', '项链')">项链 </span>
            <span @click="toggleSelection('服饰配件', '手工艺品')">手工艺品 </span>
          </li>
          <li>
            <span>民族：</span>
            <span @click="toggleSelection('民族', '苗族')">苗族 </span>
            <span @click="toggleSelection('民族', '汉族')">汉族 </span>
            <span @click="toggleSelection('民族', '藏族')">藏族 </span>
            <span @click="toggleSelection('民族', '蒙古族')">蒙古族 </span>
          </li>

        </ul>
      </el-col>

      <!--轮播图-->
      <el-col span="15" class="center">

        <el-carousel :interval="5000" arrow="hover" indicator-position="outside">
          <el-carousel-item v-for="(   item, index   ) in    carouselItems   " :key="index">
            <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
          </el-carousel-item>
        </el-carousel>

      </el-col>
      <!--个人信息栏-->
      <el-col span="4" class="center-right">

        <div class="user-profile">
          <!--用户头像-->
          <el-row class="avatar-row">
            <el-avatar :size="100" :src="info.avatarUrl" />
          </el-row>
          <!--用户姓名-->
          <el-row class="name-row">{{ info.userName }}</el-row>
          <!-- 我的钱包 -->
          <div class="info-item" @click="goToPage('我的收藏')">
            <span>
              <el-icon>
                <Goods />
              </el-icon>
              <span class="label">我的收藏</span>
            </span>
          </div>
          <!-- 购物车 -->
          <div class="info-item" @click="goToPage('购物车')">
            <span>
              <el-icon>
                <ShoppingCart />
              </el-icon>
              <span class="label">购物车</span>
            </span>
          </div>
          <!-- 我的订单 -->
          <div class="info-item" @click="goToPage('我的订单')">
            <span>
              <el-icon>
                <Tickets />
              </el-icon>
              <span class="label">我的订单</span>
            </span>
          </div>
          <!--消息-->
          <div class="info-item" @click="goToPage('消息')">
            <span>
              <el-icon>
                <Message />
              </el-icon>
              <span class="label">消息</span>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script setup>
import { Van, Box, ShoppingCart, DocumentCopy, CreditCard, Goods, Tickets, Message, } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import router from '@/router'
import { ref } from 'vue'
const info = reactive({
  avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  userName: 'userName',
})

//轮播图
const carouselItems = [
  { imgUrl: 'https://th.bing.com/th/id/R.74d6fd7f341c4d2d87ecf2005bbead19?rik=bobf5DrcKlyBmg&riu=http%3a%2f%2fe3f49eaa46b57.cdn.sohucs.com%2f2022%2f12%2f28%2f7%2f43%2fMTAwMTM1XzE2NzIxODQ1ODE3MzM%3d.jpg&ehk=KjEcBPuLKR3HVRprTig8jrgZXx%2f5zcUZf5pducv1dNM%3d&risl=&pid=ImgRaw&r=0' },
  { imgUrl: 'https://picsum.photos/id/1020/800/400' },
  { imgUrl: 'https://picsum.photos/id/1021/800/400' },
]


//分类筛选标签
const selectedTags = ref([])

const toggleSelection = (category, value) => {
  const existingTag = selectedTags.value.find(tag => tag.category === category && tag.value === value);

  if (existingTag) {
    removeTag(existingTag);
  } else {
    selectedTags.value.push({ category, value });
  }
};

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);//过滤函数，将不等于传入值的元素保留下来
};

const clearAllTags = () => {
  selectedTags.value = [];
};
// 根据点击的选项进行页面跳转逻辑
const goToPage = (page) => {
  switch (page) {
    case '我的收藏':
      // 跳转到我的钱包页面
      router.push({ path: '/userinfo/${collectedItem}' })
      break;
    case '购物车':
      // 跳转到购物车页面
      router.push('/cart/')
      break;
    case '我的订单':
      // 跳转到我的订单页面
      router.push({ path: '/userinfo/${myOrder}' })
      break;
    case '消息':
      // 跳转到消息页面
      break;
    default:
      break;
  }
};

const types = ['primary', 'success', 'info', 'warning', 'danger']
const colorIndex = ref(0); //响应式变量，跟踪当前使用的颜色索引
const getRandomColor = () => {

  const color = types[colorIndex.value];
  colorIndex.value = (colorIndex.value + 1) % types.length;
  return color;
}
</script>
<style scoped>
.d-center {
  width: 100%;
  margin: 30px;
  padding: 20px;

}


.center-left {
  margin-top: 30px;
  width: 220px;
  color: white;
  border-radius: 10px;
  border-color: rgb(8, 184, 243);
  background-color: rgb(8, 184, 243);

}


.center {
  margin-top: 30px;
  width: 500px;
  color: white;
  float: left;
  border-radius: 10px;
  background-color: #b6e0eb;
}

.center-right {
  margin-top: 30px;
  width: 220px;
  color: white;
  border-radius: 10px;
  border-color: rgb(8, 184, 243);
  background-color: rgb(8, 184, 243);

}

.center-left li {
  display: inline-block;
  margin-right: 10px;
  /* 调整水平间距 */
  margin-bottom: 10px;
  /* 调整垂直间距 */
  background-color: rgb(8, 184, 243);
  cursor: pointer;
  transition: all .5s;
  width: 250px;
  height: 30px;
  font-size: 13px;
}

.center-left ul {
  height: auto;
  overflow: hidden;
  list-style-type: none;
  padding-inline-start: 0px;
  display: flex;
  flex-wrap: wrap;
}

.center-left li:hover {
  background-color: white;
  color: rgb(8, 184, 243);
  padding-left: 10px;

}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-row {
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}

.label {
  font-size: 10px;
}

.info-item i {
  font-size: 18px;
  margin-right: 5px;
}
</style>