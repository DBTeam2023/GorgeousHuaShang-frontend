<template>
    <!-- 可用余额 -->
    <el-container>
        <el-main class="wallet-container" v-loading="isload">
            <!-- 余额 -->
            <el-row class="wallet-row" :gutter="60">
                <el-col :span="24" style="justify-content: center; align-items: center;">
                        <div :class="statusColor">可用余额</div>
                        <div class="balance text-bottom-shadow" :class="statusColor">¥{{walletForm.balance}}</div>
                </el-col>
            </el-row>

            <!-- 钱包状态 -->
            <el-row class="status-row">
                <div :class="statusColor">钱包状态：
                    <template v-if="walletForm.status === true">
                        活跃
                    </template>
                    <template v-else-if="walletForm.status === false">
                        冻结
                    </template>
                </div> 
            </el-row>

            <!-- 钱包充值 -->
            <el-row >
                <el-col :span="24"  style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                    <!-- 钱包充值对话框dialog -->
                    <div>
                        <el-button class="btn" round :color="btnColor" :disabled="isButtonDisabled" @click="dialogRechargeVisible=true">余额充值</el-button>
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

        </el-main>
    </el-container>


</template>


  
<script setup>
    import {onMounted, reactive,ref} from 'vue'
    import { computed } from 'vue';
    import { ElMessage } from 'element-plus' //消息框提示

    import { getWallet, rechargeWallet} from '@/api/mywallet'

    const isload = ref(false);

    // 钱包：从后端获取的数据
    const walletForm=reactive({
        balance:0,
        status:true,
    })

    //创建表单引用
    const formRef = ref(null);

    // 余额颜色
    const statusColors = ref({
        true: 'gilding-text',
        false: 'gray-text',
    });

    //按钮颜色
    const btnColors = ref({
        true: '#ffd700',
        false: 'gray',
    })


    // 根据钱包状态显示对应余额颜色
    const statusColor = computed(() => {
        return statusColors.value[walletForm.status];
    });

    // 根据钱包状态显示对应余额颜色
    const btnColor = computed(() => {
        return btnColors.value[walletForm.status];
    });

    // 根据钱包状态计算按钮是否应该被禁用
    const isButtonDisabled = computed(() => {
        return walletForm.status === false;
    });

    
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
    const getMyWallet = () =>{
        isload.value = true;
        getWallet()
        .then(resp => {
            walletForm.balance=resp.data.balance;
            walletForm.status=resp.data.status;
        })
        .catch(error => {
            console.log('获取失败！');
            console.log(error);
            ElMessage({
                        message: '获取钱包信息错误，请刷新重试！',
                        type: 'info',
                    })
        })
        .finally(()=>{
            isload.value = false;
        });
    }

    onMounted(()=>{
        getMyWallet();
    })

    // 充值处理函数
    const handleRecharge = () => {
        console.log(updateForm.amount);

        formRef.value.validate((valid) => {
            if(valid){
                rechargeWallet({
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

    .wallet-container{
        padding:0 15% 5% 15%;
        margin: 0 12% 5% 12%;
        background-image: url('@/assets/buyerCenter/wallet01.jpg');
        background-position: center center;
        background-repeat: no-repeat;  
        background-size: cover;
        box-shadow: 20px 20px 23px rgb(0 0 0 / 83%);
        border-radius:20px;
        overflow:hidden;
    }

    // 鎏金字体
    .gilding-text{
        font-size: 20px;
        font-weight: 500;
        text-align:center;
        margin:20px auto;
        background: linear-gradient(45deg, #ffcc00, #ffd700);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    //无效字体
    .gray-text{
        font-size: 2vw;
        font-weight: 500;
        text-align:center;
        margin:20px auto;
        color:gray;
    }

    .status-row{
        margin-top:6vw;
    }

    .balance{
        font-size: 8vw;
        font-weight: bold;
        margin:20px auto;
        text-align:center;
    }

    //字体下方阴影
    .text-bottom-shadow{
        -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent 25%, rgb(255,255,255,0.3));
    }

    .dialog-footer button:first-child {
       margin-right: 10px;
    }

    // 按钮
    .btn{
        margin-top:1vw;
        width:10vw;
        min-width:80px;
        height:3vw;
        min-height:30px;
        font-size: 1vw;
        font-weight: bold;
    }

    .btn:hover{
        color:white;
    }


</style>