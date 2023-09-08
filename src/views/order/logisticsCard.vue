<template>
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
</template>

<script setup>
// import { MoreFilled } from '@element-plus/icons-vue'
import {reactive, onMounted} from 'vue'
import { getAllLogisticsInfo } from '@/api/logistics'; // 从API模块中导入物流信息的函数
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由实例
const LogisticsInfo = reactive([]); // 初始化为空数组
const orderNumber = route.params.orderID;

onMounted(() => {

  // getAllLogisticsInfo({ logisticsId: "341b25e2-8722-4113-82e1-5312d10663ea" })
  getAllLogisticsInfo({logisticsId:orderNumber})
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
});


</script>

<style scoped>
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
</style>
