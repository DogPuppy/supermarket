import VueRouter from "vue-router"
import Vue from "vue"
import Router from "vue-router"

Vue.use(VueRouter)

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Profile = () => import("views/profile/Profile")
const Cart = () => import("views/cart/Cart")

const routes = [{
    path: "",
    redirect: "/home"
  }, {
    path: "/home",
    component: Home
  },
  {
    path: "/shopcar",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/category",
    component: Category
  },

]


const router = new VueRouter({
  routes,
  mode: "history"
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
