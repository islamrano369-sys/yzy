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
const courses = ref([])
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

const mapCourse = (data) => {
  const highlightsList = data.highlights ? data.highlights.split('\n').map(h => h.trim()).filter(Boolean) : []
  const slug = data.id === 1 ? 'ai-fullstack' : (data.id === 2 ? 'agent-engineering' : `course-${data.id}`)
  
  return {
    id: data.id,
    slug: slug,
    title: data.title,
    shortTitle: data.title.length > 8 ? data.title.slice(0, 8) : data.title,
    description: data.summary,
    price: Number(data.price),
    originalPrice: Number(data.original_price),
    coverImage: data.cover_image,
    headerImage: data.header_image,
    detailImage: data.detail_image,
    instructor: data.instructor,
    rating: Number(data.rating),
    level: data.id === 2 ? '进阶提升' : '零基础可学',
    duration: data.id === 2 ? '42 课时' : '36 课时',
    projects: data.id === 2 ? '6 个智能体' : '8 个项目',
    accent: data.id % 2 === 0 ? 'mint' : 'coral',
    outcomes: highlightsList.length > 0 ? highlightsList : ['独立交付可运行作品', '完成项目实战训练', '获得结业证书'],
    audience: data.id === 2 ? [
      '具备基础开发经验的工程师',
      '企业数字化与自动化负责人',
      '需要构建垂直智能体的创业者'
    ] : [
      '希望转型 AI 开发的程序员',
      '需要快速验证产品的独立开发者',
      '想建立完整技术栈的初学者'
    ],
    projectsList: data.id === 2 ? [
      '电商运营 Agent', '数据分析 Agent', '研究报告 Agent', '客户成功 Agent'
    ] : [
      'AI 简历优化器', '知识库问答站', '多模型写作工作台', 'AI 产品分析助手'
    ],
    syllabus: data.id === 2 ? [
      ['01', 'Agent 架构', '任务规划、工具调用、上下文和记忆'],
      ['02', '工作流编排', '顺序、分支、循环与多智能体协作'],
      ['03', '工具与数据', '搜索、知识库、数据库和内部系统'],
      ['04', '可靠性工程', '评测、可观测性、护栏与失败恢复'],
      ['05', '行业落地', '从业务指标到可持续运行的智能体'],
    ] : [
      ['01', 'AI 产品思维', '需求拆解、模型边界与可交付原型'],
      ['02', 'Vue 交互界面', '组件、状态、路由与高质量产品 UI'],
      ['03', '服务端能力', '接口设计、数据持久化与权限管理'],
      ['04', '模型接入', '提示词、结构化输出、流式响应与成本控制'],
      ['05', '产品化上线', '部署、日志、支付与增长闭环'],
    ]
  }
}

const fetchCourses = async () => {
  try {
    const res = await api.get('/api/courses/')
    courses.value = res.map(mapCourse)
  } catch (error) {
    console.error('获取课程列表失败:', error)
  }
}

fetchCourses()

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
  courses,
  authOpen,
  authMode,
  toggleTheme,
  openAuth,
  closeAuth,
  login,
  register,
  logout,
  fetchCourses,
  purchaseCourse,
  purchaseMembership,
  hasCourse: (slug) => purchasedCourses.value.some((item) => item.slug === slug),
})
