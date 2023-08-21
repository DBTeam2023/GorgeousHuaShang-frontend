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
                        <!-- 全部余额 -->
                        <h4>全部余额：{{walletForm.balance}}</h4>
                        <!-- 钱包充值对话框dialog -->
                        <div>
                            <el-button type="primary" :disabled="isButtonDisabled" @click="dialogRechargeVisible=true">余额充值</el-button>
                            <el-dialog v-model="dialogRechargeVisible" title="充值">
                                <el-form :model="updateForm">
                                <el-form-item label="请输入充值金额" :label-width="formLabelWidth">
                                    <el-input v-model="updateForm.amount" autocomplete="off" />
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
                        <!-- 钱包状态 -->
                        <h4>钱包状态：
                            <template v-if="walletForm.status === true">
                                活跃
                            </template>
                            <template v-else-if="walletForm.status === false">
                                冻结
                            </template>
                        </h4> 
                        <!-- 钱包状态修改select选择框 -->
                        <div>
                            <el-button type="primary" @click="EditStatus">修改状态</el-button>
                            <el-dialog v-model="dialogEditVisible" title="修改钱包状态">
                                <el-form :model="updateForm">
                                <el-form-item>
                                    <el-radio-group v-model="walletForm.status" @change="handleStatusChange">
                                        <el-radio :label='true' >活跃</el-radio>
                                        <el-radio :label='false' >冻结</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="handleCancel">取消</el-button>
                                        <el-button type="primary" @click="handleEdit">确定</el-button>
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
    import { computed,onMounted } from 'vue';
    import { ElMessage } from 'element-plus' //消息框提示

    import { getWallet, updateWalletStatus, rechargeWallet,addWallet} from '@/api/mywallet'

    const walletExit=ref(true);//是否开通钱包功能标志

    // 钱包：从后端获取的数据
    const walletForm=reactive({
        balance:122.4,
        status:true,
    })

    // walletForm的对象副本
    const form=reactive({
        balance:122.4,
        status:true,
    })

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

    
    const dialogEditVisible = ref(false) // 状态修改对话框可见
    const dialogRechargeVisible = ref(false) //余额充值对话框可见
    const formLabelWidth = '140px'

    // 充值的金额
    const updateForm=reactive({
        amount:0,
    });

    // 为用户添加钱包
    const handleAdd = () => {

        addWallet({
            token:"Bearer " + localStorage.getItem("jwtToken"),        
            balance:0,
        })
        .then(resp=>{
            walletForm.balance=resp.data.balance;
            walletForm.status=resp.data.status;
            walletExit=true;
            ElMessage({
                message:'开通钱包功能成功！',
                type:'success',
            })
        })
        .catch(err=>{
            ElMessage({
                message:'开通钱包功能失败！',
                type:'error',
            })
        })
    }


    // 获取用户钱包信息
    getWallet({
        token:"Bearer " + localStorage.getItem("jwtToken"),        
    })
    .then(resp => {
        walletForm.balance=resp.data.balance;
        walletForm.status=resp.data.status;
        form.value.balance=walletForm.balance;
        form.value.status=walletForm.status;
    })
    .catch(resp => {
        // 若用户不存在钱包
        if(resp.code === 404){
            //新建钱包
            console.log('用户钱包不存在，新建钱包！')
            addWallet({
            token:"Bearer " + localStorage.getItem("jwtToken"),        
            balance:0,
        })
        }
        else{
            ElMessage({
                    message: '获取钱包信息错误，请重试！',
                    type: 'error',
                })
        }

    });


    // 钩子函数：
    // onMounted(() => {   
    //     getWallet({
    //     token:"Bearer " + localStorage.getItem("jwtToken"),        
    // });
 
    // })


    // 充值处理函数
    const handleRecharge = () => {
    
        // 判断输入金额是否正确
        if (updateForm.amount&&(updateForm.amount+walletForm.balance < 99999999.99)) {
            // api:充值金额recharge，重新获取walletForm的值并显示
            rechargeWallet({
                token:"Bearer " + localStorage.getItem("jwtToken"), 
                amount:updateForm.amount,
            })
            .then(resp=>{
                walletForm.balance=resp.data.balance;
                walletForm.status=resp.data.status;
                form.balance=walletForm.balance;
                form.status=walletForm.status;
                console.log('充值成功！');
                            //充值成功提示
                ElMessage({
                    message: '充值成功！',
                    type: 'success',
                })
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
        else{
            ElMessage({
                message: '充值金额不能超过999999999.99',
                type: 'error',
            })
        }
        updateForm.amount = 0;
        dialogRechargeVisible.value = false;
    };


    //钱包状态处理函数1：按钮-修改状态
    const EditStatus = () => {
        console.log('edit');
        dialogEditVisible.value=true; // 对话框设置为可见

        //暂存原始数据
        form.status=walletForm.status;
        form.balance=walletForm.balance;

    }


    //钱包状态处理函数2：按钮-保存修改状态
    const handleEdit = () => {

        //后端api：修改钱包状态
        updateWalletStatus({
                token:"Bearer " + localStorage.getItem("jwtToken"), 
                status:walletForm.status,
            })
            .then(resp=>{
                walletForm.balance=resp.data.balance;
                walletForm.status=resp.data.status;
                form.status=resp.data.status;
                form.balance=resp.data.balance;

                            //充值成功提示
                ElMessage({
                    message: '修改成功！',
                    type: 'success',
                })
            })
            .catch(err=>{
                //恢复为原数据
                walletForm.status=form.status;
                walletForm.balance=form.balance;
                ElMessage({
                    message: '修改失败,请重试！',
                    type: 'error',
                })
            })

        dialogEditVisible.value = false; 
    }

    // 钱包状态处理函数3：按钮-取消修改状态
    const handleCancel=()=>{
        console.log('cancel');

        // 还原为未修改前的数据
        walletForm.status = form.status;
        walletForm.balance = form.balance;

        // 对话框不可见
        dialogEditVisible.value = false;
    }


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