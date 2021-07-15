import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>import('../views/Home.vue')
const Shop = () =>import('../views/Shop.vue')
const Info = () =>import('../views/Info.vue')
const Regis = () =>import('../views/Regis.vue')
const Cart = () =>import('../views/Cart.vue')
const Contact = () =>import('../views/Contact.vue')
const Suggest = () =>import('../views/Suggest.vue')
const Person = () =>import('../views/Person.vue')
const Login = () =>import('../views/newPages/Login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/regis',
    name: 'Regis',
    component: Regis
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/suggest',
    name: 'Suggest',
    component: Suggest
  },
  {
    path: '/person',
    name: 'Person',
    component: Person
  },{
    path: '/newPages/Login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
