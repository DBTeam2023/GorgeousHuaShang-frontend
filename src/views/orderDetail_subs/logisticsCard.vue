<template>
    <el-card class="logistics-card"><!--物流时间线-->
        <div>
            <h3 class="logisticsText">物流信息</h3>
        </div>
        <el-timeline>
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
        </el-timeline>
    </el-card>
</template>

<script setup>
import { MoreFilled } from '@element-plus/icons-vue'
import {reactive} from 'vue'
  
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

const LogisticsInfo=reactive({
  address:'',
  timestamp:'',
})

/*
function getLogisticsInfo(){
  return request({
        url: "/api/order/logisticsDetails/",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
    })
}

const fetchLogisticsInfo = () => {
  getLogisticsInfo()
    .then(resp=> {
      
    })
    .catch(resp => {
      console.log(resp);
      console.log("获取物流信息时出现错误：");
    
    });
}

fetchLogisticsInfo()
*/

</script>

<style scoped>
.logistics-card {
    margin-top: 30px;
    margin-left: 20px;
    width: 520px;
}
.logisticsText {
    margin-top: 5px;
    margin-left: 35px;
    margin-bottom: 30px;
}
</style>

