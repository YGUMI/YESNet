import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import DevelopedApp from '../components/DevelopedApp.vue'
import DeployPage from '../components/DeployPage.vue'
import MyPage from '../components/MyPage.vue'
import Dashboard from '../components/Dashboard.vue'
import Agree from '../components/Agree.vue'
import Welcome from '../components/Welcome.vue'
import WatchTx from '../components/WatchTx.vue'
import WatchBlock from '../components/WatchBlock.vue'
import About from '../components/About.vue'

import testPage from '../components/testPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: About
    },
    {
      path: '/Main',
      component: Main,
      children: [
        {
          path: 'DevelopedApp',
          component: DevelopedApp
        },
        {
          path: 'DeployPage',
          component: DeployPage
        },
        {
          path: 'MyPage',
          component: MyPage
        },
        {
          path: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'WatchTx',
          component: WatchTx
        },
        {
          path: 'WatchBlock',
          component: WatchBlock
        },
        {
          path: 'testPage',
          component: testPage
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/SignUp',
      component: SignUp
    },
    {
      path: '/Agree',
      component: Agree
    },
    {
      path: '/Welcome',
      component: Welcome
    }
  ]
})
