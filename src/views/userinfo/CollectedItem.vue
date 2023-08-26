<template>    
    <div class="item-gallery" v-if="CollectedExit === false"  style="width:980px">
        <h2>商品收藏</h2>
        <el-empty description="您还没有收藏任何商品哦~"/>
    </div>

    <div v-if="CollectedExit === true">
        <div class="item-gallery">
            <h2>商品收藏</h2>
            <!-- 行 -->
            <el-row v-for="(row, index) in itemRows" :key="index" class="itemrow" :gutter="55">
                <!-- 列 -->
                <el-col v-for="(item, i) in row" :key="i" :span="6" class="itemcol">
                <Card :body-style="{ padding: '0' }"  :style="{ width: '210px', height: '300px'}" shadow="hover">
                    <!-- 商品图片 -->
                    <div class="item">
                        <img :src="item.url" class="image" />
                    </div>
                    <div style="padding:14px">
                    <!-- 商品描述 -->
                    <div class="description">{{ item.itemDescription }}</div>
                    <!-- 商品价格 -->
                    <div class="price">￥{{ item.itemPrice }}</div>
                    <div class="bottom">
                        <el-button class="details-btn" @click="handleDetailsClick">查看详情</el-button>
                        <el-button class="cancel-btn" @click="handleCancelClick">取消收藏</el-button>
                    </div>
                    </div>
                </Card>
                </el-col>
            </el-row>
        </div>
        <!-- 分页栏 -->
        <el-row class="pagination">
            <el-pagination
                v-model:currentPage="currentPage"
                v-model:pageSize="pageSize"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="prev, pager, next, jumper"
                :total="itemList.length"
                @current-change="handleCurrentChange"
                />
        </el-row>
    </div>


  </template>
  
  <script setup>
  import {computed} from 'vue'
  import {ref} from 'vue'
  import Card from '@/components/common/Card.vue'

  const CollectedExit=ref(true);
    const itemList = [
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'199.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'299.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'399.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'499.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'599.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'699.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'799.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'899.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'999.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'999.99'
    },
    {
        url: 'https://www.zhongguofeng.com/uploads/allimg/170905/13-1FZ5155101.jpg',
        itemDescription: '售卖猫和老鼠联名出版服饰；包含帽子、鞋子、衬衫、羽绒服，走过路过不要错过诶',
        itemPrice:'999.99'
    }
    ]

    // 分页栏用到的数据
    const currentPage=ref(1)  //当前页数，默认为第1页
    const pageSize=8  //每页的图片数量，设置为8

    // 计算属性，计算imageList中图片对应的行；每行4列
    const itemRows = computed(() => {
        const start=(currentPage.value-1)*pageSize; //当前页的起始数据编号
        const end=start+pageSize;  //当前页的最后数据号
        const paginatedItemRows=itemList.slice(start,end);//currentPage.value当前页需要显示的所有商品卡片（8个）
        const rows = [] //二维数组，rows[i]存储第i行的商品卡片（4个）
        const rowSize = 4;  //每行rowSize个商品
        const rowCount = pageSize/rowSize; //行数
        for (let i = 0; i < rowCount; i++) {
            rows.push(paginatedItemRows.slice(i * rowSize, (i + 1) * rowSize))
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

  <style lang="scss" scoped>

    h2{
        text-align: center;
    }

    .item-gallery {
        margin-left:10%;
        position:relative;
        // width:100%;
    }

    .itemrow{
        margin-top:30px;
    }

    .itmecol{
        max-width:24%;
    }


    .item{
        width:210px;
        height:150px;
        text-align: center;
        padding-top:15px;
    }

    .item-gallery .item .image{
        width:80%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }

    // .item-gallery .info{
    //     padding-top:0;
    //     padding-left:14px;
    //     padding-right:14px;
    // }
    .description {
        margin-bottom: 20px;
        // padding-top:10px;
        font-size: 14px;
        height: 20px; /* 设置固定高度 */
        overflow: hidden; /* 防止内容溢出 */
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
        white-space: nowrap; /* 防止内容换行 */
    }

    .price {
        color:orangered;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
    }

    .bottom{
        position:relative;
    }

    .bottom .cancel-btn{
        position: absolute;
        bottom:0;
        right:0;
    }

    // 分页块样式
    .pagination{
        margin-left:10%;
        width:1000px;
        margin-top:20px;
        margin-bottom:20px;
        justify-content: center;
        text-align:center;
        // position: absolute;
        // bottom: 0;
        // left: 50%;
        // transform: translateX(-50%);

    }

  </style>