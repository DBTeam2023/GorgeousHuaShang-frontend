<template>
  <div id="app">
    <div class="content">
      <NavBar />
      <router-view />
    </div>
    <div id="footer-container">
      <MyFooter />
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

#footer-container {
  flex-shrink: 0;
}

</style>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import MyFooter from "@/components/common/MyFooter.vue";
</script>

