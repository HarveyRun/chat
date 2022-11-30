import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/views/client/index.vue'
import Client2 from '@/views/client2/index.vue'
import List from '@/views/list/index.vue'
import Dashbord from '@/views/dashbord/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashbord',
      component: Dashbord
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/c',
      name: 'Client',
      component: Client
    },
    {
      path: '/s',
      name: 'Client2',
      component: Client2
    }
  ]
})
