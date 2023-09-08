<!--html模板-->
<template>
    <el-container class="orderDetailMainView">
        <el-main>
            <el-row class="row-1"><!--返回按钮+页面功能描述-->
                <el-col :span="2" class="row-1-text">
                    <router-link to="/userinfo/myOrder/"><!--添加路由跳转-->
                        <el-button class="returnButton" type="return" plain @click="onReturnButtonClick">返回</el-button><!--返回按钮，返回我的订单-->
                    </router-link>
                </el-col>
                <el-col :span="3" class="row-1-text">
                    <el-text  tag="b" >我的订单/订单详情</el-text>
                </el-col>


            </el-row>
            <el-row class="row-2" justify="space-between"><!--订单发货信息-->
                <el-col :span="24" class="row-2-card"><!-- 订单状态 -->
                  <el-card class="orderState-card">
                    <template #header>
                      <div class="orderState-card-header">
                        <span style="font-weight: bold; font-size: 1.15em;">订单信息</span>
                        <!-- <el-button text @click="openAddressDialog">申请修改订单</el-button> -->
                      </div>
                    </template>
                    <el-descriptions
                        class="margin-top"
                        :column="2"
                        :style="blockMargin"
                    >
                      <el-descriptions-item label="订单编号：" >{{ OrderState.orderID }}</el-descriptions-item>
                      <el-descriptions-item label="用户编号：" >{{ OrderState.userID }}</el-descriptions-item>
                      <el-descriptions-item label="用户名：" >{{ OrderState.username }}</el-descriptions-item>
                      <el-descriptions-item label="手机号：" >{{ OrderState.phoneNumber }}</el-descriptions-item>
                      <el-descriptions-item label="仓库地址：" >{{ OrderState.shipAddress }}</el-descriptions-item>
                      <el-descriptions-item label="收货地址：" >{{ OrderState.pickAddress }}</el-descriptions-item>
                      <el-descriptions-item label="快递公司：" >{{ OrderState.company }}</el-descriptions-item>
                    </el-descriptions>
                  </el-card>
                </el-col>
            </el-row>


            <el-row class="row-3" justify="space-between"><!--订单发货信息-->
                <el-col :span="12" class="row-3-card"><!--物流时间线-->
                  <el-card class="logistics-card"><!--物流时间线-->
                    <div>
                      <h3 class="logisticsText">物流位置信息</h3>
                    </div>
                    <el-timeline v-if="LogisticsInfo.length > 0">
                      <el-timeline-item
                          v-for="(activity, index) in LogisticsInfo"
                          :key="index"
                          :icon="activity.icon"
                          :type="activity.type"
                          :color="activity.color"
                          :hollow="activity.hollow"
                          :timestamp="activity.timestamp"
                      >
                        {{ activity.content }}
                      </el-timeline-item>
                    </el-timeline>
                    <div v-else class="not-shipped-text">
                      您的宝贝尚未发货，暂无物流信息，请耐心等待哦~
                    </div>
                  </el-card>
                </el-col>


                <!-- <el-col :span="12" class="row-3-card"><timelineCard/></el-col> -->
                <el-col :span="12" class="row-3-card">
                  <el-card class="row-4-card" :span="24">
                    <div>
                      <h3 class="paymentText">支付详情</h3>
                    </div>
                    <el-descriptions
                        class="margin-top"
                        :column="2"
                    >
                      <el-descriptions-item label="商品总价：" >￥{{ orderInfo.goodsTotalPrice }}元</el-descriptions-item>
                    </el-descriptions>
                  </el-card>
                </el-col>
            </el-row>

            <el-row class="row-4">
              <el-card class="row-3-card-last">
                <el-table :data="orderTableData" style="width: 100">
                  <el-table-column prop="goodsID" label="商品编号" width="320"/>
                  <el-table-column prop="goods" label="商品" width="250">
                    <template v-slot="{ row }">
                      <el-row class="img-container">
                          <el-col :span="8">
                            <img :src="row.goods.image" alt="image" style="width: 50px; height: 50px;"/>
                          </el-col>
                          <el-col :span="16">
                            {{ row.goods.description }}
                          </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column prop="unitprice" label="单价" width="140" :formatter="formatCurrency"/>
                  <el-table-column prop="number" label="数量" width="140" :formatter="formatQuantity"/>
                  <el-table-column prop="total" label="总额" width="140" :formatter="formatCurrency"/>
                  <el-table-column prop="payment" label="实付" width="140" :formatter="formatCurrency"/>
                </el-table>
              </el-card>
            </el-row>
            
        </el-main>
    </el-container>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, ref} from "vue";
import {getAllLogisticsInfo, getLogisticsInfo} from "@/api/logistics";
import {getUserInfo} from "@/api/userinfo";
import {getOrderDetails, getOrderInfo} from "@/api/order";
import {ElMessage} from "element-plus";
import {base64ToUrl} from "@/utils/photo";

const router = useRouter(); // 获取路由实例
const route = useRoute(); // 获取路由实例

const orderNumber = route.params.orderID;

const allResponse = ref();

