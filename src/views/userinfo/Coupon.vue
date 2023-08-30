<template>
  <el-container class="coupon-container">

    <!-- 优惠券选择菜单 -->
    <el-header class="header">
      <el-menu
          :default-active="activeTag"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
      >
          <el-menu-item index="all">全部</el-menu-item>
          <el-menu-item index="discount">折扣优惠券</el-menu-item>
          <el-menu-item index="maxout">满减优惠券</el-menu-item>
          <el-menu-item index="expired">已过期</el-menu-item>
      </el-menu>
    </el-header>
    
    <!-- 优惠券显示栏 -->
    <el-main class="main">
      <!-- 没有优惠券 -->
      <el-card v-if="couponExit === false">
        <el-empty description="您还没有优惠券哦~" />
      </el-card>

      <!-- 有优惠券 -->
      <el-card v-if="couponExit === true">
        <!-- 行 -->
        <el-row v-for="(row, index) in couponRows" :key="index"  :gutter="60" style="margin:0 10px 0 0">
          <!-- 列 -->
          <el-col v-for="(coupon, i) in row" :key="i" :span="6" style="padding:20px">
            <!-- 单张优惠券容器 -->
              <div class="c-container" :class="{'container-invalid': coupon.isValid === false}"
                  @mouseenter.native="isHover = true" @mouseleave.native="isHover = false"
                  @mouseover="showShadow=true" @mouseout="showShadow=false">
                <!-- 鼠标悬浮效果 -->
                <div class="shadow" v-show="showShadow">
                  <!-- goodsId: couponList.value[index * rowSize + i].commodityId -->
                  <el-button v-if="coupon.isValid"  type="primary" :icon="Position" size="large" @click="turnToProduct(index, i)" circle style="margin-right:20px"/>
                  <el-button type="danger" :icon="Delete" size="large" @click="handleRemove(index,i)" circle/>
                </div>

                <!-- 1、优惠券类型 -->
                <div class="c-type center-container" :class="{'type-invalid': coupon.isValid === false}" >
                  <!-- v-if 折扣 -->
                  <div  v-if="coupon.type === 'discount'">
                    <div class="type-container">
                      <span class="discount-text">{{ coupon.discount }}</span>折
                    </div>
                    <div style="font-size: 35px;text-align: center;margin-top: 10px;font-weight: 300;">COUPON</div>
                  </div>

                  <!-- v-if 满减 -->
                  <div v-if="coupon.type === 'maxout'">
                    <div class="type-container">
                      <span>满{{ coupon.bar }}减</span>
                      <span class="discount-text">{{ coupon.reduction }}</span>元
                    </div>
                    <div style="font-size: 35px;text-align: center;margin-top: 10px;font-weight: 300; ">COUPON</div> 
                  </div>
                </div>

                <!-- 2、基本信息 -->
                <div class="c-info">
                  <!-- 使用限制 -->
                  <div class="c-id" :class="{'text-invalid': coupon.isValid === false}">
                    <div class="id-text">限用店铺：{{ coupon.storeId }}</div>
                    <div class="id-text">限用商品：{{ coupon.commodityId }}</div>
                    <!-- <div class="id-text">标签：{{ activeTag }}</div> -->
                    <!-- <div class="id-text">有效: {{ coupon.isValid}} </div> -->
                    <div style="text-align: center;font-size: 18px;font-weight: bold; margin:15px" >{{ coupon.couponId }}</div>
                  </div>
                  <!-- 有效期 -->
                  <div class="c-time" :class="{'text-invalid': coupon.isValid === false}">
                    <div>截止时间至：{{ coupon.validto }}</div>
                  </div>
                </div>
              </div>
          </el-col>
        </el-row>
        <!-- 分页栏 -->
        <el-row class="pagination">
          <el-pagination
              v-model:currentPage="currentPage"
              v-model:pageSize="pageSize"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
              />
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import {computed, ref, watch, onMounted} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from "@/router";
import { Delete,Position } from '@element-plus/icons-vue';

