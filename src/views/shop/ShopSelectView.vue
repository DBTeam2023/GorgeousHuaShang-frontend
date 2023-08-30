@@ -0,0 +1,149 @@
<template>
    <div :class="{ container: true, 'sign-up-model': vari }">
        <div class="inner-left-container">
            <div class="login-content">
                <h1 style="color: black;">选择店铺</h1>
                <ElButton type="primary" @click="onClick" size="large">去注册</ElButton>
            </div>
            <img src="../../assets/shop/login-bg.svg" class="image">
        </div>
        <div class="inner-right-container">
            <div class="register-content">
                <h1 style="color: black;">新建店铺</h1>
                <ElButton type="primary" @click="onClick" size="large">去选择</ElButton>
            </div>
            <img src="../../assets/shop/register-bg.svg" class="image">
        </div>
        <div class="inner-sign-up-container">
            <login :class="{ 'sign-up-model': vari }"></login>
            <register :class="{ 'sign-up-model': vari }"></register>
        </div>
    </div>
  </template>

  <script setup>
import { ref } from 'vue';
import login from './loginFrom.vue';
import register from './registerForm.vue';

const onClick = () => {
  vari.value = !vari.value;
};

let vari = ref(false);


  </script>
  <style scoped>
  .container {
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .container::before {
    content: "";
    width: 2000px;
    height: 2000px;
    background-color: #D1DFE8;
    position: absolute;
    border-radius: 50%;
    transform: translateY(-50%);
    right: 48%;
    top: -10%;
    transition: 1.8s ease-in-out;
    z-index: 2;
  }
  .inner-left-container {
    width: 0;
    flex: 1;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    /* 上边|右边|下边|左边 */
    padding: 3rem 10% 2rem 10%;
    pointer-events: all;

  }
  .inner-right-container {
    width: 0;
    flex: 1;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    /* 上边|右边|下边|左边 */
    padding: 3rem 10% 2rem 10%;
    pointer-events: none;
  }
  .container .inner-right-container .register-content,
  .container .inner-right-container .image {
    transform: translateX(1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  .container .inner-left-container .login-content,
  .container .inner-left-container .image {
    transform: translateX(0px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;

  }
  .image {
    width: 100%;
  }
  .inner-sign-up-container {
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;
    top: 20%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    display: grid;
    grid-template-columns: 1fr;
  }

  /* 动画 */
  .container.sign-up-model::before {
    transform: translate(100%, -50%);
    transition: 1.8s ease-in-out;
    right: 52%;
  }

  .container.sign-up-model .inner-right-container .register-content,
  .container.sign-up-model .inner-right-container .image {
    transform: translateX(0px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }

  .container.sign-up-model .inner-left-container .login-content,
  .container.sign-up-model .inner-left-container .image {
    transform: translateX(-1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }

  .container.sign-up-model .inner-sign-up-container {
    width: 50%;
    height: 50%;
    top: 20%;
    right: 50%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }

  .container.sign-up-model .inner-right-container {
    pointer-events: all;
  }

  .container.sign-up-model .inner-left-container {
    pointer-events: none;
  }

  </style>
