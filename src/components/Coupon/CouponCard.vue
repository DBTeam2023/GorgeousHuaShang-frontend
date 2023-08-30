<template>
    <div class="c-container" :class="{'container-invalid': coupon.isValid === false}">
        <!-- 1、优惠券类型 -->
        <div class="c-type center-container" :class="{'type-invalid': coupon.isValid === false}" >
            <!-- v-if 折扣 -->
            <div  v-if="coupon.type === 'discount'">
            <div class="type-container">
                <span class="discount-text">{{ coupon.discount }}</span>折
            </div>
            <div style="font-size: 35px;text-align: center;margin-top: 10px;font-weight: 300;">COUPON</div>
            </div>

            <!-- v-if 满减 -->
            <div v-if="coupon.type === 'maxout'">
            <div class="type-container">
                <span>满{{ coupon.bar }}减</span>
                <span class="discount-text">{{ coupon.reduction }}</span>元
            </div>
            <div style="font-size: 35px;text-align: center;margin-top: 10px;font-weight: 300; ">COUPON</div> 
            </div>
        </div>

        <!-- 2、基本信息 -->
        <div class="c-info">
            <!-- 使用限制 -->
            <div class="c-id" :class="{'text-invalid': coupon.isValid === false}">
            <div class="id-text">限用店铺：{{ coupon.storeId }}</div>
            <div class="id-text">限用商品：{{ coupon.commodityId }}</div>
            <!-- <div class="id-text">标签：{{ activeTag }}</div> -->
            <!-- <div class="id-text">有效: {{ coupon.isValid}} </div> -->
            <div style="text-align: center;font-size: 18px;font-weight: bold; margin:15px" >{{ coupon.couponId }}</div>
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
    width:210px;
    height: 400px;
    color:#a7d0f5;
    background-color: #94bee6;
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

  // .c-container:hover .shadow{
  //   opacity: 1;
  // }

  // // 鼠标悬浮
  // .c-container:hover{
  //   transform: scale(1.05);
  //   box-shadow: 0 6px 12px gray;
  // }

  // 顶部优惠券类型
  .c-container .c-type{
    width: 100%;
    height: 66%;
    background-color: rgb(10 30 57 / 94%);
    border-bottom: dashed #94bee6;
  }

  .c-container .c-type .type-container{
    text-align: center; //文字居中
    border-style:  double none;//边线
    border-width: 5px;
    width:180px;
  }

  .c-container .c-type .discount-text{
    color: #a7d0f5;
    font-size: 76px;
    font-weight: bold;
  }


  // 中部基本信息
  .c-container .c-info{
    color: rgb(10 30 57 / 94%);
    font-size: 10px;
    width: 100%;
    height:50%;
  }

  // 编号信息
  .c-container .c-info .c-id{
    font-size: 14px;
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
    font-size: 10px;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#0000008c;
  }

  // 根据优惠券是否有效改变颜色
  .container-invalid{
    background-color: #95b5d3;
  }

  .type-invalid{
    //强行覆盖父类（危险慎用）
    background-color: #4b698F !important;
  }
  .text-invalid{
    // 强行覆盖父类（危险慎用）
    color:#4b698F !important;
  }

</style>