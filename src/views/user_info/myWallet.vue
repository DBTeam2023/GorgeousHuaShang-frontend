<template>
    <h2>我的钱包</h2>
    <!-- 可用余额 -->
    <el-row class="row">
        <el-col :span="24" style="justify-content: center; align-items: center;">
            <el-card>
                <el-row class="wallet">
                    <!-- 左栏 -->
                    <el-col :span="12" style="justify-content: center; align-items: center">
                        <h3 >可用余额</h3>
                        <h2 class="balance" :style="{ color: statusColor }">{{walletForm.balance}}</h2>
                    </el-col>

                    <!-- 右栏 -->
                    <el-col :span="12"  style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                        <!-- 全部余额 -->
                        <h4>全部余额：{{walletForm.balance}}</h4>
                        <!-- 钱包充值对话框dialog -->
                        <div>
                            <el-button type="primary" :disabled="isButtonDisabled" @click="dialogFormVisible=true">余额充值</el-button>
                            <el-dialog v-model="dialogFormVisible" title="充值">
                                <el-form :model="form">
                                <el-form-item label="请输入充值金额" :label-width="formLabelWidth">
                                    <el-input v-model="form.amount" autocomplete="off" />
                                </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取消</el-button>
                                        <el-button type="primary" @click="handleRecharge">确定</el-button>
                                    </span>
                                </template>
                            </el-dialog>
                        </div>
                        <!-- 钱包状态 -->
                        <h4>钱包状态：{{walletForm.status}}</h4> 
                        <!-- 钱包状态修改select选择框 -->
                        <div>
                            <el-select v-model="walletForm.status" style="width:90px">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>


  
<script setup>
import {reactive,ref} from 'vue'
import { computed } from 'vue';
import { ElMessage } from 'element-plus' //消息框提示

// 钱包：从后端获取的数据
const walletForm=reactive({
    balance:122.4,
    status:'活跃',
})

//select框中钱包状态选项
const options = [
  {
    value: '活跃',
    label: '活跃',
  },
  {
    value: '冻结',
    label: '冻结',
  },
]

// 余额字体颜色
const statusColors = ref({
  '活跃': 'red',
  '冻结': 'gray',
});

// 根据钱包状态显示对应余额颜色
const statusColor = computed(() => {
  return statusColors.value[walletForm.status];
});
// 根据钱包状态计算按钮是否应该被禁用
const isButtonDisabled = computed(() => {
  return walletForm.status === '冻结';
});

// 余额充值
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
// 充值的金额
const form=reactive({
    amount:0,
});



// 充值处理函数
const handleRecharge = () => {
  
    // 判断输入金额是否正确
    if (form.amount&&(form.amount+walletForm.balance < 99999999.99)) {
        // api:充值金额recharge，重新获取walletForm的值并显示
        //充值成功提示
        ElMessage({
            message: '充值成功！',
            type: 'success',
        })
    }
    else{
        ElMessage({
            message: '充值金额不能超过999999999.99',
            type: 'error',
        })
    }
  form.amount = 0;
  dialogFormVisible.value = false;
};


</script>

<style lang="scss" scoped>

    h2,h3,h4{
        text-align: center;
    }
    .row{
        margin-left:8em;
        margin-right:8em;
        width:50em;
    }
    .balance{
        font-size: 50px;
    }
    .el-button--text {
        margin-right: 15px;
    }
    .el-input {
        width: 300px;
    }
    .dialog-footer button:first-child {
       margin-right: 10px;
    }

</style>