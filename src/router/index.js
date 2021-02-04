import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/Homepages/Home.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"Layout",
    component:Layout,
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
        meta:{
          isLogin:true
        },
        
      },
      {
        path:"params",
        name:"Params",
        component:()=>import('../views/main/Params'),
        meta:{
          isLogin:true
        }
      },
      {
        path:"ad",
        name:"Ad",
        component:()=>import('../views/main/Ad/ad.vue'),
        meta:{
          isLogin:true
        }
      },
      {
        path:"goods",
        name:"Goods",
        component:()=>import('../views/main/Goods/Goods.vue'),
        meta:{
          isLogin:true
        }
      },
      {
        /* 详情页虽然是home的子页面，但是在路由中和home是同级的，此处是三级路由嵌套 */
          
            path:"details",
            name:"Details",
            component:()=>import('../views/main/Homepages/sub/Details.vue'),
            children:[
              {
                path:"openproduct",
                name:"openProduct",
                component:()=>import('../views/main/Homepages/sub/openProduct.vue')
              },
              {
                path:"golife",
                name:"golife",
                component:()=>import('../views/main/Homepages/sub/golife.vue')
              },
              {
                path:"heigh",
                name:"heigh",
                component:()=>import('../views/main/Homepages/sub/heigh.vue')
              },
              {
                path:"logo",
                name:"logo",
                component:()=>import('../views/main/Homepages/sub/logo.vue')
              }
            ]
          
       
      }
    ]
  },
  {
    path:"/login",
    name:"Login",
    component:()=>import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
