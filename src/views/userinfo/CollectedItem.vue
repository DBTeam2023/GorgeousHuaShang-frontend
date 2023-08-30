<template>    
    <el-container class="collections-container">
        <div class="item-gallery" v-if="CollectedExit === false">
            <el-empty description="您还没有收藏任何商品哦~"/>
        </div>

        <div v-if="CollectedExit === true">
            <div class="item-gallery">
                <!-- 行 -->
                <el-row v-for="(row, index) in itemRows" :key="index" class="itemrow" :gutter="40">
                    <!-- 列 -->
                    <el-col v-for="(item, i) in row" :key="i" :span="6" class="itemcol">
                    <Card style="margin:auto" :body-style="{ padding: '0' }"  :style="{ width: '210px', height: '300px'}" shadow="hover">
                        <!-- 商品图片 -->
                        <div class="item">
                            <img :src="item.picture" class="image" />
                        </div>
                        <div style="padding:14px">
                        <!-- 商品描述 -->
                        <div class="description">{{ item.commodityDescription }}</div>
                        <!-- 商品价格 -->
                        <div class="price">￥{{ item.commodityPrice }}</div>
                        <div class="bottom">
                            <el-button type="primary" class="details-btn" @click="goDetails(item.commodityId)">查看详情</el-button>
                            <el-button type="info" class="cancel-btn" @click="cancelCollected(item.commodityId)">取消收藏</el-button>
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
                    :total="total"
                    @current-change="handleCurrentChange"
                    />
            </el-row>
        </div>
    </el-container>


  </template>
  
  <script setup>
  import { computed, ref, onMounted } from 'vue'
  import Card from '@/components/common/Card.vue'
  import { getCollectedCommodity, uncollectCommodity } from '@/api/userinfo'
  import { ElMessage,ElMessageBox } from 'element-plus';
  import router from '@/router'
  import { base64ToString } from '@/utils/photo';

    const CollectedExit=ref(true);//是否有优惠券

    const itemList = ref([]);

    // 分页栏用到的数据
    const currentPage=ref(1)  //当前页数，默认为第1页
    const pageSize= 8  //每页的图片数量，设置为8
    const rowSize = 4; //每行优惠券数量：4
    let total = ref(9);//总数据

    // 计算属性，计算imageList中图片对应的行；每行4列
    const itemRows = computed(() => {
        const start = 0; //当前页的起始数据编号
        const end = start + pageSize;  //当前页的最后数据号
        const paginatedItemRows = itemList.value.slice(start,end);//currentPage.value当前页需要显示的所有商品卡片（8个）
        const rows = [] //二维数组，rows[i]存储第i行的商品卡片（4个）
        const rowCount = pageSize/rowSize; //行数
        for (let i = 0; i < rowCount; i++) {
            rows.push(paginatedItemRows.slice(i * rowSize, (i + 1) * rowSize))
        }
        return rows;
    })

    // 调用api获取关注商品列表
    const getCollections = () => {
        getCollectedCommodity({
            pageNo: currentPage.value,
            pageSize: pageSize,
        })
        .then(resp => {
            itemList.value = resp.data.records;
            total = resp.data.total;     
            if(total === 0){
                CollectedExit.value = false;
            }       
            else{
                CollectedExit.value = true;
            }
            // 暂时图片写死
            // for (const commodity of itemList.value) {
            //     const imageSrc = base64ToString(commodity.picture,'image/png');
            //     commodity.picture = imageSrc.value;
            // }
            console.log('获取收藏商品成功');
        })
        .catch(err =>{
            ElMessage('获取收藏失败，请刷新重试');
        })
    }

    onMounted(()=>{
        getCollections();
    })

    function handleCurrentChange(){
        console.log("handleCurrentChange");
        getCollections();
    }

    function goDetails(id){
        //跳转到指定商品详情页
        console.log("godetail",id);
        router.push({path: '/goodsdetail',
        query: {
          goodsId: id,
        }
      });
    }

    function cancelCollected(id){
        //将该商品从关注页删除
        console.log("remove",id);
        ElMessageBox.confirm(
            '是否取消收藏该商品?',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(()=>{
            // 调用后端api取消收藏
            uncollectCommodity({
                commodityId:id,
            })
            .then(resp =>{
                ElMessage.success('取消收藏成功');
            })
            .catch(err =>{
                ElMessage.error('取消收藏失败，请重试');
            })
            // 重新获取收藏商品列表
            getCollections();

        })
        .catch(()=>{
            ElMessage.info('取消操作');
        })
    }
  </script>

  <style lang="scss" scoped>

    .collections-container{
        padding:0 10% 0 10%;
    }

    .item-gallery {
        position:relative;
    }

    .itemrow{
        margin-bottom:30px;
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
        margin-top:20px;
        justify-content: center;
        text-align:center;
    }

  </style>