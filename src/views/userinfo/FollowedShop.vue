<script setup>
import {computed} from 'vue'
import {ref} from 'vue'
import Card from '@/components/common/Card.vue'

  const imageList = [
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '神兵小将',
      shopDescription: '动画片神兵小将联合店铺'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '喜羊羊与灰太狼',
      shopDescription: '喜羊羊，美羊羊，懒羊羊，沸羊羊，别看我只是一只羊，羊儿的聪明难以想象'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  },
  {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      shopName: '汤姆猫的小店',
      shopDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶'
  }
  ]

  // 分页栏用到的数据
  const currentPage=ref(1) //当前页数，默认为第1页
  const pageSize=8 //每页的图片数量，设置为8

  // 计算属性，计算imageList中图片对应的行；每行3列
  const imageRows = computed(() => {
    const start=(currentPage.value-1)*pageSize; //当前页的起始数据编号
    const end=start+pageSize;//当前页的最后数据号
    const paginatedShopRows=imageList.slice(start,end);
    const rows = []  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
    const rowSize = 4
    const rowCount = pageSize/rowSize; //行数
    for (let i = 0; i < rowCount; i++) {
      rows.push(paginatedShopRows.slice(i * rowSize, (i + 1) * rowSize))
    }
    return rows
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

<template>
    <div class="shop-gallery">
      <h2>关注店铺</h2>
        <!-- 行 -->
      <el-row v-for="(row, index) in imageRows" :key="index" class="shoprow" :gutter="60">
        <!-- 列 -->
        <el-col v-for="(image, i) in row" :key="i" :span="6" class="shopcol">
          <Card :body-style="{ padding: '0' }" :style="{ width: '210px', height: '300px'}" shadow="hover">
            <!-- 店铺图片 -->
            <div class="shop">
                <img :src="image.url" class="image" />
            </div>
            <div style="padding: 14px">
              <!-- 店铺名称 -->
              <div class="name">{{ image.shopName }}</div>
              <!-- 店铺描述 -->
              <div class="description">{{ image.shopDescription }}</div>
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
            :total="imageList.length"
            @current-change="handleCurrentChange"
            />
      </el-row>
    </div>
  </template>
  


  <style lang="scss" scoped>

    .shop-gallery {
        margin-left:10%;
        position:relative;
    }

    .shoprow{
        margin-left:10%;
        margin-right:5%;
        margin-top:30px;
    }

    .shop{
        width:210px;
        height:150px;
        text-align: center;
        padding-top:15px;
    }

    .shop-gallery .shop .image{
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
        width:900px;
        margin-top:20px;
        margin-bottom:20px;
        justify-content: center;
        text-align:center;
    }

  </style>