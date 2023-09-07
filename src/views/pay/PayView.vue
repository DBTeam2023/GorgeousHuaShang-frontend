<template>
    <div class="container">
      <el-container>
        <el-main class="main">
            <!-- 对话框：倒计时跳转到订单详情页面 -->
            <el-dialog
                v-model="showCountdown"
                :title="payMessage"
                width="30%"
                align-center
            >
                <span>将在 <span style="color:red;font-size:18px">{{ countdown }}</span> s后自动跳转到订单详情页</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="router.push({ name: 'OrderDetail', params: { orderID: orderID } });">
                            立即跳转
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <!-- 支付操作 -->
            <el-card class="card">
                <el-container>
                    <!-- 头部：订单号/订单金额 -->
                    <el-header>
                        <el-row>
                            <el-col :span="10" class="center-container">
                               <div>订单号：{{orderID}}</div>
                            </el-col>
                            <el-col :span="14">
                                <div class="center-container">
                                    应付金额：
                                    <span class="amount" 
                                    :class="{'delete-line':useCoupon  && selectedCouponID!==''}">
                                        ￥{{orderAmount}}
                                    </span>
                                    <span class="amount" style="margin-left:10px" 
                                        v-show="useCoupon && selectedCouponID!==''">
                                        ￥{{orderAmount - discountAmount}}
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                    </el-header>

                    <!-- 支付选择 -->
                    <el-main>
                        <!-- 是否使用优惠券选择 -->
                        <el-main>
                            <el-row class="row">是否使用优惠券:</el-row>
                            <el-row>
                                <el-col :span="4">
                                    <el-button color="#ffcc00" plain @click="getCoupon">是</el-button>
                                </el-col>
                                <el-col :span="4">
                                    <el-button color="#ffcc00" plain @click="useCoupon = false">否</el-button>
                                </el-col>
                            </el-row>
                        </el-main>
                        <el-divider></el-divider>

                        <!-- 优惠券 -->
                        <el-main v-show="useCoupon === true">
                            <el-row class="row">可用优惠券(单选)：</el-row>
                            <el-row v-show="total === 0 && useCoupon === true" class="center-container">
                                <el-empty description="暂无可用优惠券" />
                            </el-row>
                            <!-- 行 -->
                            <el-row v-for="(row, index) in couponRows" :key="index" :gutter="20">
                                <!-- 列 -->
                                <el-col v-for="(coupon, i) in row" :key="i" :span="6" style="max-width:none;margin-bottom:30px;" class="center-container">
                                    <el-row class="center-container" style="margin-bottom:10px;">
                                        <el-button color="#ffcc00" plain :icon="Check" circle 
                                            :class="{ 'yellow-button': coupon.couponId == selectedCouponID }" 
                                        @click="selectCoupon(i,index)"/>
                                    </el-row>
                                    <el-row class="center-container">
                                        <CouponCard :coupon="coupon" :disableMouseEvents="disableMouseEvents" 
                                            @click="selectCoupon(i,index)"/>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <!-- 优惠金额 -->
                            <el-row>
                                <div class="center-container" v-show="total !== 0">
                                    共计优惠：
                                    <span style="color:red;font-size:20px;font-weight:bolder">
                                        ￥{{ discountAmount}}
                                    </span>
                                </div>          
                            </el-row>
                            <!-- 分页栏 -->
                            <el-row class="pagination" v-show="total !== 0">
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

                        <!-- 确认支付按钮 -->
                        <el-row class="center-container">
                                <el-button @click="cancelPayment">取消支付</el-button>
                                <el-button type="primary" @click="submitPayment">确认支付</el-button>
                        </el-row>
                    </el-main>
                </el-container>
            </el-card>
        </el-main>
      </el-container>
    </div>
  </template>
  
<script setup>
  import { ref, computed,onMounted, watch } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Check } from '@element-plus/icons-vue'
  import { useRoute, useRouter } from 'vue-router';
  import router from '@/router';
  import CouponCard from '@/components/Coupon/CouponCard'
  import { checkPermission } from '@/utils/auth';
  import { getOrderInfo, getValidCoupon, payOrder } from '@/api/pay';
  import { utc2cn } from '@/utils/timeTransfer';
