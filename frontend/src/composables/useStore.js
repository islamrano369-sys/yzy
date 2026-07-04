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
  // 将昵称拆分为姓（last_name）和名（first_name）
  const trimmedName = (name || '').trim()
  let firstName = trimmedName
  let lastName = ''

  if (trimmedName.length > 1) {
    if (!trimmedName.includes(' ') && trimmedName.length <= 4) {
      // 中文姓名拆分（如：张三 -> 姓：张，名：三；诸葛孔明 -> 姓：诸，名：葛孔明）
      lastName = trimmedName.slice(0, 1)
      firstName = trimmedName.slice(1)
    } else {
      // 英文或其他带空格姓名拆分（如：John Doe -> 姓：Doe，名：John）
      const parts = trimmedName.split(' ')
      firstName = parts[0]
      lastName = parts.slice(1).join(' ')
    }
  }

  await api.post('/api/auth/users/', {
    username: email,
    email: email,
    password: password,
    re_password: password,
    first_name: firstName,
    last_name: lastName
  })
  await login({ email, password })
}

const fetchProfile = async () => {
  try {
    const res = await api.get('/api/auth/users/me/')
    // 组合 last_name 和 first_name 作为显示名称，如果没有则降级使用邮箱前缀
    let displayName = ''
    if (res.last_name || res.first_name) {
      displayName = `${res.last_name}${res.first_name}`.trim()
    } else {
      displayName = res.username.split('@')[0] || 'NOVA 学员'
    }
    user.value = { name: displayName, email: res.email }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    logout()
  }
}

const logout = () => {
  user.value = null
  membership.value = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
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