const OrderState = ref({
  orderID: '',
  state: '',
  userID: '',
  username: '',
  phoneNumber: '',
  shipAddress: '',
  pickAddress: '',
  company: ''
})

const orderInfo = ref({
  goodsTotalPrice: 0,
  discount: 0,
  totalPrice: 0,
});

const orderTableData = ref([

]);



const onReturnButtonClick = () => { // 点击返回按钮时的跳转逻辑
    // router.push('/order/');
    router.push({ name: 'UserInfo', params: { selected: 'myOrder' } });
}

const LogisticsInfo = reactive([

]); // 初始化为空数组

onMounted(() => {

  OrderState.value.orderID = orderNumber;

  getOrderDetails({
    orderId: orderNumber
  })
      .then(resp => {
        allResponse.value = resp.data;
        getUserInfoInOrder();
        getAllLogisticsInfoInOrder();
        getOrderInfoInOrder();
        fetchOrderInfo();
      })
      .catch(resp => {
        ElMessage.error("订单详情获取错误")
      })
});

const getUserInfoInOrder = () => {
  // 获取用户信息并更新 OrderState 对象
  getUserInfo()
      .then(userInfoResponse => {
        OrderState.value.userID = userInfoResponse.data.userId;
        OrderState.value.username = userInfoResponse.data.username;
        OrderState.value.phoneNumber = userInfoResponse.data.phoneNumber;

        // 获取物流信息
        return getLogisticsInfo({ logisticsId: allResponse.value.logisticID });
      })
      .then(logisticsResponse => {
        OrderState.value.shipAddress = logisticsResponse.data.shipAddress;
        OrderState.value.pickAddress = logisticsResponse.data.pickAddress;
        OrderState.value.company = logisticsResponse.data.company;
      })
      .catch(error => {
        console.error('Error fetching logistics information:', error);
      });
}

const getAllLogisticsInfoInOrder = () => {
  getAllLogisticsInfo({
    logisticsId: allResponse.value.logisticID
  })
      .then(resp => {
        const logisticsData = resp.data;

        // 遍历后端返回的物流信息数组
        logisticsData.forEach(detail => {
          const content = `已到达【${detail.arrivePlace}】`;
          LogisticsInfo.push({
            content: content,
            timestamp: detail.arriveTime,
            type: 'primary',
            hollow: true,
          });
        });
      })
      .catch(err => {
        console.log('获取物流信息错误：', err);
      });

}

const getOrderInfoInOrder = () => {
  getOrderInfo({orderId : orderNumber})
      .then(response => {
        //   orderInfo.value = {
        //     goodsTotalPrice: response.data.goodsTotalPrice,
        //     discount: response.data.discount,
        //     shippingCost: response.data.shippingCost,
        // totalPrice: response.data.Money,

        //   };
        orderInfo.value.goodsTotalPrice = response.data.money;
        // todo: 优惠券怎么获得，减去这个值
        orderInfo.value.totalPrice = orderInfo.value.goodsTotalPrice - orderInfo.value.discount;
      })
      .catch(error => {
        console.error('Error fetching order information:', error);
      });

}

const fetchOrderInfo = () => {
    const picks = allResponse.value.picks;

    orderTableData.value = picks.map(item => ({
      goodsID: item.pickId,
      unitprice: item.price,
      number: item.number,
      total: item.price*item.number,
      payment: item.price*item.number,
      goods: {
        image: base64ToUrl(item.image, item.imageType),
        description: item.description,
      },
    }));

  console.log(orderTableData.value[0].goods.image)
};


const formatCurrency = (row, column, cellValue) => {
  return '￥' + cellValue;
}

const formatQuantity = (row, column, cellValue) => {
  return 'x' + cellValue;
}

</script>

<style scoped>
.orderDetailMainView {
    background-color: #fff;
    margin-top: 10px;
}
.returnButton {
    margin-left: 55px;
    text-decoration: none; /* 去掉下划线 */
}
.row-1-text {
    display: flex;
    align-items: center;
    margin-left: 15px;
}
.row-2-card {
    align-self: 100px;
}
.row-3-card {
    display: flex;
    align-self: 100px;
}

.logistics-card {
  margin-top: 30px;
  margin-left: 70px;
  width: 630px;
}
.logisticsText {
  margin-top: 10px;
  margin-left: 35px;
  margin-bottom: 30px;
}
.logistics-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.not-shipped-text {
  margin-top: 50px;
  font-style: italic;
  color: #888;
  text-align: center;
  font-size: 20px;
}

.orderState-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orderState-card{
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 80px;
}
.orderState-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 订单支付信息卡片 */
.row-4-card {
  margin-top: 30px;
  width: 1000px;
  margin-left: 30px;
  margin-right: 80px;
}
.paymentText {
  margin-top: 10px;
  margin-left: 35px;
  margin-bottom: 30px;
}
.margin-top{
  margin-top: 50px;
  margin-left: 40px;
}
.row-4-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.row-3-card-last {
  margin-top: 30px;
  margin-left: 70px;
  margin-right: 80px;
  width: 1300px;
}
.row-3-card-last:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.img-container{
  display: flex;
  justify-content: center;  
  align-items: center;  
  overflow: hidden;  
}

</style>