<!--分类栏和轮播图、个人信息-->
<template>
  <div class="d-center">

    <!-- 已选筛选条件标签 -->
<!--    <div v-if="selectedTags.length > 0" class="selected-tags">-->
<!--      <el-tag v-for="(tag, index) in    selectedTags   " :key="index" class="tag" closable @close="removeTag(tag)"-->
<!--        :type=getRandomColor()>-->
<!--        {{ tag.value }}-->
<!--      </el-tag>-->

<!--      <el-button class="clear-all-btn" size="small" @click="clearAllTags">清空</el-button>-->
<!--    </div>-->

    <el-row justify="center" :gutter="45">

      <!--分类栏-->
      <el-col :span="5" class="center-left">
        <!--这里应该是从后端获取的分类类别-->
<!--        <el-card class="top-card" shadow="always">-->
<!--          <ul>-->
<!--            <li>-->
<!--&lt;!&ndash;              <span style="">朝代：</span>&ndash;&gt;-->
<!--              <span class="classification-item" @click="selectClassification('唐代')">唐朝</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('朝代', '宋朝')">宋朝</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('朝代', '明朝')">明朝</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('朝代', '清朝')">清朝</span>-->
<!--            </li>-->
<!--            <li>-->
<!--&lt;!&ndash;              <span>适用人群：</span>&ndash;&gt;-->
<!--              <span class="classification-item" @click="toggleSelection('适用人群', '男')">男</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('适用人群', '女')">女</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('适用人群', '儿童')">儿童</span>-->
<!--            </li>-->
<!--            <li>-->
<!--&lt;!&ndash;              <span>类别：</span>&ndash;&gt;-->
<!--              <span class="classification-item" @click="toggleSelection('类别', '上衣')">上衣</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('类别', '下衣')">下衣</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('类别', '鞋')">鞋</span>-->
<!--            </li>-->

<!--            <li>-->
<!--&lt;!&ndash;              <span>服饰配件：</span>&ndash;&gt;-->
<!--              <span class="classification-item" @click="toggleSelection('服饰配件', '帽子')">帽子</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('服饰配件', '项链')">项链</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('服饰配件', '手工艺品')">手工艺品</span>-->
<!--            </li>-->
<!--            <li>-->
<!--&lt;!&ndash;              <span>民族：</span>&ndash;&gt;-->
<!--              <span class="classification-item" @click="toggleSelection('民族', '苗族')">苗族</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('民族', '汉族')">汉族</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('民族', '藏族')">藏族</span>-->
<!--              <span>/</span>-->
<!--              <span class="classification-item" @click="toggleSelection('民族', '蒙古族')">蒙古族</span>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </el-card>-->

        <div class="my-classificaion">
          <el-card class="top-card" shadow="always">
            <div class="custom-font-recommend divCenter">
              <el-icon><ShoppingBag /></el-icon>
              筛选类别
            </div>
            <ul>
              <li>
<!--                <span class="my-classification-item-head">朝代</span>-->
                <span class="classification-item" @click="selectClassification('唐朝')">唐朝</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('宋朝')">宋朝</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('明朝')">明朝</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('清朝')">清朝</span>
              </li>
              <el-divider border-style="dashed" class="small-divider"/>
              <li>
<!--                <span class="my-classification-item-head">适用人群</span>-->
                <span class="classification-item" @click="selectClassification('男')">男</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('女')">女</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('儿童')">儿童</span>
              </li>
              <el-divider border-style="dashed"   class="small-divider"/>
              <li>
<!--                <span class="my-classification-item-head">类别</span>-->
                <span class="classification-item" @click="selectClassification('上衣')">上衣</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('下衣')">下衣</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification( '鞋')">鞋</span>
              </li>
              <el-divider border-style="dashed"   class="small-divider"/>
              <li>
<!--                <span class="my-classification-item-head">服饰配件</span>-->
                <span class="classification-item" @click="selectClassification('帽子')">帽子</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('项链')">项链</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('手工艺品')">手工艺品</span>
              </li>
              <el-divider border-style="dashed"   class="small-divider"/>
              <li>
