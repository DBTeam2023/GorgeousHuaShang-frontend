<template>
    <div class="c-container" :class="{'container-invalid': coupon.isValid === false}">
      <!-- 插槽，父组件可在CouponCard里包含子组件 -->
        <slot></slot> 
        <!-- 1、优惠券类型 -->
        <div class="c-type center-container" :class="{'type-invalid': coupon.isValid === false}" >
            <!-- v-if 折扣 -->
            <div  v-if="coupon.type === 'discount'">
            <div class="type-container">
                <span :class="{'text-invalid': coupon.isValid === false}" class="discount-text" >{{  coupon.discount * 10  }}</span>折
            </div>
            <div style="font-size: 30px;text-align: center;margin-top: 20px;font-weight: 300;">COUPON</div>
            </div>

            <!-- v-if 满减 -->
            <div v-if="coupon.type === 'maxout'">
            <div class="type-container">
                <span>满{{ coupon.bar }}减</span>
                <span class="discount-text">{{ coupon.reduction }}</span>元
            </div>
            <div style="font-size: 30px;text-align: center;margin-top: 20px;font-weight: 300; ">COUPON</div> 
            </div>
        </div>

        <!-- 2、基本信息 -->
        <div class="c-info">
            <!-- 使用限制 -->
            <div class="c-id" :class="{'text-invalid': coupon.isValid === false}">
            <div class="id-text">限用店铺：{{ coupon.storeId }}</div>
            <div class="id-text" style="text-align: center;font-size: 20px;font-weight: bold; margin:20px 0" >{{ coupon.couponId }}</div>
            </div>
            <!-- 有效期 -->
            <div class="c-time" :class="{'text-invalid': coupon.isValid === false}">
            <div>截止时间至：{{ coupon.validto }}</div>
            </div>
        </div>
        </div>
</template>

<script setup>
import { defineProps } from 'vue';
 
    // 模板使用coupon
    const props = defineProps({
        coupon: {
            type: Object,
            required: true
        },
        disableMouseEvents: Boolean
    });

</script>

<style lang="scss" scoped>
    // 居中容器
  .center-container{
      display:flex;
      justify-content:center;
      align-items:center;
      height:100%;
  }

    // 单张优惠券样式
  // 优惠券信息容器
  .c-container{
    height:100%;
    width:15vw;
    min-width:160px;
    padding-bottom:10px;
    color:#e5c46e;
    background-color: #e5c46e;
    transition: all 0.3s ease;//过渡时间
    position: relative;
  }

  .c-container .shadow{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  // 顶部优惠券类型
  .c-container .c-type{
    width: 100%;
    height: 70%;
    min-height:160px;
    background-color: #161616;
    padding:4vw 0 3vw 0;
    border-bottom: dashed #e5c46e;
  }

  .c-container .c-type .type-container{
    height: 8vw;
    text-align: center; //文字居中
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: double none;
    border-width: 5px;
  }

  .c-container .c-type .discount-text{
    font-size: 5vw;
    font-weight: bold;
  }


  // 中部基本信息
  .c-container .c-info{
    color: #161616;
    font-size: 1vw;
    width: 100%;
    height:50%;
  }

  // 编号信息
  .c-container .c-info .c-id{
    font-size: 1em;
    margin: 5%;
    height: 40%;
    color:#000000ad;
  }

  .c-container .c-info .c-id .id-text{
    overflow: hidden;
    text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
    white-space: nowrap; /* 防止内容换行 */
  }

  // 有效期
  .c-container .c-info .c-time{
    font-size: 3px;
    height: 15%;
    margin: 5%;
    color:#0000008c;
    overflow: hidden;
    text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
    // white-space: nowrap; /* 防止内容换行 */
  }

  // 根据优惠券是否有效改变颜色
  .container-invalid{
    background-color: #b8b7b7;
    color:#b8b7b7;

  }

  .type-invalid{
    //强行覆盖父类（危险慎用）
    background-color: #6d7072 !important;
    border-color: #b8b7b7 !important;
  }
  .text-invalid{
    // 强行覆盖父类（危险慎用）
    color:#6d7072 !important;
  }

</style>