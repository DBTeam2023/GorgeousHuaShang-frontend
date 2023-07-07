<script setup>
    import {reactive} from 'vue'
    
    // 用户输入的个人信息表
    const InfoForm=reactive({
        name:'',
        age:'',
        height:'',
        weight:'',
        gender:'',
        address:'',
        receivename:'',
        phonenumber:'',
    })

    // 提交按钮
    function onSubmit() {
        console.log('submit!')
    }

</script>

<template>

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
            <el-input class="input" v-model="InfoForm.receivename"/>
        </el-form-item>
        <el-form-item label="手机号码">
            <el-input class="input" v-model="InfoForm.phonenumber"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
    .input{
        width:500px;
    }
</style>

