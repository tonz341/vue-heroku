import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Features from '@/components/Features'
import Contact from '@/components/Contact'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Team from '@/components/Team'
import Notes from '@/components/Notes'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/features',
      name: 'features',
      component: Features
    },
    {
      path: '/about-us',
      name: 'about',
      component: About
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/contact-us',
      name: 'contact',
      component: Contact
    },
    {
      path: '/notes',
      name: 'notes',
      component: Notes
    }
  ]
})
