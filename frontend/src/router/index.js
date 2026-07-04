import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue'), meta: { title: 'NOVA AI｜AI 编程与智能体学习平台' } },
  { path: '/courses', name: 'courses', component: () => import('../views/Courses.vue'), meta: { title: 'AI 编程课｜NOVA AI' } },
  { path: '/courses/:slug', name: 'course-detail', component: () => import('../views/CourseDetail.vue'), meta: { title: '课程详情｜NOVA AI' } },
  { path: '/checkout/:type/:id', name: 'checkout', component: () => import('../views/Checkout.vue'), meta: { title: '确认订单｜NOVA AI' } },
  { path: '/agents', name: 'agents', component: () => import('../views/Agents.vue'), meta: { title: 'AI 智能体｜NOVA AI' } },
  { path: '/agents/:slug', name: 'agent-detail', component: () => import('../views/AgentDetail.vue'), meta: { title: '智能体工作台｜NOVA AI' } },
  { path: '/membership', name: 'membership', component: () => import('../views/Membership.vue'), meta: { title: '会员套餐｜NOVA AI' } },
  { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue'), meta: { title: '个人中心｜NOVA AI' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue'), meta: { title: '页面未找到｜NOVA AI' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
