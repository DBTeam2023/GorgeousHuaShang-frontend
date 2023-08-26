<template>
  <div id="chat">
    <Home></Home>
  </div>
</template>

<script>
import Home from '@/views/shop_subs/home.vue'

export default {
  name: 'Chat2Seller',
  components: {
    Home
  }
}
</script>

<style lang="scss">
@import url(@/assets/font/iconfont.css);
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  font-size: 25px;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  transition: .3s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  padding: 0;
  margin: 0;
}

#chat {
  width: 100%;
  height: 1000px;
  background-color: rgb(151,157,167);
  border-radius: 20px;
}
</style>
