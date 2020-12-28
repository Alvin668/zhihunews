import Vue from 'vue'
import VueRouter from 'vue-router'
const Detail = () => import('../views/detail');
const Home = () => import('../views/home')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/detail/:id',
    name: 'detail',
    Component: Detail
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router