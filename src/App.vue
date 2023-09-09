<template>
  <div id="app">
    <div class="content">
      <div class="navBar">
        <NavBar v-if="showNavBar" />
      </div>
      <router-view />
      <div id="footer-container">
        <MyFooter />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;

}

.navBar {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 100;
}

#footer-container {
  flex-shrink: 0;
}
</style>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import MyFooter from "@/components/common/MyFooter.vue";
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const showNavBar = ref(true);
const route = useRoute();

watch(() => route.name, (newRoute) => {
  // 在 route 对象变化时执行的逻辑
  if (route.name === 'Login' || route.name === 'Register') {
    showNavBar.value = false;
  }
  else
    showNavBar.value = true;
});

onMounted(() => {
  if (route.name === 'Login' || route.name === 'Register') {
    showNavBar.value = false;
  }
  else
    showNavBar.value = true;
});
</script>
