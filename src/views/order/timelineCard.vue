<template>
    <el-card class="timeline-card"><!--订单时间线-->
      <div>
        <h3 class="timelineText">订单状态详情</h3>
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
const activities = [
  {
    content: '商品已下单',
    timestamp: '2023-07-02 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    content: '仓库已接单',
    timestamp: '2023-07-02 20:46',
    // color: '#0bbd87',
  },
  {
    content: '已出库',
    timestamp: '2023-07-03 08:40',
    size: 'large',
  },
  {
    content: '已发货',
    timestamp: '2023-07-03 08:40',
  },
  {
    content: '已揽件',
    timestamp: '2023-07-03 09:43',
  },
  {
    content: '【嘉兴市】快件离开【嘉兴】已发往【上海浦西转运中心】',
    timestamp: '2023-07-03 17:39',
    type: 'primary',
    hollow: true,
  },
]

</script>

<style scoped>
.timeline-card {
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 60px;
  width: 610px;
}
.timelineText {
    margin-top: 5px;
    margin-left: 35px;
    margin-bottom: 30px;
}
</style>