<!--  -->
<template>
  <div id="login">
    <!-- PARTICLE SYSTEM -->
    <div class="page-bg bg-blur"></div>

    <div class="animation-wrapper">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
    </div>

    <!--登录框-->
    <div class="login-area">
      <div class="login-block">
        <div class="left-block">
          <img src="@/assets/login/LOGO.svg" class="logo-image" @click="goToHomePage">
        </div>
        <div class="right-block">
          <div class="box">
            <div class="horizontal-flex-box" style="margin-top: 10%">
              <h class="small-font">新生态民族服饰电商平台</h>
            </div>
            <div class="horizontal-flex-box" style="margin-top: 5%">
              <h class="login-font">注册</h>
            </div>
            <div class="vertical-flex-box">
              <form style="margin-top: 5%">
                <input type="text" class="email" placeholder="用户名" v-model="RegisterForm.username" />
                <input type="password" class="pwd" placeholder="密码" v-model="RegisterForm.password" />
                <input type="password" class="pwd" placeholder="确认密码" v-model="passwordConfirm" />
              </form>
              <div v-if="showError" style="color:red;">两次输入的密码不一致！</div>


              <div class="mb-2 flex items-center text-sm">
                <el-radio-group v-model="RegisterForm.type" class="ml-4">
                  <el-radio label="seller" size="large">商家</el-radio>
                  <el-radio label="buyer" size="large">买家</el-radio>
                </el-radio-group>
              </div>

              <!--登录按钮-->
              <div class="btn effect01" target="_blank" style="margin-top: 2%" @click="register">
                <span style="margin-left: 40%; font-size: 1.3em">注册</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import HuashangLogo from '../../assets/login/LOGO.svg'
import { computed, onMounted, ref } from "vue";
import { doRegister } from "@/api/login";
import { ElMessage } from "element-plus";
import store from "@/store";
import router from "@/router";

const goToHomePage = () => {
  router.push('/homepage/');
};

let radio1 = ref('');

let RegisterForm = ref({
  username: "",
  password: "",
  type: radio1.value,
});
let passwordConfirm = ref("");

let showError = computed(() => {
  return passwordConfirm.value !== RegisterForm.value.password && passwordConfirm.value > 0;
});

const register = () => {

  if (showError.value) {
    ElMessage('两次密码不同！');
    return;
  }
  console.log(RegisterForm.value)
  doRegister(RegisterForm.value)
    .then(resp => {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      console.log(resp);
      router.push("/login/");
    })
    .catch(resp => {
      ElMessage({
        message: '注册失败',
        type: 'warning',
      })
      console.log(resp);
    })
}
</script>


<style lang="scss" scoped>
/* Config */
$color-bg: #111;
$color-particle: #fff;
$spacing: 2560px;
$time-1: 60s;
$time-2: 120s;
$time-3: 180s;
$time-4: 600s;

* {
  margin: 0;
  padding: 0;
}

.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /*   padding: 2em 0em; */
}

// .container {
//   align-items: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
//   background-color: #fff;
//   padding: 40px 0px;
//   width: 240px;
// }

.btn {
  letter-spacing: 0.1em;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 45px;
  max-width: 160px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  margin-top: 10px;
}

.btn:hover {
  text-decoration: none;
}

/*btn_background*/
.effect01 {
  color: #fff;
  border: 4px solid #000;
  box-shadow: 0px 0px 0px 1px #000 inset;
  background-color: #000;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
}

.effect01:hover {
  border: 4px solid #666;
  background-color: #fff;
  box-shadow: 0px 0px 0px 4px #eee inset;
}

/*btn_text*/
.effect01 span {
  transition: all 0.2s ease-out;
  z-index: 2;
}

.effect01:hover span {
  letter-spacing: 0.13em;
  color: #333;
}

/*highlight*/
.effect01:after {
  background: #fff;
  border: 0px solid #000;
  content: "";
  height: 155px;
  left: -75px;
  opacity: 0.8;
  position: absolute;
  top: -50px;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
  width: 50px;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  /*easeOutCirc*/
  z-index: 1;
}

.effect01:hover:after {
  background: #fff;
  border: 20px solid #000;
  opacity: 0;
  left: 120%;
  -webkit-transform: rotate(40deg);
  transform: rotate(40deg);
}

