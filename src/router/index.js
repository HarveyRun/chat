import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/views/client/index.vue'
import Client2 from '@/views/client/index2.vue'
import Client3 from '@/views/client/index3.vue'
import List from '@/views/list/index.vue'
import Dashbord from '@/views/dashbord/index.vue'
import Login from '@/views/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashbord',
      component: Dashbord
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/a',
      name: 'Client',
      component: Client
    },
    {
      path: '/b',
      name: 'Client2',
      component: Client2
    },
    {
      path: '/c',
      name: 'Client3',
      component: Client3
    }
  ]
})