import { deleteUserCoupon } from '@/api/coupon';


    const route = useRoute(); // 来自：获取路由对象

    const orderID = ref(route.query.orderId);//订单编号（页面传参）

    const orderAmount = ref(324.3);//订单总金额
    const discountAmount = ref(0);//优惠金额

    const showCountdown = ref(false);//是否显示页面跳转倒计时对话框
    const countdown = ref(10);//倒计时的秒数
    const disableMouseEvents = ref(false);// 禁用优惠券鼠标事件
    const selectedCouponID = ref('');//选中的优惠券id（默认值为后端所给的最优）

    const payMessage = ref('支付成功！');//支付状态信息
    const useCoupon = ref(false);//是否使用优惠券

      //获取优惠券API的请求参数
    const queryParams = ref({
        pageNo: 1,
        pageSize: 4,
        pickIds: [],
    })

    const couponList = ref([]);//后端拉取的可用优惠券

    // 分页栏用到的数据
    const currentPage=ref(1); //当前页数，默认为第1页
    const pageSize= 4; //每页的图片数量，
    const rowSize = 4; //每行优惠券数量：4
    let total = ref(1);//总数据

    queryParams.value.pageSize = pageSize;  //总页数
    queryParams.value.pageNo = currentPage; //当前页数

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

    // 分页拉取优惠券
    const getCoupon = () =>{
        useCoupon.value = true;
        console.log(queryParams.value.pickIds);
        getValidCoupon({
            pageNo: queryParams.value.pageNo,
            pageSize: queryParams.value.pageSize,
            pickIds:queryParams.value.pickIds,
        })
        .then(resp => {
            console.log(resp);
            total = resp.data.total;
            couponList.value=resp.data.records;
            for (const coupon of couponList.value) {
                coupon.validto = utc2cn(coupon.validto);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    // 初始
    onMounted(() => {
        //0.角色授权
        checkPermission(["buyer"]);

        //1.根据orderId从后端获取商品价格orderAmount
        getOrderInfo({
            orderId: orderID.value,
        })
        .then(resp =>{
            console.log(resp);
            orderAmount.value = resp.data.money;
            // 遍历数组提取pickId
            for (const obj of resp.data.picks) {
                queryParams.value.pickIds.push(obj.pickId);
            }
            console.log(queryParams.value.pickIds);
        })
        .catch(err => {
            ElMessage('获取订单详情失败，请刷新重试');
            console.log(err);
        })


    });

    //跳转10s倒计时
    const updateCountdown = () => {
        if (countdown.value > 0) {
            setTimeout(() => {
            countdown.value--;
            updateCountdown();
            }, 1000);
        } else {
            showCountdown.value = false;
            // 跳转到订单详情页
            router.push({ name: 'OrderDetail', params: { orderID: orderID } });
        }
    };

    // 用户选择的优惠券id
    const selectCoupon = (i,index) =>{
        selectedCouponID.value = couponList.value[index * rowSize + i].couponId; //被选中的优惠券
        const type = couponList.value[index * rowSize + i].type;
        if( type === 'discount')
            discountAmount.value = orderAmount.value * (1 - couponList.value[index * rowSize + i].discount).toFixed(2);
        else if ( type === 'maxout')
            discountAmount.value = couponList.value[index * rowSize + i].reduction;
        useCoupon.value = true;
    }

    // 跳转到订单详情页面
    const jumpToOrder = (message) =>{
        // 倒计时准备
        showCountdown.value = true;
        payMessage.value = message;
        updateCountdown();
    }

   //调用后端api对钱包扣款   
    // const deductMoney = () => {
    //     deductWallet({
    //         amount: orderAmount.value,
    //     })
    //     .then(resp =>{
    //         jumpToOrder('支付成功！');
    //     })
    //     .catch(err =>{
    //         jumpToOrder('支付失败！');
    //     })
    // }
    
    // 检查钱包是否可支付
    // const isPayable = () =>{
    //     const wallet = ref();//用户钱包
    //     getWallet()
    //     .then(resp => {
    //         wallet.value = resp.data;
    //         if(wallet.value.status === false){
    //             jumpToOrder('钱包已被冻结，支付失败！');
    //         }
    //         else if(wallet.value.balance < orderAmount.value){
    //             jumpToOrder('钱包余额不足，支付失败！');
    //         }
    //         else{
    //             deductMoney();//对钱包扣款
    //         }
    //     })
    //     .catch(resp =>{
    //         jumpToOrder('无法获取钱包信息，支付失败！');
    //     })
    // }
  
    // 确认支付按钮
    const submitPayment = () => {
        console.log(selectedCouponID.value);
        console.log(queryParams.value.pickIds.value);
        payOrder({
            pickIds:queryParams.value.pickIds.value,
            couponId: selectedCouponID.value,
        })
        .then(resp =>{
            // jumpToOrder('支付成功！');
            console.log(resp);
        })
        .catch(err =>{
            // jumpToOrder(err.message);
            console.log(err);
        })
    };

    // 取消支付 按钮 
    const cancelPayment = () => {
        ElMessageBox.confirm(
            '是否取消支付当前订单?',
            {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning',
            })
            .then(() => {
                //修改订单状态为未支付（订单创建初始状态是什么？）
                jumpToOrder('取消支付！')
            })
            .catch(()=>{

            })
    }

    // 分页选择
    const handleCurrentChange = () => {
        getCoupon();
    }

</script>
  
<style scoped>

  .container{
    height: 100%;
    background-color: #E6E8EB;
  }

  .main{
    overflow: hiden;
  }

  .card{
    margin:5vh 10vw;
  }

  .center-container{
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .row{
    margin-top:3%;
    margin-bottom:3%;
  }

  .pagination{
      /* width:1000px; */
      display:flex;
      margin-top:20px;
      margin-bottom:20px;
      justify-content: center;
      text-align:center;
  }

  /* 应付金额样式 */
  .amount{
    color:red;
    font-weight:bolder;
    font-size:30px;
  }

  /* 删除线样式 */
  .delete-line{
    font-size:18px;
    text-decoration: line-through;
  }

  .yellow-button{
    background-color:#ffcc00;
    color: white;
  }
  
  </style>
  