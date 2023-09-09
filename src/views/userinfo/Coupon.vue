<template>
  <!-- 优惠券显示栏 -->
  <el-container class="coupon-container">
    <!-- 没有优惠券 -->
    <el-main v-if="couponExit === false">
      <el-empty description="您还没有优惠券哦~" />
    </el-main>

    <!-- 有优惠券 -->
    <el-main v-if="couponExit === true" style="padding: 0" v-loading="isload">
      <!-- 行 -->
      <el-row v-for="(row, index) in couponRows" :key="index" style="padding-top:20px;">
        <!-- 列 -->
        <el-col v-for="(coupon, i) in row" :key="i" :span="6" style="max-width:none;margin-bottom:5px;"
          class="center-container">
          <CouponCard :coupon="coupon" @mouseover="showShadow = true" @mouseout="showShadow = false">
            <!-- 鼠标悬浮效果 -->
            <div class="shadow" v-show="showShadow">
              <el-button type="primary" :icon="Position" @click="turnToProduct(index, i)" circle
                style="margin-right:2vw" />
              <el-button type="danger" :icon="Delete" @click="handleRemove(index, i)" circle />
            </div>
          </CouponCard>
        </el-col>
      </el-row>
      <!-- 分页栏 -->
      <el-row class="pagination">
        <el-pagination background v-model:currentPage="currentPage" v-model:pageSize="pageSize" :small="small"
          :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="total"
          @current-change="handleCurrentChange" />
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from "@/router";
import { Delete, Position } from '@element-plus/icons-vue';
import CouponCard from '@/components/Coupon/CouponCard'
import { getCouponPage, deleteUserCoupon } from '@/api/coupon';
import { utc2cn } from '@/utils/timeTransfer';

const isload = ref(false);


const couponExit = computed(() => {
  return !(total.value === 0);
})

const isHover = ref(false);//是否显示鼠标悬浮插槽

const activeTag = ref('all');//选中的优惠券类型标签

const couponList = ref([]);//后端获取的优惠券列表

const showShadow = ref(false);//是否显示阴影块

//获取优惠券API的请求参数
const queryParams = ref({
  pageNo: 1,
  pageSize: 4,
  storeId: '',
  storeName: '',
})

// 分页栏用到的数据
const currentPage = ref(1); //当前页数，默认为第1页
const pageSize = 4; //每页的图片数量，
const rowSize = 4; //每行优惠券数量：4
let total = ref(1);//总数据

queryParams.value.pageSize = pageSize;  //总页数
queryParams.value.pageNo = currentPage; //当前页数

// 计算属性，计算couponList中图片对应的行；每行4列
const couponRows = computed(() => {
  const start = 0; //当前页的起始数据编号
  const end = start + pageSize;//当前页的最后数据号
  const paginatedcouponRows = couponList.value.slice(start, end);
  const rows = [];  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
  const rowCount = pageSize / rowSize; //行数
  for (let i = 0; i < rowCount; i++) {
    rows.push(paginatedcouponRows.slice(i * rowSize, (i + 1) * rowSize));
  }
  return rows;
})

// 分页拉取优惠券
const getCoupon = () => {
  isload.value = true;
  getCouponPage({
    pageNo: currentPage.value,
    pageSize: pageSize,
  })
    .then(resp => {
      console.log(resp);

      total.value = resp.data.total;
      couponList.value = resp.data.records;
      for (const coupon of couponList.value) {
        coupon.validto = utc2cn(coupon.validto);
      }
    })
    .catch(err => {
      console.log(err);
      ElMessage('优惠券拉取失败')
    })
    .finally(() => {
      isload.value = false;
    })
}


//选择菜单项
const handleSelect = (value) => {
  activeTag.value = value;
  currentPage.value = 1; //默认显示菜单的第一页
  // getCoupon();
}

watch(queryParams.value, (newValue) => {
  getCoupon();
})

onMounted(() => {
  getCoupon();
})

// 去使用优惠券
const turnToProduct = (index, i) => {
  //当前选中的优惠券
  const coupon = couponList.value[index * rowSize + i];
  //如果coupon.commodityId非空，则优先跳转到指定商品详情productDetail
  if (coupon.storeId) {
    // 如果commodityId为空但storeId非空，则跳转到店铺详情页shop
    //还不能跳转
    router.push({
      path: '/shop',
      query: {
        storeid: coupon.storeId,
      }
    })
  }
  else {
    //无使用限制，跳转到主页
    router.push('/');
  }
}

// 删除优惠券
const handleRemove = (index, i) => {
  ElMessageBox.confirm(
    '是否要删除该优惠券?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 请求后端删除
      deleteUserCoupon({
        couponId: couponList.value[index * rowSize + i].couponId,
      })
        .then(resp => {
          ElMessage.success('删除成功');
          getCoupon();//重新获取优惠券
        })
        .catch(resp => {
          ElMessage.error('删除失败，请重试')
          console.log(resp);
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


</script>
  


<style lang="scss" scoped> .coupon-container {
   padding: 3% 5% 3% 5%;
   background-color: white;
   margin: 0 5% 5% 5%;
   border-radius: 20px;
   box-shadow: 0 0 23px rgb(107 106 106 / 83%);
 }

 .main,
 .header {
   padding: 0;
 }

 // 居中容器
 .center-container {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   padding: 5px;
 }

 // 分页栏样式
 .pagination {
   // width:1000px;
   margin-top: 20px;
   margin-bottom: 20px;
   justify-content: center;
   text-align: center;
 }

 .c-container .shadow {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
   opacity: 0;
   transition: opacity 0.3s ease;
 }

 .c-container:hover .shadow {
   opacity: 1;
 }
</style>