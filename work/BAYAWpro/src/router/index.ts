import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Contact from '../views/Contact.vue'
import Overview from '../views/Overview.vue'
import RuleSettings from '../views/RuleSettings.vue'
import DocumentExtract from '../views/DocumentExtract.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/services',
      name: 'Services',
      component: Services,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview,
    },
    {
      path: '/rule-settings',
      name: 'RuleSettings',
      component: RuleSettings,
    },
    {
      path: '/document-extract',
      name: 'DocumentExtract',
      component: DocumentExtract,
    },
  ],
})

export default router
