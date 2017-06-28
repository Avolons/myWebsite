import Vue from 'vue'
import Router from 'vue-router'
import Star from '@/components/star'
import Line from '@/components/line'
// import Magic from '@/components/magic'
import Tron from '@/components/tron'
import Clock from '@/components/clock'

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
      path: '/tron',
      name: 'Tron',
      component: Tron
    },
    {
      path: '/clock',
      name: 'Clock',
      component: Clock
    },
  ]
})
