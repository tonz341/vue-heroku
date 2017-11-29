import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Others from '@/components/Others'

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
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/others',
      name: 'Others',
      component: Others
    }
  ]
})
