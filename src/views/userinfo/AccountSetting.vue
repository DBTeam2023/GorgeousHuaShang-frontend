<template>
    <el-main class="account-container">
        <!-- 修改密码 -->
        <div style="margin-bottom:50px;padding:0 10%" class="account-bg" >
            <div class="gilding-text">修改密码</div>
            <el-form 
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="pwdform"
                color="white"
                >   
                    <el-form-item label="输入旧密码" prop="oldpass">
                        <el-input v-model="ruleForm.oldpass" :type="showOldPass ? 'password' : 'text'" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item label="输入新密码" prop="pass">
                        <el-input v-model="ruleForm.pass" :type="showNewPass ? 'password' : 'text'" autocomplete="off" show-password/>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkPass">
                        <el-input
                        v-model="ruleForm.checkPass"
                        :type="showNewPass ? 'password' : 'text'"
                        autocomplete="off" show-password
                        />
                    </el-form-item>
                    <el-form-item >
                        <el-row class="button-row">
                            <el-col :span="10" class="center-button">
                                <el-button color="#ffcc00" @click="submitForm(ruleFormRef)">保存</el-button>
                            </el-col>
                            <el-col :span="10" class="center-button">
                                <el-button type="info" @click="resetForm(ruleFormRef)">重置</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
            </el-form>
        </div>
        <!-- 注销账号 -->
        <!-- <div class="account-bg" style="padding:0 10%">
            <div class="gilding-text">注销账号</div>
            <h4>注销后，您将放弃以下权益：</h4>
            <p>1.您的所有交易记录将被清空，请确保所有交易已完结且无纠纷，账号注销后因历史交易可能产生的
                退换货、维权相关的资金退回等权益将视作自动放弃。
            </p>
            <p>
                2.您的身份信息、账号信息等权益将被清空且无法恢复。
            </p>
            <h4>注销前，我们将进行以下验证：</h4>
            <p>1.账号近期不存在交易</p>
            <p>2.账号相关财产权益已清结</p>
            <p>3.账号下不存在尚未注销的店铺</p>
            <p>4.账号不存在未完结的服务</p>
            <el-form :model="logoutForm" class="center-button">
                <el-button type="danger" @click="handlelogout" style="text-align: center;">注销账号</el-button>
            </el-form>
        </div> -->
    </el-main>

</template>
  
  <script setup>
    import { reactive, ref, onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import { updateUserInfo, getUserInfo } from '@/api/userinfo';
    import router from '@/router';

    const oldpassword = ref();
    const updateForm = ref();

    const showOldPass = ref(false);
    const showNewPass = ref(false);


    const getInfo =() =>{
        getUserInfo()
        .then(resp =>{
            oldpassword.value = resp.data.password;
            updateForm.value = resp.data;
            console.log(updateForm.value);
        })
        .catch(err =>{
            console.log('获取旧密码失败');
        })
    }
    onMounted(()=>{
        getInfo();
    })


    // 旧密码输入规则
    const validateOldpass = (rule, value,callback) => {
        if(value === '')
            callback(new Error('请输入旧密码'))
        else if( value !== oldpassword.value){
            callback(new Error('密码输入错误'));
        }
        else{
            callback();
        }
    }

    // 新密码输入规则
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'))
        } else {
            if (ruleForm.value.checkPass !== '') {
                if (!ruleFormRef.value) return
                ruleFormRef.value.validateField('checkPass', () => null)
            }
            callback();
        }
    }

    // 二次新密码输入规则
    const validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'))
        } else if (value !== ruleForm.value.pass) {
            callback(new Error("两次输入的密码不一致!"))
        } else {
            callback();
        }
    }

    // 数据：用户两次输入的密码
    const ruleFormRef = ref() //对表单的引用
    const ruleForm = ref({
        oldpass:'',
        pass: '',
        checkPass: ''
    })

    // 数据：密码输入规则
    const rules = reactive({
        oldpass:[{ validator: validateOldpass,trigger:'change' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
    })

    // 提交表单
    const submitForm = (formEl) => {
        if (!formEl) return;
        formEl.validate((valid) => {
            if (valid) {
                // 调用后端api修改信息
                updateForm.value.password=ruleForm.value.pass;
                updateUserInfo(updateForm.value)
                    .then(response=>{
                        ElMessage({
                            message: '修改成功！',
                            type: 'success',
                        })
                        if (!formEl) return
                            formEl.resetFields();//清空
                        getInfo();//再获取一次用户信息
                    })
                    .catch(err=>{
                        ElMessage({
                            message: '密码修改失败，请重试！',
                            type: 'error',
                        })
                    })
            } else {
                ElMessage.error('请检查输入是否正确')
                return false;
            }
        })
    }

    // 表单重置
    const resetForm = (formEl) => {
        if (!formEl) return
            formEl.resetFields()
    }

    // 注销账户
    const handlelogout = (el) => {
        //调用后端api注销账户

        //退出到登录界面
        router.push('/login/');
    }

</script>

<style lang="scss" scoped>

    h2,h3{
        text-align: center;
    }

    // 鎏金字体
    .gilding-text{
        font-size: 20px;
        font-weight: bold;
        text-align:center;
        margin:20px auto;
        background: linear-gradient(45deg, #ffcc00, #ffd700);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }

    .account-container{
        padding:0 10% 5% 10%;
    }

    .account-bg{
        background-image: url('@/assets/buyerCenter/account01.jpg');
        background-position: center center;
        background-repeat: no-repeat;  
        background-size: cover;
        box-shadow: 20px 20px 23px rgb(0 0 0 / 83%);
        border-radius:20px;
        overflow:hidden;
        color:white;
    }

    .center-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .button-row{
        width:100%;
        margin-top:20px;
    }

</style>

<style>
    .account-bg .el-form .el-form-item__label{
        color:white;
    }
</style>