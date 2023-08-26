<template>
    <el-card class="logistics-card"><!--物流时间线-->
        <div>
            <h3 class="logisticsText">物流信息</h3>
        </div>
        <el-timeline>
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
    </el-card>
</template>

<script setup>
// import { MoreFilled } from '@element-plus/icons-vue'
import {reactive, onMounted} from 'vue'
import { getAllLogisticsInfo } from '@/api/logistics'; // 从API模块中导入物流信息的函数
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由实例
const LogisticsInfo = reactive([]); // 初始化为空数组


onMounted(() => {
  const orderNumber = route.params.orderID;
  getAllLogisticsInfo({ logisticsId: "341b25e2-8722-4113-82e1-5312d10663ea" })
  // getAllLogisticsInfo({logisticsId:orderNumber})
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
    margin-left: 50px;
    width: 630px;
}
.logisticsText {
    margin-top: 5px;
    margin-left: 35px;
    margin-bottom: 30px;
}
</style>

<!-- <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp" 
            >
            {{ activity.content }}
            </el-timeline-item>
        </el-timeline> -->