body {
  font-family: "Open Sans", sans-serif;
  background: #e2e2e2;
}

h2 {
  padding: 40px;
  font-weight: lighter;
  color: #414141;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  border: none;

  &::placeholder {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }

  &:hover,
  &:focus,
  &:active:focus {
    color: rgba(0, 0, 0, 0.64);
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.67);

    &::placeholder {
      color: rgba(0, 0, 0, 0.67);
      position: relative;
      -webkit-transform: translateY(-20px);
      transform: translateY(-10px);
    }
  }
}

.email,
.pwd {
  position: relative;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  font-family: "Open Sans", sans-serif;
  color: #858585;
  font-weight: lighter;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.normal-font {
  float: left;
  margin-top: 10%;
  font-size: 1.2em;
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.2px;
  font-weight: bolder;
}

.login-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* Make the login area occupy 100% of the #login container */
}

.login-block {
  display: flex;
  flex-wrap: nowrap;
  background-color: #fff;
  align-items: flex-start;
  justify-content: space-between;
  width: 50vw;
  height: 28vw;
  min-width: 600px;
  min-height: 320px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  -webkit-transition: all 400ms ease-in;
  z-index: 999;
  transition: transform 0.4s;
}

.login-block:hover {

  z-index: 999;
  -webkit-transition: all 400ms ease-in;
  transform: translateY(-10px);
  /* 0.4s完成transform移动效果*/
  transition: transform 0.4s;

}



.horizontal-flex-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.vertical-flex-box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.login-font {
  font-size: 2.5em;
  margin-left: 2%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: bold;
}

.small-font {
  font-size: 1.1em;
  font-family: "FZGuDianK";
  color: #8f8f8f;
}

.small-icon {
  max-width: calc(2vw + 2vh);
  max-height: calc(2vw + 2vh);
  margin-left: 5%;
  -webkit-transition: all 400ms ease-in;
}

.small-icon:hover {
  -webkit-transform: rotate(360deg);
}

/* Pauls awesome mixin */
@function particles($max) {
  $val: 0px 0px $color-particle;

  @for $i from 1 through $max {
    $val: #{$val},
    random($spacing)+px random($spacing)+px $color-particle;
  }

  @return $val;
}

@mixin particles($max) {
  box-shadow: particles($max);
}

/* Styles */
html,
body {
  height: 100%;
}

.page-bg,
.animation-wrapper {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.page-bg {
  background: $color-bg url("../../assets/login/BG.png") no-repeat top center;
  background-size: cover;
  z-index: -1;
}

.particle,
.particle:after {
  background: transparent;
}

.particle:after {
  position: absolute;
  content: "";
  top: $spacing;
}

.particle-1 {
  animation: animParticle $time-1 linear infinite;
  @include particles(600);
  height: 1px;
  width: 1px;
}

.particle-1:after {
  @include particles(600);
  height: 1px;
  width: 1px;
}

.particle-2 {
  animation: animParticle $time-2 linear infinite;
  @include particles(200);
  height: 2px;
  width: 2px;
}

.particle-2:after {
  @include particles(200);
  height: 2px;
  width: 2px;
}

.particle-3 {
  animation: animParticle $time-3 linear infinite;
  @include particles(100);
  height: 3px;
  width: 3px;
}

.particle-3:after {
  @include particles(100);
  height: 3px;
  width: 3px;
}

.particle-4 {
  animation: animParticle $time-4 linear infinite;
  @include particles(400);
  height: 1px;
  width: 1px;
}

.particle-4:after {
  @include particles(400);
  height: 1px;
  width: 1px;
}

@keyframes animParticle {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY($spacing * -1);
  }
}

.page-wrapper {
  text-align: center;
  color: #fff;
  z-index: 2;
}


#login {
  height: 95vh;
}

.left-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-radius: 10px;
}

.logo-image {
  width: 80%;
  height: 80%;
  cursor: pointer;
}

.right-block {
  width: 50%;
  height: 100%;
  border-radius: 10px;

}

.box {
  padding-left: 25%;
  width: 100%;
  height: 100%;
}
</style>