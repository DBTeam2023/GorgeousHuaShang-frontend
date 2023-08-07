import{createRouter, createWebHashHistory} from 'vue-router';
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
import GoodsdetailView from "@/views/GoodsdetailView.vue";
import UserInfoView from "@/views/UserInfoView.vue"
import store from "@/store";
import {ElMessage} from "element-plus";
import NotFound from "@/views/NotFound.vue";

/// requestAuth 代表是否需要登录才能访问界面

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
          name : 'Shop',
            component : ShopView,
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
        {
          path: '/goodsdetail/',
          name: 'Goodsdetail',
          component: GoodsdetailView,
          meta: {
              requestAuth: true,
          }
        },
        {
          path : '/orderdetail/',
          name : 'OrderDetail',
          component : OrderDetailView,
          meta: {
              requestAuth: true,
          }
        },
        {
          path : '/order/',
          name : 'Order',
          component : OrderView,
          meta: {
              requestAuth: true,
          }
        },
        {
          path: '/goodsdetail/',
          name: 'Goodsdetail',
          component: GoodsdetailView,
          meta: {
              requestAuth: true,
          }
        },
        {
          path: '/userinfo/:selected?',
          name: 'UserInfo',
          component: UserInfoView,
          props:true,
          meta: {
              requestAuth: false,
          }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: {
                requestAuth: false,
            }
        },
    ]

    const router = createRouter({history : createWebHashHistory(), routes})

    router.beforeEach(async (to, from, next) => {
      console.log("当前页面url: " + to.path);

      let flag = 1;
      const token = localStorage.getItem("jwtToken");
      let isLogin = false;

      if (token) {
        try {
            // 如果有token且没过期能获取到user信息，则设置为当前状态为登录
            isLogin = await store.dispatch("getUserInfoForRouter");
            console.log("当前页面拥有的信息如下：");
            console.log(store.state.user);
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
