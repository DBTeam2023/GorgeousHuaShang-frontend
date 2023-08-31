import { createRouter, createWebHashHistory } from 'vue-router';
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/login/RegisterView.vue";
import HomePageView from "@/views/homePage/HomePageView.vue";
import ClassificationView from "@/views/homePage/ClassificationView.vue";
import ShopSelectView from "@/views/shop/ShopSelectView.vue";
import ShopManageView from "@/views/shop/ShopManageView.vue";
import ShopView from "@/views/shop/ShopView.vue";
import CartView from "@/views/cart/CartView.vue";
import OrderDetailView from "@/views/order/OrderDetailView.vue";
import OrderView from "@/views/order/OrderView.vue";
import GoodsdetailView from "@/views/goods/GoodsdetailView.vue";
import UserInfoView from "@/views/userinfo/UserInfoView.vue"
import store from "@/store";
import { ElMessage } from "element-plus";
import NotFound from "@/views/NotFoundView.vue";
import PayView from '@/views/pay/PayView.vue';

/// requestAuth 代表是否需要登录才能访问界面

const routes =
  [
    {
      path: '/',
      name: 'home',
      redirect: "/homepage/",
      component: HomePageView,
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
      path: '/classify',
      name: "Classify",
      component: ClassificationView,
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
      path: '/orderdetail/:orderID',
      name: 'OrderDetail',
      component: OrderDetailView,
      meta: {
        requestAuth: true,
      }
    },
    {
      path: '/order/',
      name: 'Order',
      component: OrderView,
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
      path: '/userinfo/:selected?', //设置动态参数，可有可无
      name: 'UserInfo',
      component: UserInfoView,
      props: true,
      meta: {
        requestAuth: true,
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
    {
      path: '/pay/',
      name: 'Pay',
      component: PayView,
      meta: {
        requestAuth: true,
      }
    },
  ]

const router = createRouter({ history: createWebHashHistory(), routes })

router.beforeEach(async (to, from, next) => {
  let flag = 1;
  const token = localStorage.getItem("jwtToken");
  let isLogin = false;

  if (token) {
    try {
      // 如果有token且没过期能获取到user信息，则设置为当前状态为登录
      isLogin = await store.dispatch("getUserInfoForRouter");
      // isLogin = false;
      if (isLogin === false) {
        ElMessage({
          message: "请先进行登陆操作!",
          type: "warning",
        });
        router.push({ name: "Login" });
      }
    } catch (error) {
      if (to.path !== "/login/" && to.path !== "/register/") {
        ElMessage({
          message: "获取登录信息失败，请先进行登陆操作!",
          type: "warning",
        });
      }
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
