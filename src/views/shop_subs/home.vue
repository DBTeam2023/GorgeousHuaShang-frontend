<template>
  <div class="home">
    <el-container height="100%">
      <el-aside width="100px">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <Chat></Chat>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from '@/components/shop/Nav.vue';
import Chat from '@/views/shop_subs/chatHome/index.vue';
export default {
  name: "Chat2Seller",
  components: {
    Nav,
    Chat,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: rgb(39, 42, 55);
  border-radius: 20px;
}
</style>
