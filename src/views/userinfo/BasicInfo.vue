
<template>
    <div class="all-container">
        <h2>个人信息</h2>
        <el-menu
                :default-active="selectedMenu"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
            >
                <el-menu-item index="1">基本信息</el-menu-item>
                <el-menu-item index="2">头像信息</el-menu-item>
        </el-menu>

        <!-- 显示基本信息卡片 -->
        <div class="card-container" v-if="selectedMenu==='1'">
            <el-card class="card">
                <div class="form-container">
                    <el-form :model="InfoForm" :rules="InfoRules" ref="formRef" label-width="200px">
                        <el-form-item label="昵称">
                            <el-input class="input"  v-model="InfoForm.name" :disabled="isUpdate"
                                maxlenghth="100" show-word-limit/>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input class="input"  v-model.number="InfoForm.age" :disabled="isUpdate"/>
                        </el-form-item>
                        <el-form-item label="身高（cm）" prop="height">
                            <el-input class="input" v-model.number="InfoForm.height" :disabled="isUpdate"/>
                        </el-form-item>
                        <el-form-item label="体重（kg）" prop="weight">
                            <el-input class="input" v-model.number="InfoForm.weight" :disabled="isUpdate"/>
                        </el-form-item>
                        <el-form-item label="性别" >
                            <el-radio-group v-model="InfoForm.gender" :disabled="isUpdate">
                                <el-radio label="男" />
                                <el-radio label="女" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input class="input"  :disabled="isUpdate" v-model="InfoForm.address" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
                                maxlength="100" show-word-limit/>
                        </el-form-item>
                        <el-form-item label="收货人姓名">
                            <el-input class="input" v-model="InfoForm.name" :disabled="isUpdate"
                                maxlenghth="100" show-word-limit/>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input class="input" v-model="InfoForm.phonenumber" :disabled="isUpdate"/>
                        </el-form-item>
                        <!-- 编辑个人信息 -->
                        <el-form-item>
                            <div class="info-operation">
                                <el-button type="primary" @click="onEdit" :disabled="isEdit">编辑</el-button>
                                <el-button type="success" @click="onSubmit" :disabled="isUpdate">保存</el-button>
                                <el-button @click="onCancel" :disabled="isUpdate">取消</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <!-- 显示头像信息卡片 -->
        <div v-else-if="selectedMenu ==='2'">
            <ImgUpload />
        </div>
    </div>
</template>

<script setup>
    import {reactive,ref, onMounted,computed,toRefs} from 'vue'
    import { ElMessage } from 'element-plus' //消息框提示


    import ImgUpload from '@/views/user_info/ImgUpload.vue';
    import { getUserInfo, updateUserInfo } from '@/api/userinfo';

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

    // update请求参数
    const updateForm=ref({
        "userId": '',
        "loginTime":'',
        "password": '',
        "nickName": '',
        "type": '',
        "buyerInfo": {
            "userId": '',
            "address": '',
            "age": '',
            "gender": '',
            "height": '',
            "weight": '',
            "isVip": '',
        },
        "sellerInfo":'',
    })

    // 年龄验证条件
    const validateAge = (rule, value, callback) => {
        value=InfoForm.age;
        if (!value) {
            return callback(new Error('请输入年龄'));
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
        if (!value) {
            return callback(new Error('请输入身高'));
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
        if (!value) {
            return callback(new Error('请输入体重'));
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
    age: [
        { validator: validateAge, trigger: 'change' },
    ],
    height:[
        { validator: validateHeight, trigger: 'change' },
    ],
    weight:[
        { validator: validateWeight, trigger: 'change' },
    ],
    });

    // 创建表单引用
    const formRef = ref(null); 


    // 获取用户信息
    getUserInfo()
    .then(resp => {
        updateForm.value=resp.data;
        InfoForm.age=resp.data.age;
        InfoForm.name = resp.data.nickName;
        InfoForm.age = resp.data.buyerInfo.age;
        InfoForm.height = resp.data.buyerInfo.height;
        InfoForm.weight = resp.data.buyerInfo.weight;
        if(resp.data.buyerInfo.gender===true)
            InfoForm.gender = '男';
        else if(resp.data.buyerInfo.gender===false)
            InfoForm.gender = '女';
        InfoForm.address = resp.data.buyerInfo.address;
        InfoForm.isVip = resp.data.buyerInfo.isVip;
    })
    .catch(resp => {
        console.log(resp);
        console.log("获取用户信息错误");
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
                updateForm.value.buyerInfo.age = InfoForm.age;
                updateForm.value.buyerInfo.height = InfoForm.height;
                updateForm.value.buyerInfo.weight = InfoForm.weight;
                if(InfoForm.gender === '男')
                    updateForm.value.buyerInfo.gender = true;
                else if(InfoForm.gender === '女')
                    updateForm.value.buyerInfo.gender=false;
                updateForm.value.buyerInfo.address = InfoForm.address;
                updateForm.value.buyerInfo.isVip = InfoForm.isVip;

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

                        InfoForm.age = updateForm.value.buyerInfo.age;
                        InfoForm.height =  updateForm.value.buyerInfo.height;
                        InfoForm.weight =  updateForm.value.buyerInfo.weight;
                        if(updateForm.value.buyerInfo.gender === true)
                            InfoForm.gender = '男';
                        else if(updateForm.value.buyerInfo.gender === false)
                            InfoForm.gender= '女';      
                        InfoForm.address =  updateForm.value.buyerInfo.address;
                        InfoForm.isVip =  updateForm.value.buyerInfo.isVip;
                        console.log(err);
                    });
                // getUserInfo();//获取更新后的数据（注释掉就不会出错了）
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

    // 信息菜单栏被选中的菜单项
    const selectedMenu=ref('1')
    const handleSelect=(menuItem)=>{
        selectedMenu.value=menuItem;
    }

    // 取消按钮
    function onCancel(){
        console.log('cancel!');
        // 禁用按钮
        isButtonDisabled.value='false';
        // 恢复原始数据
        InfoForm.name = updateForm.value.nickName;
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


</script>


<style lang="scss" scoped>

    .all-container{
        margin-left:15%;
        width:900px;
    }
  
    .card-container{
        display: flex;
        justify-content: center;
        align-items:center;
        width:100%;
    }



    h2{
        text-align: center;
    }
    .card{
        // margin-top:3em;
        // margin-left:10em;
        width:100%;
    }
    .input{
        width:500px;
    }

    .form-container{
        margin-top:5%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

    .info-operation{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:50%;
        margin-left:20%;
    }

    // .alert{
    //     margin-left:200px;
    //     margin-top:-10px;
    //     margin-bottom:10px;
    //     width:500px;
    // }

</style>

