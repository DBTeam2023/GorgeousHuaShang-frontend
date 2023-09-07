<template>
    <el-container class="order-container">
      <el-header class="order-header">
        <el-menu
          :default-active="activeIndex"
          class="ordermenu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item index="all">全部</el-menu-item>
          <el-menu-item index="waitPay">待支付</el-menu-item>
          <el-menu-item index="successPaid">已支付</el-menu-item>
          <el-menu-item index="cancelPay">已取消</el-menu-item>
          <el-menu-item index="completed">已完成</el-menu-item>
        </el-menu>
      </el-header>
      <!-- 订单详情 -->
      <el-main class="order-main">
        <!-- 订单列表信息 -->
        <el-row>
            <el-table :data="orderList" 
                border 
                stripe 
                :show-header="true"
                :highlight-current-row="true">
                <el-table-column type="selection" />
                <el-table-column label="订单列表" >
                    <!-- 使用 slot-scope 定义作用域 -->
                    <template v-slot:default="{ row }">
                    <el-row class="t-header">
                        <el-col :span="24">订单编号: {{ row.orderID }}</el-col>
                    </el-row>
                    <el-row class="t-body">
                        <!-- 具体商品列表 -->
                        <el-col :span="14">
                            <pickList :orderPicks="row.picks"/>
                        </el-col>
                        <!-- 订单操作 -->
                        <el-col class="right-col" :span="3">
                            ￥{{ row.money }}
                        </el-col>

                        <el-col class="right-col btn-col" :span="3">
                            <el-row style="font-weight: bold;margin-bottom:5px;">{{ row.state }}</el-row>
                            <el-row class="btn" ><el-button link type="primary" @click="goOrderDetail">订单详情</el-button></el-row>
                            <el-row class="btn"><el-button link @click="deleteOrder">删除订单</el-button></el-row>
                        </el-col>
                        <el-col class="right-col" :span="3">
                            <el-row class="btn"><el-button  type="primary">去支付</el-button></el-row>
                        </el-col>
                    </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 分页栏  -->
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
    import { ref,onMounted, watch } from 'vue';
    import pickList from '@/views/order/pickList.vue'
    import { myOrders } from '@/api/order'
    import { ElMessage } from 'element-plus';
    import { base64ToUrl } from '@/utils/photo'


    const activeIndex = ref('all');

    // 分页栏用到的数据
    const currentPage=ref(1); 
    const pageSize= 5; 
    let total = ref(1);//总数据

    const orderList = ref([]);

    // 订单状态
    const status = ref({
        'all':null,
        'successPaid':'paid',
        'cancelPay':'cancelled',
        'completed':'order complete',
        'waitPay':'wait to pay',
    })

    // 分页获取订单信息
    const getOrderInPage = () =>{
        myOrders({
            pageSize:5,
            pageIndex:currentPage.value,
            orderId:null,
            moneymin:0,
            moneymax:null,
            orderStatus: status.value[activeIndex],
        })
        .then(resp =>{
            orderList.value = resp.data.records;
            total.value = resp.data.total;
            for (const order of orderList.value){
                for(const pick of order.picks){
                    const imageUrl = base64ToUrl(pick.pickImage.fileContents,'image/png');
                    Object.assign(pick, { picture: imageUrl }); 
                }
            }
            console.log(resp);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    

    // 初始调用
    onMounted(()=>{
        getOrderInPage();
    })

    // 分页请求
    const handleCurrentChange = () =>{
        getOrderInPage();
    }

    const handleSelect = (val) => {
        activeIndex.value = val;
        getOrderInPage();
    };


</script>
  
<style scoped>

    .order-container{
        padding:0;
        margin:0 5% 5% 5%;
    }

    .order-container .order-main{
        background-color: #fff;
        padding:0;
    }

    .order-container .order-header{
        padding:0;
    }
    .t-header{
        height:30px;
        text-align: center;
        border-bottom: 1px solid gainsboro;
        padding:0;
        font-size: 16px;
    }

    .t-body .right-col{
        background-color: gainsboro;
        margin:10px 0.5%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .t-body .btn-col {
        display:flex;
        flex-direction: column;
    }

    .t-body .btn-col .btn{
        margin:5%;
    }

    .pagination{
        margin-top:20px;
        margin-bottom:20px;
        justify-content: center;
        text-align:center;
    }
</style>