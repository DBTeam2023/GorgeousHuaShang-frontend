
<template>
        <el-main class="main">
            <!-- 头像上传框 -->
            <!-- <div class="info-bg">
                <div class="gilding-text">修改头像</div>
                <AvatarUpload />
            </div> -->
            <!-- 显示基本信息卡片 -->
            <div class="info-bg">
                <div class="gilding-text">个人信息</div>
                <el-form class="form" :model="InfoForm" :rules="InfoRules" ref="formRef" label-width="25%">
                    <el-form-item label="昵称" prop="name">
                        <el-input class="input"  v-model="InfoForm.name" :disabled="isUpdate" placeholder="请输入昵称"
                            maxlength="25" show-word-limit/>
                    </el-form-item>
                    <el-form-item v-if="role === 'buyer'" label="年龄" prop="age" >
                        <el-input class="input"  v-model.number="InfoForm.age" :disabled="isUpdate" placeholder="请输入年龄"/>
                    </el-form-item>
                    <el-form-item v-if="role === 'buyer'" label="身高（cm）" prop="height">
                        <el-input class="input" v-model.number="InfoForm.height" :disabled="isUpdate" placeholder="请输入身高"/>
                    </el-form-item>
                    <el-form-item v-if="role === 'buyer'" label="体重（kg）" prop="weight">
                        <el-input class="input" v-model.number="InfoForm.weight" :disabled="isUpdate" placeholder="请输入体重"/>
                    </el-form-item>
                    <el-form-item v-if="role === 'buyer'" label="性别" >
                        <el-radio-group v-model="InfoForm.gender" :disabled="isUpdate">
                            <el-radio label="男" />
                            <el-radio label="女" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input class="input"  :disabled="isUpdate" v-model="InfoForm.address" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
                            maxlength="100" show-word-limit/>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="tel" >
                        <el-input class="input" v-model="InfoForm.phonenumber" :disabled="isUpdate" placeholder="请输入11位合法手机号码"/>
                    </el-form-item>
                    <!-- 编辑个人信息 -->
                    <el-form-item>
                        <el-row class="button-row">
                            <el-col :span="8" class="center-container">
                                <el-button color="#ffcc00" @click="onEdit" :disabled="isEdit" class="btn-edit">编辑</el-button>
                            </el-col>
                            <el-col :span="8" class="center-container">
                                <el-button type="success" @click="onSubmit" :disabled="isUpdate">保存</el-button>                                        
                            </el-col>
                            <el-col :span="8" class="center-container">
                                <el-button color="graniso" @click="onCancel" :disabled="isUpdate">取消</el-button>                                    
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
</template>

