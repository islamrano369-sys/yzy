import { computed, ref, watch } from 'vue'
import api from '../utils/api'

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
const membership = ref(null)
const purchasedCourses = ref([])
const orders = ref([])
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

const loadUserData = (email) => {
  if (!email) return
  membership.value = safeRead(`nova-membership-${email}`, null)
  purchasedCourses.value = safeRead(`nova-courses-${email}`, [])
  orders.value = safeRead(`nova-orders-${email}`, [])
}

watch(user, (value) => {
  safeWrite('nova-user', value)
  if (value && value.email) {
    loadUserData(value.email)
  } else {
    membership.value = null
    purchasedCourses.value = []
    orders.value = []
  }
}, { deep: true, immediate: true })

watch(membership, (value) => {
  if (user.value && user.value.email) {
    safeWrite(`nova-membership-${user.value.email}`, value)
  }
}, { deep: true })

watch(purchasedCourses, (value) => {
  if (user.value && user.value.email) {
    safeWrite(`nova-courses-${user.value.email}`, value)
  }
}, { deep: true })

watch(orders, (value) => {
  if (user.value && user.value.email) {
    safeWrite(`nova-orders-${user.value.email}`, value)
  }
}, { deep: true })

if (localStorage.getItem('access_token')) {
  setTimeout(() => {
    fetchProfile()
  }, 0)
}

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

const login = async ({ email, password }) => {
  const res = await api.post('/api/auth/jwt/create/', {
    username: email,
    password: password
  })
  localStorage.setItem('access_token', res.access)
  localStorage.setItem('refresh_token', res.refresh)
  await fetchProfile()
}

const register = async ({ name, email, password }) => {
  // 按照您的要求，直接以填写的用户名（name）作为数据库的 username，并存入 first_name
  await api.post('/api/auth/users/', {
    username: name.trim(),
    email: email.trim(),
    password: password,
    re_password: password,
    first_name: name.trim(),
    last_name: ''
  })
  await login({ email, password })
}

const fetchProfile = async () => {
  try {
    const res = await api.get('/api/auth/users/me/')
    // 个人信息名称与数据库的 username 完全保持一致
    const displayName = res.username || 'NOVA 学员'
    user.value = { name: displayName, email: res.email }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    logout()
  }
}

const logout = () => {
  user.value = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
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
