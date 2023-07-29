import{createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomePageView from "@/views/HomePageView.vue";
import ShopSelectView from "@/views/ShopSelectView.vue";
import ShopManageView from "@/views/ShopManageView.vue";
import ShopView from "@/views/ShopView.vue";
import Test from "@/views/test.vue";
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
      {path : '/test/', name : 'Test', component : Test},
    ]

    const router =
        createRouter({history : createWebHashHistory(), routes})

            router.beforeEach(
                async(to, from, next) =
                    >
                    {
                      console.log("当前页面url: " + to.path);

                      let flag = 1;
                      const token = localStorage.getItem("jwtToken");
                      let isLogin = false;

                      if (token) {
                        try {
                          // 如果有token且没过期能获取到user信息，则设置为当前状态为登录
                          isLogin =
                              await store.dispatch("getUserInfoForRouter");
                          console.log("当前页面拥有的信息如下：");
                          console.log(store.state.user);
                          // isLogin = false;
                        } catch (error) {
                          ElMessage({
                            message : "获取登录信息失败，请先进行登陆操作!",
                            type : "warning",
                          });
                          router.push({name : "Login"});
                        }
                      } else {
                        flag = 2;
                      }

                      if (to.meta.requestAuth && !isLogin) {
                        if (flag == = 1) {
                          next();
                        } else {
                          next({name : "Login"});
                        }
                      } else {
                        next();
                      }
                    })

                export default router
