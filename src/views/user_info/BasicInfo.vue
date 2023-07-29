<script setup>
    import {reactive,ref, onMounted} from 'vue'


    import ImgUpload from '@/views/user_info/ImgUpload.vue';
    import { getUserInfo } from '@/api/userinfo';

    
    // 用户输入的个人信息表
    const InfoForm=reactive({
        name:'',
        age:'',
        height:'',
        weight:'',
        gender:'',
        address:'',
        phonenumber:'',
    })

    // 获取用户信息
    getUserInfo()
    .then(resp => {
        InfoForm.name = resp.data.nickName;
        InfoForm.age = resp.data.buyerInfo.age;
        InfoForm.height = resp.data.buyerInfo.height;
        InfoForm.weight = resp.data.buyerInfo.weight;
        InfoForm.gender = resp.data.buyerInfo.gender;
        InfoForm.address = resp.data.buyerInfo.address;
        console.log(InfoForm);
    })
    .catch(resp => {
        console.log(resp);
        console.log("获取用户信息错误");
    });

    onMounted(() => {   
        getUserInfo();
 
    })


    // 提交按钮
    function onSubmit() {
        console.log('submit!')
    }

    // 信息菜单栏被选中的菜单项
    const selectedMenu=ref('1')
    const handleSelect=(menuItem)=>{
        selectedMenu.value=menuItem;
    }

</script>

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
                    <el-form :model="form" label-width="200px">
                        <el-form-item label="昵称">
                            <el-input class="input"  v-model="InfoForm.name"/>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input class="input"  v-model="InfoForm.age"/>
                        </el-form-item>
                        <el-form-item label="身高">
                            <el-input class="input" v-model="InfoForm.height"/>
                        </el-form-item>
                        <el-form-item label="体重">
                            <el-input class="input" v-model="InfoForm.weight"/>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="InfoForm.gender">
                                <el-radio label="男" />
                                <el-radio label="女" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input class="input"  v-model="InfoForm.address" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"/>
                        </el-form-item>
                        <el-form-item label="收货人姓名">
                            <el-input class="input" v-model="InfoForm.name"/>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input class="input" v-model="InfoForm.phonenumber"/>
                        </el-form-item>
                        <el-form-item>
                            <div class="info-operation">
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                                <el-button>取消</el-button>
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

</style>

