import{createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomePageView from "@/views/HomePageView.vue";
import ShopSelectView from "@/views/ShopSelectView.vue";
import ShopManageView from "@/views/ShopManageView.vue";
import ShopView from "@/views/ShopView.vue";
import CartView from "@/views/cart/CartView.vue";
import GoodsdetailView from "@/views/GoodsdetailView.vue";
import store from "@/store";
import {ElMessage} from "element-plus";
// import store from "@/store";

const routes =
    [
      {
          path : '/',
          name : 'home',
          redirect: "/homepage/",
          component : HomeView,
          meta: {
              requestAuth: false,
          }
      },
      {
          path : '/homepage/',
          name : "Homepage",
          component : HomePageView,
          meta: {
              requestAuth: false,
          }
      },
      {
          path : '/login/',
          name : 'Login',
          component : LoginView,
          meta: {
              requestAuth: false,
          }
      },
      {
          path : '/register/',
          name : 'Register',
          component : RegisterView,
          meta: {
              requestAuth: false,
          }
      },
      {
          path : '/shopselect/',
          name : 'ShopSelect',
          component : ShopSelectView,
          meta: {
              requestAuth: true,
          }
      },
      {
          path : '/shopmanage/',
          name : 'ShopManage',
          component : ShopManageView,
          meta: {
              requestAuth: true,
          }
      },
      {
          path : '/shop/',
          name : 'Shop'
          , component : ShopView,
          meta: {
              requestAuth: true,
          }
      },
      {
          path: '/cart/',
          name: 'Cart',
          component: CartView,
          meta: {
              requestAuth: true,
          }
      },
        // todo: /goodsdetail/ 这个url还要加参数的，因为有不同的商品
        {
            path: '/goodsdetail/',
            name: 'Goodsdetail',
            component: GoodsdetailView,
            meta: {
                requestAuth: true,
            }
        },
    ]

    const router = createRouter({history : createWebHistory(), routes})

    router.beforeEach(async (to, from, next) => {
      console.log(to.path);
      console.log(store.state.user);

      let flag = 1;
      const token = localStorage.getItem("jwtToken");
      let isLogin = false;

      if (token) {
        try {
            // 如果有token且没过期能获取到user信息，则设置为当前状态为登录
            isLogin = await store.dispatch("getUserInfoForRouter");
            // isLogin = false;
        } catch (error) {
            ElMessage({
                message: "获取登录信息失败，请先进行登陆操作!",
                type: "warning",
            });
            router.push({ name: "Login" });
        }
      } else {
          flag = 2;
      }

      if (to.meta.requestAuth && !isLogin) {
          if (flag === 1) {
              next();
          } else {
              next({ name: "Login" });
          }
      } else {
          next();
      }

    })

    export default router