<script setup>
    import {reactive,ref, onMounted,computed,toRefs} from 'vue'
    import { ElMessage } from 'element-plus' //消息框提示
    import { getUserInfo, updateUserInfo } from '@/api/userinfo';
    import store from '@/store';
    // import AvatarUpload from '@/views/userinfo/AvatarUpload.vue';

    const role = store.state.user.role;

    //用户输入的个人信息表
    const InfoForm=reactive({
        name:'',
        age:'',
        height:'',
        weight:'',
        gender:'',
        address:'',
        phonenumber:'',
        isVip:'',
    })

    //updata请求参数
    const updateForm = ref();

    // // 昵称验证条件
    // const validateName = (rule, value, callback) => {
    //     value=InfoForm.name;
    //     if(!value){
    //         callback(new Error('昵称不能为空'));
    //     }
    //     else{
    //         callback();
    //     }
    // }

    // 电话验证条件
    const validateTel = (rule, value, callback) => {
        const phoneNum = InfoForm.phonenumber;
        //正则验证是否为130/150/180开头的11位数字（手机号码不一定存在）
        // 后期可以引入电话号码验证 https://github.com/google/libphonenumber
        const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (reg.test(phoneNum)){
            callback();
        }
        else{
            callback(new Error('请输入合法11位手机号码'));
        }
    }

    // 年龄验证条件
    const validateAge = (rule, value, callback) => {
        value=InfoForm.age;
        if(value === null){
            callback();
        }
        else if (!value) {
            // return callback(new Error('请输入年龄'));
            return callback();
        }
        else if (!Number.isInteger(value)) {
            callback(new Error('请输入数字'))
            } else {
            if (value < 0 || value > 200) {
                callback(new Error('年龄必须在0~200之间'))
            } else {
                callback()
            }
        }

    };

    // 身高验证条件
    const validateHeight=(rule,value,callback)=>{
        value=InfoForm.height;
        if(value === null)
            return callback();
        else if (!value) {
            // return callback(new Error('请输入身高'));
            return callback();
        }
        else if (!Number.isInteger(value)) {
            callback(new Error('请输入数字'))
            } else {
            if (value < 0 || value > 300) {
                callback(new Error('身高必须在0~300之间'))
            } else {
                callback()
            }
        }
    }

    // 体重验证条件
    const validateWeight=(rule,value,callback)=>{
        value=InfoForm.weight;
        if (value === null)
            return callback();
        else if (!value) {
            // return callback(new Error('请输入体重'));
            return callback();
        }
        else if (!Number.isInteger(value)) {
            callback(new Error('请输入数字'))
            } else {
            if (value < 0 || value > 1000) {
                callback(new Error('体重必须在0~1000之间'))
            } else {
                callback()
            }
        }
    }

    // 个人信息验证规则
    const InfoRules = reactive({
    name:[
        {required:true, message: '昵称不能为空',trigger: 'blur'},
    ],
    age: [
        { validator: validateAge, trigger: 'blur' },
    ],
    height:[
        { validator: validateHeight, trigger: 'blur' },
    ],
    weight:[
        { validator: validateWeight, trigger: 'blur' },
    ],
    tel:[
        {required:true,message:'手机号码不能为空',validator: validateTel, trigger: 'blur'},
    ],
    address:[
        {required:true, message: '地址不能为空',trigger:'blur'}
    ]
    });

    // 创建表单引用
    const formRef = ref(null); 

    // 获取用户信息
    getUserInfo()
    .then(resp => {
        updateForm.value=resp.data;
        // 买家卖家共有数据
        InfoForm.name = resp.data.nickName;
        InfoForm.phonenumber = resp.data.phoneNumber;
        if(role === 'buyer'){
            InfoForm.age=resp.data.buyerInfo.age;
            InfoForm.height = resp.data.buyerInfo.height;
            InfoForm.weight = resp.data.buyerInfo.weight;
            if(resp.data.buyerInfo.gender===true)
                InfoForm.gender = '男';
            else if(resp.data.buyerInfo.gender===false)
                InfoForm.gender = '女';
            InfoForm.address = resp.data.buyerInfo.address;
            InfoForm.isVip = resp.data.buyerInfo.isVip;
        }
        else if(role === 'seller'){
            InfoForm.address = resp.data.sellerInfo.address;
        }
    })
    .catch(resp => {
        ElMessage.message('获取用户信息失败');
    });

    // 钩子函数：
    onMounted(() => {   
        getUserInfo();
    })

    const isButtonDisabled=ref('false'); //按钮禁用标志

    // 编辑按钮是否禁用
    const isEdit = computed(() => {
        return isButtonDisabled.value==='true';
    });

    //保存、取消按钮是否禁用(与编辑按钮相反)
    const isUpdate=computed(()=>{
        return isButtonDisabled.value==='false';
    })

    // 按下编辑按钮后立即禁用
    function onEdit(){
        if(isButtonDisabled.value==='false')
            isButtonDisabled.value='true';
        else
            isButtonDisabled.value='false';
    }


    // 提交按钮
    function onSubmit() {
        
        console.log('submit!');
        // validateForm(); // 调用表单验证方法

        formRef.value.validate((valid) => {
            if (valid){ //表单验证成功，可以提交
                //暂存原始数据
                // 创建一个临时的响应式引用，用于暂存原始值
                const originForm = ref({});
                // 初始化 originForm 的值为 updateForm 的深拷贝
                Object.assign(originForm, JSON.parse(JSON.stringify(updateForm)));

                updateForm.value.nickName = InfoForm.name;
                updateForm.value.phoneNumber = InfoForm.phonenumber;
                if(role === "buyer"){
                    updateForm.value.buyerInfo.age = InfoForm.age;
                    updateForm.value.buyerInfo.height = InfoForm.height;
                    updateForm.value.buyerInfo.weight = InfoForm.weight;
                    if(InfoForm.gender === '男')
                        updateForm.value.buyerInfo.gender = true;
                    else if(InfoForm.gender === '女')
                        updateForm.value.buyerInfo.gender=false;
                    updateForm.value.buyerInfo.address = InfoForm.address;
                    updateForm.value.buyerInfo.isVip = InfoForm.isVip;
                }
                else if(role === "seller"){
                    updateForm.value.sellerInfo.address = InfoForm.address;
                }

                console.log('updateForm.value.', updateForm.value)
                // 提交表单
                updateUserInfo(updateForm.value)
                    .then(resp=>{
                        ElMessage({
                            message: '修改成功！',
                            type: 'success',
                        })
                        console.log(resp);
                    })
                    .catch(err=>{
                        ElMessage({
                            message: '修改失败！',
                            type: 'error',
                        })
                        // 修改失败，恢复显示编辑前的数据           
                        // 将 updateForm 的值恢复为 originForm 的深拷贝
                        Object.assign(updateForm, JSON.parse(JSON.stringify(originForm)));

                        InfoForm.phonenumber = updateForm.value.phoneNumber;
                        InfoForm.name = updateForm.value.nickName;
                        if(role === 'buyer'){
                            InfoForm.age = updateForm.value.buyerInfo.age;
                            InfoForm.height =  updateForm.value.buyerInfo.height;
                            InfoForm.weight =  updateForm.value.buyerInfo.weight;
                            if(updateForm.value.buyerInfo.gender === true)
                                InfoForm.gender = '男';
                            else if(updateForm.value.buyerInfo.gender === false)
                                InfoForm.gender= '女';      
                            InfoForm.address =  updateForm.value.buyerInfo.address;
                            InfoForm.isVip =  updateForm.value.buyerInfo.isVip;
                        }
                        else {
                            InfoForm.address = updateForm.value.sellerInfo.address;
                        }
                    });
                // 禁用按钮
                isButtonDisabled.value='false';
                }else {
                // 表单验证不通过，给出错误提示
                ElMessage({
                            message: '请检查个人信息是否符合要求！',
                            type: 'error',
                        })
                }
        });
    }

    // 取消按钮
    function onCancel(){
        console.log('cancel!');
        // 禁用按钮
        isButtonDisabled.value='false';
        // 恢复原始数据
        InfoForm.name = updateForm.value.nickName;
        InfoForm.phonenumber = updateForm.value.phoneNumber;
        if(role === 'buyer'){
            InfoForm.age = updateForm.value.buyerInfo.age;
            InfoForm.height =  updateForm.value.buyerInfo.height;
            InfoForm.weight =  updateForm.value.buyerInfo.weight;
            if(updateForm.value.buyerInfo.gender === true)
                InfoForm.gender = '男';
            else if(updateForm.value.gender === false)
                InfoForm.gender = '女';
            InfoForm.address =  updateForm.value.buyerInfo.address;
            InfoForm.isVip =  updateForm.value.buyerInfo.isVip;
        }
        else{
            InfoForm.address = updateForm.value.sellerInfo.address;
        }
    }

</script>


<style lang="scss" scoped>

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

    .center-container{
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .main{
        //上 右 下 左
        padding:0 10% 5% 10%;
    }

    .info-bg{
        background-image: url('@/assets/buyerCenter/account01.jpg');
        background-position: center center;
        background-repeat: no-repeat;  
        background-size: cover;
        box-shadow: 20px 20px 23px rgb(0 0 0 / 83%);
        border-radius:20px;
        overflow:hidden;
        color:white;
        margin-bottom:50px;
        padding:20px 0;
    }

    .input{
        width:75%;
    }

    .button-row{
        width:75%;
        margin-top:20px;
    }

    .btn-edit{
        color:white;
    }


</style>

<style>
    .info-bg .form .el-form-item__label{
        color:white;
    }
</style>

