<template>
  <el-container class="follow-container">
    <div class="shop-gallery" v-if="FollowedExit === false" >
      <h2>店铺关注</h2>
      <el-empty description="您还没有关注任何店铺哦~"/>
    </div>

    <el-main class="shop-gallery" v-if="FollowedExit === true">
          <!-- 行 -->
        <el-row v-for="(row, index) in imageRows" :key="index" class="shoprow" :gutter="20">
          <!-- 列 -->
          <el-col v-for="(store, i) in row" :key="i" :span="6" class="shopcol" style="max-width:none;">
            <Card style="margin:auto" :body-style="{ padding: '0' }" :style="{ width: '210px', height: '300px'}" shadow="hover">
              <!-- 店铺图片 -->
              <div class="shop">
                  <img :src="store.picture" class="image" alt="该店铺未设置头像"/>
              </div>
              <div style="padding: 14px">
                <!-- 店铺名称 -->
                <div class="name">{{ store.storeName }}</div>
                <!-- 店铺评分 -->
                <div class="description">
                  <el-rate v-model="store.score" disabled></el-rate>
                </div>
                <div class="bottom">
                  <el-button class="details-btn" type="primary" @click="goDetails(store.storeId)">查看详情</el-button>
                  <el-button class="cancel-btn" type="info" @click="cancelFollow(store.storeId)">取消关注</el-button>
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
              :total="total"
              @current-change="handleCurrentChange"
              />
        </el-row>
      </el-main>
  </el-container>

</template>

<script setup>
import {computed,onMounted} from 'vue'
import {ref} from 'vue'
import Card from '@/components/common/Card.vue'
import { ElMessage, ElMessageBox, ElRate } from 'element-plus'
import router from "@/router"
import { removeCollectStore } from '@/api/store'
import { getFollowedStore } from '@/api/userinfo'
import { getStoreAvatar } from '@/api/store'
import { base64ToUrl } from '@/utils/photo'

  const FollowedExit = ref(true);

  const storeList = ref([]);

  // 分页栏用到的数据
  const currentPage=ref(1) //当前页数，默认为第1页
  const pageSize = 8 //每页的图片数量，设置为8
  const rowSize = 4
  let total = ref(1);

  // 计算属性，计算storeList中图片对应的行；每行3列
  const imageRows = computed(() => {
    const start=0; //当前页的起始数据编号
    const end=start+pageSize;//当前页的最后数据号
    const paginatedShopRows=storeList.value.slice(start,end);
    const rows = []  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
    const rowCount = pageSize/rowSize; //行数
    for (let i = 0; i < rowCount; i++) {
      rows.push(paginatedShopRows.slice(i * rowSize, (i + 1) * rowSize))
    }
    return rows;
  })

  // 获取用关注店铺
  const getFollows = () =>{
    getFollowedStore({
      pageNo: currentPage.value,
      pageSize: pageSize,
    })
      .then(resp => {
        storeList.value = resp.data.records;
        total.value = resp.data.total;
        
        if(total.value === 0){ //用户没有关注店铺
            FollowedExit.value = false;
        }       
        else{
            FollowedExit.value = true;
        }     
          
        // 获取店铺头像
        for (const store of storeList.value) {
          getStoreAvatar({
            storeId: store.storeId,
          })
          .then(resp =>{
            if(resp.data === null){
              Object.assign(store, { picture: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' });
            }
            else{
              const imageUrl = base64ToUrl(resp.data.fileContents,'image/png');
              // 创建新对象，并添加 picture 字段
              Object.assign(store, { picture: imageUrl });  
            }
          })
          .catch(err =>{
            ElMessage('获取店铺头像失败！')
          })
        }
      })
      .catch(err =>{
        ElMessage.error('获取店铺关注失败');
      })
  }

  onMounted(() =>{
    getFollows();
  })

  function handleCurrentChange(){
      getFollows();
  }

  function goDetails(id){
        //跳转到指定商品详情页
        console.log("godetail",id);
        // 跳转到指定店铺详情页
        router.push({path: '/shop',
        query: {
          shopId: id,
        }
      });
    }

    function cancelFollow(id){
        //将该商品从关注页删除
        console.log("remove",id);
        ElMessageBox.confirm(
            '是否取消关注该店铺?',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(()=>{
            // 调用后端api取消收藏
            removeCollectStore({
                storeId:id,
            })
            .then(resp =>{
                ElMessage.success('取消关注成功');
            })
            .catch(err =>{
                ElMessage.error('取消关注失败，请重试');
            })
            // 重新获取关注店铺列表
            getFollows();

        })
        .catch(()=>{
            ElMessage.info('取消操作');
        })
    }
</script>


<style lang="scss" scoped>

    .follow-container {
      padding: 3% 5% 3% 5%;
      background-color: #fff;
      margin:0 5% 5% 5%;
      border-radius: 20px;
    }

    .shop-gallery {
        position:relative;
    }

    .shoprow{
        margin-bottom:30px;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .shopcol{
      display:flex;
      justify-content: center;
      align-items: center;
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
        text-align:center;
        padding-top:10px;
        font-size: 14px;
        height: 40px; /* 设置固定高度 */
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
        margin-top:20px;
        justify-content: center;
        text-align:center;
        width:100%;
    }

  </style>