import { getCouponPage } from '@/api/coupon';
import { deleteUserCoupon } from '@/api/coupon';

  const couponExit = computed(()=>{
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
    storeId: null,
    commodityId: null,
    tag: "all" //默认获取全部
  })

  // 分页栏用到的数据
  const currentPage=ref(1); //当前页数，默认为第1页
  const pageSize=4; //每页的图片数量，
  const rowSize = 4; //每行优惠券数量：4
  let total = ref(5);//总数据

  queryParams.value.pageSize = pageSize;  //总页数
  queryParams.value.pageNo = currentPage; //当前页数
  queryParams.value.tag = activeTag; //选择的标签

  // 计算属性，计算couponList中图片对应的行；每行4列
  const couponRows = computed(() => {
    const start= 0; //当前页的起始数据编号
    const end = start + pageSize;//当前页的最后数据号
    const paginatedcouponRows = couponList.value.slice(start, end);
    const rows = [];  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
    const rowCount = pageSize / rowSize; //行数
    for (let i = 0; i < rowCount; i++) {
      rows.push(paginatedcouponRows.slice(i * rowSize, (i + 1) * rowSize));
    }
    return rows;
  })


  /**
   * 将后端传入的时间戳转换为显示的字符串
   * @param {string} timestamp - 类似"2023-07-28T05:28:20.962"的字符串
   * @returns {string} 转换后的字符串"2023.07.28 05:28:20""
   */
  const stamp2string = (timestamp) =>{
    const dataObj = new Date(timestamp);
    const formatted = dataObj.toISOString().replace("T"," ").split(".")[0];
    return formatted;
  }

  // 分页拉取优惠券
  const getCoupon = () =>{
    getCouponPage(queryParams)
    .then(resp => {
      total = resp.data.total;
      console.log(total);
      couponList.value=resp.data.records;
      console.log(couponList.value);
      for (const coupon of couponList.value) {
        coupon.validto = stamp2string(coupon.validto);
      }
      console.log("优惠券拉取成功")
    })
    .catch(err => {
      console.log(err);
      ElMessage('优惠券拉取失败')
    })
  }

  // 改变页数
  // function handleCurrentChange(){
  //     // getCoupon();
  // }

  //选择菜单项
  const handleSelect = (value) => {
    activeTag.value = value;
    currentPage.value = 1; //默认显示菜单的第一页
    // getCoupon();
  }

  //监听activeTag的变化并对应修改请求参数的tag
  watch(activeTag.value, (newValue) => {
    queryParams.value.tag = newValue;
  })

  watch(queryParams.value, (newValue) => {
    getCoupon();
  })

  onMounted(() => {
    getCoupon();
  })

    // 去使用优惠券
  const turnToProduct =(index,i) =>{
    //当前选中的优惠券
    const coupon = couponList.value[index * rowSize + i];
    //如果coupon.commodityId非空，则优先跳转到指定商品详情productDetail
    if(coupon.commodityId){
      console.log('turn to goods')
      router.push({path: '/goodsdetail',
        query: {
          goodsId: coupon.commodityId,
        }
      });
    }  
    else if(coupon.storeId) {
      // 如果commodityId为空但storeId非空，则跳转到店铺详情页shop
      //还不能跳转
      console.log('turn to shopdetail');
    }
    else {
      //无使用限制，跳转到主页
      router.push('/');
    }
  }

  // 删除优惠券
  const handleRemove = (index,i) => {
    console.log('remove');
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
        couponId: couponList.value[index * rowSize + i],
      })
      .then(resp => {
        ElMessage.success('删除成功');
        getCoupon();//重新获取优惠券
      })
      .catch(resp =>{
        ElMessage.error('删除失败，请重试')
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
  


<style lang="scss" scoped> 

  .coupon-container{        
    padding:0 5% 5% 5%;
  }

  .main,
  .header{
    padding:0;
  }

  // 居中容器
  .center-container{
      display:flex;
      justify-content:center;
      align-items:center;
      height:100%;
  }

  // 分页栏样式
  .pagination{
      // width:1000px;
      margin-top:20px;
      margin-bottom:20px;
      justify-content: center;
      text-align:center;
  }

  // 单张优惠券样式
  // 优惠券信息容器
  .c-container{
    width:210px;
    height: 400px;
    color:#a7d0f5;
    background-color: #94bee6;
    transition: all 0.3s ease;//过渡时间
    position: relative;
  }

  .c-container .shadow{
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

  .c-container:hover .shadow{
    opacity: 1;
  }

  // 鼠标悬浮
  .c-container:hover{
    transform: scale(1.05);
    box-shadow: 0 6px 12px gray;
  }

  // 顶部优惠券类型
  .c-container .c-type{
    width: 100%;
    height: 66%;
    background-color: rgb(10 30 57 / 94%);
    border-bottom: dashed #94bee6;
  }

  .c-container .c-type .type-container{
    text-align: center; //文字居中
    border-style:  double none;//边线
    border-width: 5px;
    width:180px;
  }

  .c-container .c-type .discount-text{
    color: #a7d0f5;
    font-size: 76px;
    font-weight: bold;
  }


  // 中部基本信息
  .c-container .c-info{
    color: rgb(10 30 57 / 94%);
    font-size: 10px;
    width: 100%;
    height:50%;
  }

  // 编号信息
  .c-container .c-info .c-id{
    font-size: 14px;
    margin: 5%;
    height: 40%;
    color:#000000ad;
  }

  .c-container .c-info .c-id .id-text{
    overflow: hidden;
    text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
    white-space: nowrap; /* 防止内容换行 */
  }

  // 有效期
  .c-container .c-info .c-time{
    font-size: 10px;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#0000008c;
  }

  // 根据优惠券是否有效改变颜色
  .container-invalid{
    background-color: #95b5d3;
  }

  .type-invalid{
    //强行覆盖父类（危险慎用）
    background-color: #4b698F !important;
  }
  .text-invalid{
    // 强行覆盖父类（危险慎用）
    color:#4b698F !important;
  }

</style>