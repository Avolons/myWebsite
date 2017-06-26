import Vue from 'vue'
import Router from 'vue-router'
import Star from '@/components/star'
import Line from '@/components/line'
import Magic from '@/components/magic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Star',
      component: Star
    },
    {
      path: '/line',
      name: 'Line',
      component: Line
    },
    {
      path: '/magic',
      name: 'Magic',
      component: Magic
    },
  ]
})
