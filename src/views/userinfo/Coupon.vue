<template>
    <div class="coupon-gallery" v-if="couponExit === false"  style="width:980px">
      <h2>我的优惠券</h2>
      <el-empty description="您还没有优惠券哦~"/>
    </div>

  <div class="coupon-gallery" v-if="couponExit === true" style="width:980px">
      <h2>我的优惠券</h2>
      <!-- 优惠券选择菜单 -->
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

      <!-- 优惠券显示栏 -->
      <el-card >
        <!-- 行 -->
        <el-row v-for="(row, index) in couponRows" :key="index" class="couponrow" :gutter="60" style="margin:0 10px 0 0">
          <!-- 列 -->
          <el-col v-for="(coupon, i) in row" :key="i" :span="6" class="couponcol" style="padding:20px">
            <!-- 单张优惠券容器 -->
              <div class="c-container" @mouseenter.native="isHover = true" @mouseleave.native="isHover = false">
                <!-- 1、优惠券类型 -->
                <div class="c-type center-container">
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
                  <div class="c-id">
                    <div class="id-text">限用店铺：{{ coupon.storeId }}</div>
                    <div class="id-text">限用商品：{{ coupon.commodityId }}</div>
                    <div class="id-text">标签：{{ activeTag }}</div>
                    <div style="text-align: center;font-size: 18px;font-weight: bold; margin:15px" >{{ coupon.couponId }}</div>
                  </div>
                  <!-- 有效期 -->
                  <div class="c-time">
                    <div>截止时间至：{{ coupon.end }}</div>
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
              :total="couponList.length"
              @current-change="handleCurrentChange"
              />
        </el-row>
      </el-card>
  </div>

</template>

<script setup>
import {computed, watch, onMounted} from 'vue'
import {ref} from 'vue'

  const couponExit = ref(true);//是否有优惠券

  const isHover = ref(false);//是否显示鼠标悬浮插槽

  const activeTag = ref('all');//选中的优惠券类型标签

  // const couponList = ref([]);//后端获取的优惠券列表

  const couponList = [
  {
    couponId: "SWAS8sD7EG", //优惠券id
    storeId: "你好哇这是汤姆叔叔的小屋啊啊啊啊啊啊啊啊啊啊啊啊啊", //店铺id
    commodityId: "3", //商品id
    type: "discount", //优惠券类型（折扣
    discount: 8.88, //折扣大小
    bar: 0,//满减门槛
    reduction: 0, //满减金额
    start: "2023-07-28 05:28:20",//起始时间
    end: "2024-07-27 21:28:20",//终止时间
  },
  {
    couponId: "SWAS8sD7EG", //优惠券id
    storeId: "1", //店铺id
    commodityId: "这里是洛丽塔小裙裙啦", //商品id
    type: "maxout", //优惠券类型（折扣
    discount: 0, //折扣大小
    bar: 300,//满减门槛
    reduction: 10, //满减金额
    start: "2023-07-28 05:28:20",//起始时间
    end: "2024-07-27 21:28:20",//终止时间
  },
  {
    couponId: "SWAS8sD7EG", //优惠券id
    storeId: "你好哇这是汤姆叔叔的小屋啊啊啊啊啊啊啊啊啊啊啊啊啊", //店铺id
    commodityId: "3", //商品id
    type: "discount", //优惠券类型（折扣
    discount: 8.88, //折扣大小
    bar: 0,//满减门槛
    reduction: 0, //满减金额
    start: "2023-07-28 05:28:20",//起始时间
    end: "2024-07-27 21:28:20",//终止时间
  },
  {
    couponId: "SWAS8sD7EG", //优惠券id
    storeId: "1", //店铺id
    commodityId: "3", //商品id
    type: "maxout", //优惠券类型（折扣
    discount: 0, //折扣大小
    bar: 300,//满减门槛
    reduction: 10, //满减金额
    start: "2023-07-28 05:28:20",//起始时间
    end: "2024-07-27 21:28:20",//终止时间
  },
  {
    couponId: "SWAS8sD7EG", //优惠券id
    storeId: "1", //店铺id
    commodityId: "3", //商品id
    type: "maxout", //优惠券类型（折扣
    discount: 0, //折扣大小
    bar: 300,//满减门槛
    reduction: 10, //满减金额
    start: "2023-07-28 05:28:20",//起始时间
    end: "2024-07-27 21:28:20",//终止时间
  },
  ]

  //获取优惠券API的请求参数
  const queryParams = ref({
    pageNo: 1,
    pageSize: 4,
    storeId: null,
    commodityId: null,
    tag: "all" //默认获取全部
  })

  onMounted(() => {
    console.log("getPage-onMounted",queryParams.pageNo,',',queryParams.tag);
  })

  // 分页栏用到的数据
  const currentPage=ref(1); //当前页数，默认为第1页
  const pageSize=4; //每页的图片数量，设置为8

  queryParams.value.pageSize = pageSize;  //总页数
  queryParams.value.pageNo = currentPage; //当前页数
  queryParams.value.tag = activeTag; //选择的标签

  // 计算属性，计算couponList中图片对应的行；每行4列
  const couponRows = computed(() => {
    const start= (currentPage.value - 1) * pageSize; //当前页的起始数据编号
    const end = start + pageSize;//当前页的最后数据号
    const paginatedcouponRows = couponList.slice(start, end);
    const rows = [];  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
    const rowSize = 4;
    const rowCount = pageSize / rowSize; //行数
    for (let i = 0; i < rowCount; i++) {
      rows.push(paginatedcouponRows.slice(i * rowSize, (i + 1) * rowSize));
    }
    return rows;
  })

  // 改变页数
  function handleCurrentChange(){
      console.log("CurrentChange，get",queryParams);
  }

  // 去使用优惠券
  function goDetail(){
    //如果coupon.commodityId非空，则优先跳转到指定商品详情productDetail
    // 如果commodityId为空单storeId非空，则跳转到店铺详情页shop
    console.log("handleCancelButton");
  }

  //选择菜单项
  const handleSelect = (value) => {
    activeTag.value = value;
    currentPage.value = 1; //默认显示菜单的第一页
    console.log("getPage-select",queryParams.pageNo,',',queryParams.tag);
  }

  //监听activeTag的变化并对应修改请求参数的tag
  watch(activeTag.value, (newValue) => {
    queryParams.value.tag = newValue;
  })

  watch(queryParams.value, (newValue) => {
    //调用api获取优惠券信息
    console.log("getPage",newValue.pageNo,',',newValue.tag);
  })

</script>
  


<style lang="scss" scoped> 
  h2{
    text-align: center;
  }

  .coupon-gallery {
      margin-left:10%;
      position:relative;
  }

  .coupon-gallery .couponrow{
      margin-left:10%;
      margin-right:5%;
      margin-top:30px;
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
      width:1000px;
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

  // 底部按钮容器
  .bottom{
    width:100%;
    height:10%;
  }

</style>