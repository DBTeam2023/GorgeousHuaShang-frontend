import{createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomePageView from "@/views/HomePageView.vue";
import ShopSelectView from "@/views/ShopSelectView.vue";
import ShopManageView from "@/views/ShopManageView.vue";
import ShopView from "@/views/ShopView.vue";
import CartView from "@/views/cart/CartView.vue";
import OrderDetailView from "@/views/OrderDetailView.vue";
import OrderView from "@/views/OrderView.vue";
// import store from "@/store";

const routes =
    [
      {path : '/', name : 'home', component : HomeView},
      {path : '/homepage/', name : "Homepage", component : HomePageView},
      {path : '/login/', name : 'Login', component : LoginView},
      {path : '/register/', name : 'Register', component : RegisterView},
      {path : '/shopselect/', name : 'ShopSelect', component : ShopSelectView},
      {path : '/shopmanage/', name : 'ShopManage', component : ShopManageView},
      {path : '/shop/', name : 'Shop', component : ShopView},
      {path: '/cart', name: 'Cart', component: CartView},
      {path : '/orderdetail/', name : 'OrderDetail', component : OrderDetailView},
      {path : '/order/', name : 'Order', component : OrderView},
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
