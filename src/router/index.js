import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/views/client/index.vue'
import Client2 from '@/views/client2/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