<!--                <span class="my-classification-item-head">民族</span>-->
                <span class="classification-item" @click="selectClassification('苗族')">苗族</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('汉族')">汉族</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('藏族')">藏族</span>
                <span> / </span>
                <span class="classification-item" @click="selectClassification('蒙古族')">蒙古族</span>
              </li>
            </ul>
          </el-card>
        </div>
      </el-col>

      <!--轮播图-->
      <el-col :span="10" class="center">
        <el-card class="top-card" shadow="always">
        <el-carousel :interval="5000" arrow="hover" indicator-position="outside">
          <el-carousel-item v-for="(   item, index   ) in    carouselItems   " :key="index">
            <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
          </el-carousel-item>
        </el-carousel>
        </el-card>
      </el-col>
      <!--个人信息栏-->
      <el-col :span="5" class="center-right">
        <el-card class="top-card" shadow="always">

          <div class="user-profile">
            <!--用户头像-->
            <el-row class="avatar-row">
              <el-avatar :size="100" :src="info.avatarUrl" />
            </el-row>
            <!--用户姓名-->
            <el-row class="name-row">{{ info.userName }}</el-row>

            <!--       未登录时显示       -->
            <div class="not-login" v-if="!store.state.user.isLogin">
              <span class="not-login-button" @click="() => {
                 router.push({ path: '/register/' })
              }">
                注册
              </span>
              <span class=""> | </span>
              <span class="not-login-button" @click="() => {
                 router.push({ path: '/login/' })
              }">
                登录
              </span>
            </div>

            <div class="newpeople-card">
              <img src="../../assets/homePage/newpeople-card.png">
            </div>

            <div v-if="store.state.user.isLogin" class="personal-container">
              <!-- 我的钱包 -->
              <div class="info-item" @click="goToPage('我的收藏')">
              <div>
                <el-icon :size="40">
                  <Goods />
                </el-icon>
                <div class="label">我的收藏</div>
              </div>
              </div>
              <!-- 购物车 -->
              <div class="info-item" @click="goToPage('购物车')">
              <div>
                <el-icon :size="40">
                  <ShoppingCart />
                </el-icon>
                <div class="label">购物车</div>
              </div>
              </div>
              <!-- 我的订单 -->
              <div class="info-item" @click="goToPage('我的订单')">
              <div>
                <el-icon :size="40">
                  <Tickets />
                </el-icon>
                <div class="label">我的订单</div>
              </div>
              </div>
              <!--消息-->
              <div class="info-item" @click="goToPage('消息')">
              <div>
                <el-icon :size="40">
                  <Message />
                </el-icon>
                <div class="label">消息</div>
              </div>
              </div>
            </div>
          </div>
          <div class="news-container">
            <el-link href="https://baijiahao.baidu.com/s?id=1767510355289202566&wfr=spider&for=pc"
                     :underline="false" type="danger">[电商资讯] 刘文强：我国工业绿色发展取得七个方面重大成就</el-link>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script setup>
import { Van, Box, ShoppingCart, DocumentCopy, CreditCard, Goods, Tickets, Message, ShoppingBag} from '@element-plus/icons-vue'
import {computed, reactive} from 'vue'
import router from '@/router'
import { ref } from 'vue'
import store from "@/store";

const info = reactive({
  avatarUrl: computed(() => {
    if (store.state.user.isLogin) {
      return store.state.user.userPhoto;
    }
    else {
      return "https://avatars.githubusercontent.com/u/583231?v=4";
    }
  }),
  userName: computed(() => {
    if (store.state.user.isLogin) {
      return store.state.user.username;
    }
    else {
      return "未登录";
    }
  })
})

const selectClassification = (classification) => {
  store.commit("setSelectClassification", classification);
  router.push({ name: "Classify" })
}

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

const types = ['primary', 'success', 'info', 'warning', 'danger']
const colorIndex = ref(0); //响应式变量，跟踪当前使用的颜色索引
const getRandomColor = () => {

  const color = types[colorIndex.value];
  colorIndex.value = (colorIndex.value + 1) % types.length;
  return color;
}

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


</script>


<style scoped>
.newpeople-card {
  scale: 130%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.news-container {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  //text-overflow: ellipsis;
  margin-top: 10px;
  //flex-direction: column-reverse; /* 子元素从下到上排列 */

}




.label {
  display: flex;
  justify-content: center;
  font-size: 10px;
}

.not-login {
  display: inline;
  font-weight: 600; /* 数值可以根据需要调整 */
  margin-top: 5px;
}

.not-login-button:hover {
  cursor: pointer;
}

.d-center {
  width: 100%;
  margin: 10px;
  padding: 20px;
}


.center-left {
  //color: white;
  //border-color: white;
  //background-color: white;
}

.top-card {
  height: 350px;
}

.center {
  //width: 700px;
  //color: white;
  //float: left;
  border-radius: 10px;
  //background-color: white;
}

.center-right {
  //width: 250px;
  color: black;
  border-radius: 10px;

  //border-color: white;
  //background-color: white;
}

.classification-item {
  cursor: pointer;
  transition: all .5s;
}

.center-left li {
  display: inline-block;
  margin-right: 10px;
  /* 调整水平间距 */
  margin-bottom: 10px;
  /* 调整垂直间距 */
  background-color: white;
}

.center-left ul {
  height: auto;
  overflow: hidden;
  list-style-type: none;
  padding-inline-start: 0px;
  display: flex;
  flex-wrap: wrap;
}

.classification-item:hover {
  background-color: white;
  color: blue;
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

.personal-container {
  display: flex;
  //flex-direction: column; /* 垂直方向排列 */
  //margin-top: 20px; /* 调整垂直间距 */
  //align-items: center; /* 垂直居中 */
}

.info-item {
  display: flex;
  align-items: center; /* 水平居中 */
  text-align: left; /* 左对齐文本 */
  cursor: pointer;
}

.info-item:hover {
  color: red;
}

.info-item i {
  font-size: 18px;
  margin: 5px;
}

.small-divider {
  height: 1px; /* 设置分割线的高度 */
  margin: 5px 0; /* 调整分割线的上下间距 */
}
</style>

<style lang="scss" scoped>

.custom-font-recommend {
  font-family: 'Poppins', sans-serif; /* 应用 Poppins 字体 */
  font-weight: 700; /* 加粗 */
  font-size: 18px; /* 字号较大 */
  margin-bottom: 20px;
}

.divCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>