<template>
  <div class="not-found">
    <el-result
        :status="404"
        title="404"
        sub-title="抱歉，您访问的页面不存在"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
import { ElButton, ElResult } from 'element-plus';

export default {
  components: {
    ElButton,
    ElResult,
  },
};
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88vh;
}
</style>