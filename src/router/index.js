import Vue from 'vue';
import vueRouter from 'vue-router'


const Home = ()=> import ('../views/home/Home')
const Cart = ()=> import ('../views/cart/Cart')
const Category = ()=> import ('../views/category/CateGory')
const Profile = ()=> import ('../views/profile/Profile')


Vue.use(vueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new vueRouter({
  routes
})


export default router;