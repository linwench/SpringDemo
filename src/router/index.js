import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue'),
    redirect: "/home",
    children: [
      {path: 'home', name: '首页', component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')},
      {path: 'user', name: '用户管理', component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')},
      {path: 'role', name: '角色管理', component: () => import(/* webpackChunkName: "about" */ '../views/Role.vue')},
      {path: 'menu', name: '菜单管理', component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue')},
      {path: 'person', name: '个人信息', component: () => import(/* webpackChunkName: "about" */ '../views/Person.vue')},

    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/resgister',
    name: 'Resgister',
    component: () => import('../views/Resgister.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name) //设置当前的路由名称
  store.commit("setPath") //触发store的数据更新
  next() //放行路由
})

export default router
