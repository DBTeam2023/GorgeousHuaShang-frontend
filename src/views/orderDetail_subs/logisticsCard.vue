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
// import { MoreFilled } from '@element-plus/icons-vue'
import {reactive, onMounted} from 'vue'
import { getLogisticsInfo } from '@/api/logistics'; // 从API模块中导入物流信息的函数

/*  
const activities = [
  {
    content: '【浙江省嘉兴市】',
    timestamp: '2023-07-02 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    content: '【嘉兴市】快件离开【嘉兴】已发往【上海浦西转运中心】',
    timestamp: '2023-07-03 17:39',
  },
  {
    content: '到达【上海浦西转运中心】',
    timestamp: '2023-07-03 22:13',
    type: 'primary',
    hollow: true,
  }
]
*/


const LogisticsInfo = reactive([]); // 初始化为空数组

const fetchLogisticsInfo = () => {
  getLogisticsInfo()
    .then(resp => {
      const data = resp.data.data;
      const details = data.details;

      // 将物流时间线信息添加到数组中
      details.forEach(detail => {
        LogisticsInfo.push({
          content: detail.arrivePlace,
          timestamp: detail.arriveTime,
          color: 'primary', 
          hollow: false, // 时间线项空心
        });
      });
    })
    .catch(err => {
      console.log('获取物流信息错误：', err);
    });
};
onMounted(() => {
  fetchLogisticsInfo(); 
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