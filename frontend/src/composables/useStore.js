import { computed, ref, watch } from 'vue'

const safeRead = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

const theme = ref(safeRead('nova-theme', 'dark'))
const user = ref(safeRead('nova-user', null))
const membership = ref(safeRead('nova-membership', null))
const purchasedCourses = ref(safeRead('nova-courses', []))
const orders = ref(safeRead('nova-orders', []))
const authOpen = ref(false)
const authMode = ref('login')

const applyTheme = (value) => {
  document.documentElement.dataset.theme = value
}

applyTheme(theme.value)
watch(theme, (value) => {
  applyTheme(value)
  safeWrite('nova-theme', value)
})
watch(user, (value) => safeWrite('nova-user', value), { deep: true })
watch(membership, (value) => safeWrite('nova-membership', value), { deep: true })
watch(purchasedCourses, (value) => safeWrite('nova-courses', value), { deep: true })
watch(orders, (value) => safeWrite('nova-orders', value), { deep: true })

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

const openAuth = (mode = 'login') => {
  authMode.value = mode
  authOpen.value = true
}

const closeAuth = () => {
  authOpen.value = false
}

const login = ({ email }) => {
  user.value = { name: email.split('@')[0] || 'NOVA 学员', email }
}

const register = ({ name, email }) => {
  user.value = { name: name || 'NOVA 学员', email }
}

const logout = () => {
  user.value = null
  membership.value = null
  safeWrite('nova-user', null)
  safeWrite('nova-membership', null)
}

const createOrder = (type, id, title, amount) => {
  orders.value = [{
    number: `NOVA${Date.now().toString().slice(-10)}`,
    type,
    id,
    title,
    amount,
    status: '已支付',
    date: new Date().toLocaleDateString('zh-CN'),
  }, ...orders.value]
}

const purchaseCourse = (course) => {
  if (!purchasedCourses.value.some((item) => item.slug === course.slug)) {
    purchasedCourses.value = [...purchasedCourses.value, { slug: course.slug, title: course.title, progress: 0 }]
  }
  createOrder('course', course.slug, course.title, course.price)
}

const purchaseMembership = (plan) => {
  membership.value = { id: plan.id, title: plan.title, active: true }
  createOrder('membership', plan.id, plan.title, plan.price)
}

export const useStore = () => ({
  theme,
  user,
  membership,
  isMember: computed(() => Boolean(membership.value?.active)),
  purchasedCourses,
  orders,
  authOpen,
  authMode,
  toggleTheme,
  openAuth,
  closeAuth,
  login,
  register,
  logout,
  purchaseCourse,
  purchaseMembership,
  hasCourse: (slug) => purchasedCourses.value.some((item) => item.slug === slug),
})
