import{createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomePageView from "@/views/HomePageView.vue";
import ShopSelectView from "@/views/ShopSelectView.vue";
import ShopManageView from "@/views/ShopManageView.vue";
// import store from "@/store";

const routes =
    [
      {path : '/', name : 'home', component : HomeView},
      {path : '/homepage/', name : "Homepage", component : HomePageView},
      {path : '/login/', name : 'Login', component : LoginView},
      {path : '/register/', name : 'Register', component : RegisterView},
      {path : '/shopselect/', name : 'ShopSelect', component : ShopSelectView},
      {path : '/shopmanage/', name : 'ShopManage', component : ShopManageView},
    ]

    const router = createRouter({history : createWebHistory(), routes})

    // router.beforeEach(async (to, from, next) => {
    //   console.log(to.path);
    //   from;
    //   next();
    //
    //   const {isLogin} = await store.dispatch("getUserInfo");
    //   console.log(isLogin);
    // })

    export default router
