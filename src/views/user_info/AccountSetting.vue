<template>
    <h2>账号设置</h2>
    <!-- 修改密码 -->
    <el-row class="row"> 
        <el-col :span="24" class="centered-col">
            <el-card style="margin-bottom:50px">
                <h3>修改密码</h3>
                <el-form 
                    ref="ruleFormRef"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    label-width="120px"
                    class="pwdform"
                    >   
                        <el-form-item label="输入新密码" prop="pass">
                            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="checkPass">
                            <el-input
                            v-model="ruleForm.checkPass"
                            type="password"
                            autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
                            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                        </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
    <!-- 注销账号 -->
    <el-row class="row">
        <el-col :span="24" style="justify-content: center; align-items: center;">
            <el-card>
                <h3>注销账号</h3>
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
                    <el-button type="danger" @click="logout" style="text-align: center;">注销账号</el-button>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
  
  <script setup>
    import { reactive, ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { updateUserInfo } from '@/api/userinfo';


    const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
    }

    const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入的密码不一致!"))
    } else {
        callback()
    }
    }

    // 数据：用户两次输入的密码
    const ruleFormRef = ref()
    const ruleForm = reactive({
        pass: '',
        checkPass: ''
    })
    // 向数据库提交的数据
    const updateForm=ref({
        pwd:'',
    })

    // 数据：密码输入规则
    const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }]
    })

    const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            // 调用后端api修改信息
            updateForm.value.pwd=ruleForm.pass;
            updateUserInfo(updateForm)
                .then(response=>{
                    ElMessage({
                        message: '修改成功！',
                        type: 'success',
                    })
                })
                .catch(err=>{
                    ElMessage({
                        message: '密码修改失败！',
                        type: 'error',
                    })
                })


            console.log('提交!')
        } else {
            console.log('提交错误')
            return false
        }
    })
    }

    const resetForm = (formEl) => {
    if (!formEl) return
        formEl.resetFields()
    }

</script>

<style lang="scss" scoped>

    h2,h3{
        text-align: center;
    }
    .row{
        margin-left:11em;
        margin-right:11em;
        // padding-top:1em;
        // justify-content: center;
        // padding-right:3em;
        width:50em;
    }

    .cetered-col{
        display:flex;
        justify-content: center; 
        align-items:center;
    }

    .center-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

</style>