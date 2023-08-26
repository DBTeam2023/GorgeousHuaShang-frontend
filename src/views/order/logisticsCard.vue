<template>
    <el-card class="logistics-card"><!--物流时间线-->
        <div>
            <h3 class="logisticsText">物流信息</h3>
        </div>
        <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in LogisticsInfo"
            :key="index"
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
import { MoreFilled } from '@element-plus/icons-vue'
import {reactive, onMounted} from 'vue'
import { getAllLogisticsInfo } from '@/api/logistics'; // 从API模块中导入物流信息的函数
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取路由实例
const LogisticsInfo = reactive([]); // 初始化为空数组

// const fetchLogisticsInfo = () => {
//   const orderNumber = route.params.orderID;
//   getLogisticsInfo({logisticsId:"5df54e19-cf5b-4e7e-ae0c-5955238cd77f"})
//   // getLogisticsInfo({logisticsId:orderNumber})
//     .then(resp => {
//       const data = resp.data.data;
//       const details = data.details;

//       // 将物流时间线信息添加到数组中
//       details.forEach(detail => {
//         LogisticsInfo.push({
//           content: detail.arrivePlace,
//           timestamp: detail.arriveTime,
//           color: 'primary', 
//           hollow: false, // 时间线项空心
//         });
//       });
//     })
//     .catch(err => {
//       console.log('获取物流信息错误：', err);
//     });
// };
// onMounted(() => {
//   fetchLogisticsInfo(); 
// });


onMounted(() => {
  const orderNumber = route.params.orderID;
  getAllLogisticsInfo({ logisticsId: "5df54e19-cf5b-4e7e-ae0c-5955238cd77f" })
  // getAllLogisticsInfo({logisticsId:orderNumber})
    .then(resp => {
      const logisticsData = resp.data.data;

      // 遍历后端返回的物流信息数组
      logisticsData.forEach(detail => {
        LogisticsInfo.push({
          content: detail.arrivePlace,
          timestamp: detail.arriveTime,
          color: 'primary',
          hollow: false,
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