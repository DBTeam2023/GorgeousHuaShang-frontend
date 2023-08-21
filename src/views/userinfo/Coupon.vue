<template>
    <div class="coupon-gallery" v-if="couponExit === false"  style="width:980px">
      <h2>我的优惠券</h2>
      <el-empty description="您还没有优惠券哦~"/>
    </div>

  <div class="coupon-gallery" v-if="couponExit === true">
      <h2>我的优惠券</h2>
      <!-- 优惠券选择器 -->
      <el-select v-model="option_value"  filterable placeholder="Select">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
    </el-select>

        <!-- 行 -->
      <el-row v-for="(row, index) in couponRows" :key="index" class="couponrow" :gutter="60">
        <!-- 列 -->
        <el-col v-for="(coupon, i) in row" :key="i" :span="6" class="couponcol">
          <Card :body-style="{ padding: '0' }" :style="{ width: '210px', height: '300px'}" shadow="hover">
            <!-- 店铺图片 -->
            <div class="coupon">
                <img :src="coupon.url" class="image" />
            </div>
            <div style="padding: 14px">
              <!-- 店铺名称 -->
              <div class="name">{{ coupon.couponName }}</div>
              <!-- 店铺描述 -->
              <div class="description">{{ coupon.couponDescription }}</div>
              <div class="bottom">
                <el-button class="details-btn" @click="handleDetailsClick">查看详情</el-button>
                <el-button class="cancel-btn" @click="handleCancelClick">取消收藏</el-button>
              </div>
            </div>
          </Card>
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
  </div>

</template>

<script setup>
import {computed} from 'vue'
import {ref} from 'vue'
import Card from '@/components/common/Card.vue'

  const couponExit = ref(true);

  const option_value=ref('全部');//选择器选中的值

    //优惠券筛选选项   
  const options = [
  {
    value: '全部',
    label: '全部',  //界面可见（选项）
  },
  {
    value: '待使用',
    label: '待使用',
  },
  {
    value: '已使用',
    label: '已使用',
  },
  {
    value: '已过期',
    label: '已过期',
  },
  {
    value: '满减优惠券',
    label: '满减优惠券',
  },
  {
    value: '折扣优惠券',
    label: '折扣优惠券',
  },
]

  const couponList = [
  {
    couponId: "SWAS8sD7EG", //优惠券id
    storeId: "1", //店铺id
    commodityId: "3", //商品id
    type: "discount", //优惠券类型（折扣
    discount: 0.8, //折扣大小
    bar: 0,//满减门槛
    reduction: 0, //满减金额
    start: "2023-07-28T05:28:20.962",//起始时间
    end: "2024-07-27T21:28:20.962",//终止时间
    status:"待使用",//优惠券状态
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '神兵小将',
      couponDescription: '动画片神兵小将联合店铺'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '喜羊羊与灰太狼',
      couponDescription: '喜羊羊，美羊羊，懒羊羊，沸羊羊，别看我只是一只羊，羊儿的聪明难以想象'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '汤姆猫的小店',
      couponDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '汤姆猫的小店',
      couponDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '汤姆猫的小店',
      couponDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '汤姆猫的小店',
      couponDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '汤姆猫的小店',
      couponDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      couponName: '汤姆猫的小店',
      couponDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  }
  ]

  // 分页栏用到的数据
  const currentPage=ref(1); //当前页数，默认为第1页
  const pageSize=8; //每页的图片数量，设置为8

  // 计算属性，计算couponList中图片对应的行；每行3列
  const couponRows = computed(() => {
    const start=(currentPage.value-1)*pageSize; //当前页的起始数据编号
    const end=start+pageSize;//当前页的最后数据号
    const paginatedcouponRows=couponList.slice(start,end);
    const rows = [];  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
    const rowSize = 4;
    const rowCount = pageSize/rowSize; //行数
    for (let i = 0; i < rowCount; i++) {
      rows.push(paginatedcouponRows.slice(i * rowSize, (i + 1) * rowSize));
    }
    return rows;
  })

    function handleCurrentChange(){
      console.log("handleCurrentChange");
  }

  function handleCancelClick(){
      //将该店铺从关注页删除
      console.log("handleCancelButton");
  }

  function handleDetailsClick(){
      //跳转到指定店铺详情页
      console.log("handleDetailsButton");
  }
</script>
  


<style lang="scss" scoped>

    .coupon-gallery {
        margin-left:10%;
        position:relative;
    }

    .couponrow{
        margin-left:10%;
        margin-right:5%;
        margin-top:30px;
    }

    .coupon{
        width:210px;
        height:150px;
        text-align: center;
        padding-top:15px;
    }

    .coupon-gallery .coupon .image{
        width:80%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }

    .name{
        text-align: center;
        font-size: 18px;
    }

    .description{
        padding-top:10px;
        font-size: 14px;
        height: 50px; /* 设置固定高度 */
        overflow: hidden; /* 防止内容溢出 */
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
        white-space: nowrap; /* 防止内容换行 */
    }


    .bottom{
        position:relative;
    }

    .bottom .cancel-btn{
        position: absolute;
        bottom:0;
        right:0;
    }

    h2{
        text-align: center;
    }

    .pagination{
        width:1000px;
        margin-top:20px;
        margin-bottom:20px;
        justify-content: center;
        text-align:center;
    }

</style>