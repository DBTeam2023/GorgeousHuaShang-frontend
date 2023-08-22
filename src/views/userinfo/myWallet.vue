<template>
    <h2>我的钱包</h2>
    <!-- 未开通钱包功能 -->
    <el-row class="row" v-if="walletExit === false">
        <el-col :span="24" style="justify-content: center; align-items: center;">
            <el-card>
                <el-empty description="您还没有开通钱包功能哦~">
                    <el-button type="primary" @click="handleAdd">开通钱包</el-button>
                </el-empty>
            </el-card>
        </el-col>
    </el-row>

    <!-- 可用余额 -->
    <el-row class="row" v-if="walletExit === true">
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
                        <!-- 钱包状态 -->
                        <h4>钱包状态：
                            <template v-if="walletForm.status === true">
                                活跃
                            </template>
                            <template v-else-if="walletForm.status === false">
                                冻结
                            </template>
                        </h4> 
                        <!-- 全部余额 -->
                        <h4>全部余额：{{walletForm.balance}}</h4>
                        <!-- 钱包充值对话框dialog -->
                        <div>
                            <el-button type="primary" :disabled="isButtonDisabled" @click="dialogRechargeVisible=true">余额充值</el-button>
                            <el-dialog v-model="dialogRechargeVisible" title="充值">
                                <el-form :model="updateForm" :rules="RechargeRules" ref="formRef">
                                    <el-form-item label="请输入充值金额" :label-width="formLabelWidth" prop="amount">
                                        <el-input v-model.number="updateForm.amount" autocomplete="off" />
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogRechargeVisible = false">取消</el-button>
                                        <el-button type="primary" @click="handleRecharge">确定</el-button>
                                    </span>
                                </template>
                            </el-dialog>
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

    import { getWallet, rechargeWallet} from '@/api/mywallet'

    const walletExit=ref(true);//是否开通钱包功能标志

    // 钱包：从后端获取的数据
    const walletForm=reactive({
        balance:0,
        status:true,
    })

    //创建表单引用
    const formRef = ref(null);

    // 余额颜色
    const statusColors = ref({
        true: 'red',
        false: 'gray',
    });

    // 根据钱包状态显示对应余额颜色
    const statusColor = computed(() => {
        return statusColors.value[walletForm.status];
    });

    // 根据钱包状态计算按钮是否应该被禁用
    const isButtonDisabled = computed(() => {
        return walletForm.status === false;
    });

    
    // const dialogEditVisible = ref(false) // 状态修改对话框可见
    const dialogRechargeVisible = ref(false) //余额充值对话框可见
    const formLabelWidth = '140px'

    // 充值的金额
    const updateForm=reactive({
        amount:null,
    });

    // 充值金额条件
    const validateAmount = (rule,value,callback) => {
        if(!value){
            return callback(new Error('请输入充值金额(0~9999999.99)'));
        }
        else if(!Number.isInteger(value)){
            callback(new Error('请输入数字'));
        }
        else if(value <= 0){
            callback(new Error('充值金额必须大于0'));
        }
        else if(value + walletForm.balance > 99999999.99){
            callback(new Error('充值后总余额不能高于99999999.99'));
        }
        else{
            callback();
        }   	
    }

    // 充值规则
    const RechargeRules = reactive({
        amount:[{
            validator:validateAmount,
            trigger:'change',
        }]
    })

    // 获取用户钱包信息
    getWallet({
        token:"Bearer " + localStorage.getItem("jwtToken"),        
    })
    .then(resp => {
        walletForm.balance=resp.data.balance;
        walletForm.status=resp.data.status;
    })
    .catch(error => {
        console.log('获取失败！');
        console.log(error);
        ElMessage({
                    message: '获取钱包信息错误，请重试！',
                    type: 'error',
                })
    });

    // 充值处理函数
    const handleRecharge = () => {
        console.log(updateForm.amount);

        formRef.value.validate((valid) => {
            if(valid){
                rechargeWallet({
                    token:"Bearer " + localStorage.getItem("jwtToken"), 
                    amount:updateForm.amount,
                })
                .then(resp=>{
                    console.log(updateForm.amount);
                    
                    walletForm.balance=resp.data.balance;
                    walletForm.status=resp.data.status;

                    ElMessage({
                        message: '充值成功！',
                        type: 'success',
                    })

                    updateForm.amount = null;

                })
                .catch(err=>{
                    console.log('充值失败！');
                    console.log(err);
                    ElMessage({
                        message: '充值失败',
                        type: 'error',
                    })
                })
            }
            else {
                ElMessage({
                        message: '请检查输入金额是否符合要求',
                        type: 'error',
                    })
            }
        })
        dialogRechargeVisible.value = false;
    };
</script>

<style lang="scss" scoped>

    h2,h3,h4{
        text-align: center;
    }
    .row{
        margin-left:11em;
        margin-right:11em;
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