<template>
    <div v-if="couponExit === false"  style="width:980px; margin-left:10%;">
        <h2>我的优惠券</h2>
        <el-empty description="您还没有优惠券哦~"/>
    </div>

    <div v-if="couponExit === true"  style="width:980px; margin-left:10%;">
        <h2>我的优惠券</h2>
        <!-- <el-col :span="24" style="justify-content: center; align-items: center;">
            <el-card>
                <el-empty description="您有优惠券啦">
                </el-empty>
            </el-card>
        </el-col> -->
    </div>`
    



</template>


<script setup>
    import {ref}  from 'vue'

    const couponExit=ref(true);

</script>


<style lang="scss" scoped>
    h2{
        text-align: center;
    }

</style>