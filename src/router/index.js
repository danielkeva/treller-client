import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import boardDetails from '../views/board-details.vue'
import taskDetails from '../views/task-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/board',
    name: 'board',
    component: boardDetails,
    children: [
      {
        path: '/board/task/:id',
        component: taskDetails
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
