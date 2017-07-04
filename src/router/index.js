import Vue from 'vue'
import Router from 'vue-router'
import Star from '@/components/Star'
import Line from '@/components/Line'
// import Magic from '@/components/magic'
import Tron from '@/components/Tron'
import Clock from '@/components/Clock'
import Project from '@/components/Project'
import Experience from '@/components/Experience'

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
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Experience
    }
  ]
})
