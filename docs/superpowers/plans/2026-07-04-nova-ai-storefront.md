# NOVA AI Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个完整可交互的 NOVA AI 中文课程售卖前台，覆盖课程、智能体、会员、结账、登录弹窗、个人中心和深浅主题。

**Architecture:** 使用 Vue 3 SPA 和 Vue Router 管理页面；静态业务数据集中在 `data/site.js`，跨页面模拟状态集中在 `composables/useStore.js` 并持久化到 `localStorage`。共享壳层负责导航、页脚和登录弹窗，页面组件仅组合数据与触发状态动作。

**Tech Stack:** Vue 3、Vue Router、Tailwind CSS v4、Vite、lucide-vue-next、localStorage

---

## 文件结构

创建：

- `frontend/src/data/site.js`：课程、智能体、套餐、FAQ、评价和首页数据
- `frontend/src/composables/useStore.js`：主题、登录、会员、课程和订单状态
- `frontend/src/components/SiteHeader.vue`：桌面与移动导航、主题和用户入口
- `frontend/src/components/SiteFooter.vue`：品牌和页脚导航
- `frontend/src/components/AuthModal.vue`：登录注册弹窗
- `frontend/src/components/CourseCard.vue`：课程卡片
- `frontend/src/components/AgentCard.vue`：智能体卡片
- `frontend/src/components/PricingCard.vue`：会员套餐卡片
- `frontend/src/components/FaqList.vue`：FAQ 折叠列表
- `frontend/src/views/Courses.vue`：课程列表
- `frontend/src/views/CourseDetail.vue`：课程详情
- `frontend/src/views/Checkout.vue`：课程或会员结账
- `frontend/src/views/Agents.vue`：智能体列表
- `frontend/src/views/AgentDetail.vue`：智能体详情与工作台
- `frontend/src/views/Membership.vue`：套餐与 FAQ
- `frontend/src/views/Profile.vue`：个人中心
- `frontend/src/views/NotFound.vue`：无效路由

修改：

- `frontend/package.json`：增加图标依赖
- `frontend/package-lock.json`：同步依赖锁
- `frontend/index.html`：中文语言、标题和主题初始化
- `frontend/src/App.vue`：全局站点壳层
- `frontend/src/router/index.js`：完整路由和滚动行为
- `frontend/src/style.css`：主题令牌、全局组件样式与动效
- `frontend/src/views/Home.vue`：八板块首页

删除：

- `frontend/src/views/Login.vue`：登录改为全局弹窗
- `frontend/src/components/HelloWorld.vue`：移除脚手架冗余组件

## Task 1：建立依赖、数据和全局状态

**Files:**

- Modify: `frontend/package.json`
- Modify: `frontend/package-lock.json`
- Create: `frontend/src/data/site.js`
- Create: `frontend/src/composables/useStore.js`

- [ ] **Step 1：安装图标依赖**

Run:

```powershell
npm install lucide-vue-next
```

Expected: `package.json` 和 `package-lock.json` 出现 `lucide-vue-next`。

- [ ] **Step 2：定义静态业务数据**

`site.js` 导出以下稳定标识：

```js
export const courses = [
  { slug: 'ai-fullstack', title: 'AI 应用全栈实战', price: 699 },
  { slug: 'agent-engineering', title: 'AI 智能体工程课', price: 899 },
]

export const agents = [
  { slug: 'ecommerce-copilot', industry: '电商运营' },
  { slug: 'lesson-planner', industry: '教育培训' },
  { slug: 'content-studio', industry: '内容创作' },
  { slug: 'contract-reviewer', industry: '法律合同' },
  { slug: 'interview-coach', industry: '招聘面试' },
  { slug: 'data-analyst', industry: '数据分析' },
  { slug: 'support-desk', industry: '客户服务' },
  { slug: 'product-researcher', industry: '产品研究' },
]

export const plans = [
  { id: 'monthly', title: '月度会员', price: 49 },
  { id: 'yearly', title: '年度会员', price: 399, featured: true },
  { id: 'lifetime', title: '永久会员', price: 1299 },
]
```

每条课程补齐简介、标签、课时、难度、项目、详情大纲、适合人群和保障；每条智能体补齐名称、能力、示例和模拟结果；套餐补齐权益；同时导出 FAQ、评价和首页指标。

- [ ] **Step 3：实现集中状态**

`useStore.js` 暴露以下接口：

```js
export function useStore() {
  return {
    theme,
    user,
    membership,
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
    hasCourse,
  }
}
```

模块初始化读取 `nova-theme`、`nova-user`、`nova-membership`、`nova-courses`、`nova-orders`；写入失败时保留内存状态；主题变化同步 `document.documentElement.dataset.theme`。

- [ ] **Step 4：提交基础数据与状态**

```powershell
git add frontend/package.json frontend/package-lock.json frontend/src/data/site.js frontend/src/composables/useStore.js
git commit -m "feat: add NOVA AI storefront data and state"
```

## Task 2：实现全局视觉系统和站点壳层

**Files:**

- Modify: `frontend/index.html`
- Modify: `frontend/src/style.css`
- Modify: `frontend/src/App.vue`
- Create: `frontend/src/components/SiteHeader.vue`
- Create: `frontend/src/components/SiteFooter.vue`
- Create: `frontend/src/components/AuthModal.vue`

- [ ] **Step 1：设置页面元信息和首屏主题**

`index.html` 使用 `lang="zh-CN"`，标题为 `NOVA AI｜AI 编程与智能体学习平台`，并在应用加载前从 `nova-theme` 设置根节点主题，避免主题闪烁。

- [ ] **Step 2：建立主题令牌**

`style.css` 定义深色和浅色变量：

```css
:root {
  --bg: #f7f6fb;
  --surface: #ffffff;
  --text: #18162b;
  --muted: #6f6b82;
  --brand: #5c4ce5;
  --coral: #ff6f61;
  --mint: #b7ff70;
  --lavender: #b6a9ff;
}

:root[data-theme='dark'] {
  --bg: #100e24;
  --surface: #1b1837;
  --text: #f8f7ff;
  --muted: #aaa5c4;
  --brand: #8c7cff;
}
```

同时定义容器、按钮、标签、卡片、输入框、焦点态、页面进入动画和响应式规则；所有颜色通过变量引用。

- [ ] **Step 3：实现站点头尾**

`SiteHeader` 提供五个导航入口、移动端菜单、主题按钮和身份入口；当前路由显示激活态。`SiteFooter` 提供品牌说明、导航和版权。

- [ ] **Step 4：实现登录注册弹窗**

`AuthModal` 根据 `authMode` 显示登录或注册表单；提交后调用 `login` 或 `register`，关闭弹窗并显示已登录导航状态。表单为空时显示内联错误，不调用浏览器警告框。

- [ ] **Step 5：组合全局壳层**

`App.vue` 结构固定为：

```vue
<SiteHeader />
<main>
  <router-view />
</main>
<SiteFooter />
<AuthModal />
```

- [ ] **Step 6：提交壳层**

```powershell
git add frontend/index.html frontend/src/style.css frontend/src/App.vue frontend/src/components/SiteHeader.vue frontend/src/components/SiteFooter.vue frontend/src/components/AuthModal.vue
git commit -m "feat: build NOVA AI application shell"
```

## Task 3：实现首页和共享营销卡片

**Files:**

- Modify: `frontend/src/views/Home.vue`
- Create: `frontend/src/components/CourseCard.vue`
- Create: `frontend/src/components/AgentCard.vue`
- Create: `frontend/src/components/PricingCard.vue`
- Create: `frontend/src/components/FaqList.vue`

- [ ] **Step 1：实现共享卡片**

每个卡片组件只接收数据和发出导航动作：

```js
defineProps({
  course: Object,
  agent: Object,
  plan: Object,
})
```

实际组件分别只保留自己的单一 prop。课程和智能体卡片使用 `RouterLink`；套餐卡片发出 `select`；FAQ 组件管理当前展开项。

- [ ] **Step 2：重构首页**

按规格实现八个板块，使用真实中文文案、两门课程数据、四个学习阶段、六个智能体场景、三项会员权益和三条评价。首屏主按钮进入 `/courses`，次按钮进入 `/agents`。

- [ ] **Step 3：验证首页路由与响应式布局**

Run:

```powershell
npm run build
```

Expected: Vite 构建成功，无 Vue 模板错误。

- [ ] **Step 4：提交首页**

```powershell
git add frontend/src/views/Home.vue frontend/src/components/CourseCard.vue frontend/src/components/AgentCard.vue frontend/src/components/PricingCard.vue frontend/src/components/FaqList.vue
git commit -m "feat: create NOVA AI marketing homepage"
```

## Task 4：实现课程与结账流程

**Files:**

- Create: `frontend/src/views/Courses.vue`
- Create: `frontend/src/views/CourseDetail.vue`
- Create: `frontend/src/views/Checkout.vue`

- [ ] **Step 1：实现课程列表**

展示两门课程，并提供课程定位对比、学习保障和课程选择引导。

- [ ] **Step 2：实现课程详情**

通过 `route.params.slug` 查找课程；存在时渲染课程详情和大纲，不存在时跳转 `NotFound`。购买按钮未登录时调用 `openAuth('login')`，已登录时进入 `/checkout/course/:slug`。

- [ ] **Step 3：实现结账页**

根据 `type` 和 `id` 解析课程或套餐；只提供支付宝支付。提交时进入短暂的 `processing` 状态，然后调用 `purchaseCourse` 或 `purchaseMembership`，展示成功状态与后续入口；处理中禁用按钮。

- [ ] **Step 4：提交课程购买流程**

```powershell
git add frontend/src/views/Courses.vue frontend/src/views/CourseDetail.vue frontend/src/views/Checkout.vue
git commit -m "feat: add course catalog and checkout flow"
```

## Task 5：实现智能体与会员流程

**Files:**

- Create: `frontend/src/views/Agents.vue`
- Create: `frontend/src/views/AgentDetail.vue`
- Create: `frontend/src/views/Membership.vue`

- [ ] **Step 1：实现智能体列表**

按行业展示八个智能体，提供会员提示和筛选标签；筛选在当前页面内完成。

- [ ] **Step 2：实现智能体详情与权限**

会员可输入任务并得到当前智能体的模拟结果；空输入显示字段错误。非会员点击运行时显示会员锁定面板，主按钮进入 `/membership`。

- [ ] **Step 3：实现会员套餐**

展示三档套餐、年度推荐标记、权益对比和 FAQ。购买按钮未登录时打开登录弹窗，已登录时进入 `/checkout/membership/:id`。

- [ ] **Step 4：提交智能体与会员**

```powershell
git add frontend/src/views/Agents.vue frontend/src/views/AgentDetail.vue frontend/src/views/Membership.vue
git commit -m "feat: add AI agents and membership flows"
```

## Task 6：实现个人中心和路由收尾

**Files:**

- Create: `frontend/src/views/Profile.vue`
- Create: `frontend/src/views/NotFound.vue`
- Modify: `frontend/src/router/index.js`
- Delete: `frontend/src/views/Login.vue`
- Delete: `frontend/src/components/HelloWorld.vue`

- [ ] **Step 1：实现个人中心**

使用 `profile`、`courses`、`orders` 三个标签状态。未登录进入时打开登录弹窗并返回首页；已登录时显示个人信息、会员状态、课程进度和订单。

- [ ] **Step 2：实现无效路由页面**

提供返回首页和课程列表入口。

- [ ] **Step 3：配置路由**

路由包含规格中的全部路径，设置页面标题，并在导航后滚动到顶部：

```js
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
```

- [ ] **Step 4：移除脚手架页面**

删除不再使用的独立登录页和 HelloWorld 组件。

- [ ] **Step 5：提交路由与个人中心**

```powershell
git add frontend/src/router/index.js frontend/src/views/Profile.vue frontend/src/views/NotFound.vue
git rm frontend/src/views/Login.vue frontend/src/components/HelloWorld.vue
git commit -m "feat: complete profile and application routes"
```

## Task 7：构建与浏览器验收

**Files:**

- Modify only when verification finds a concrete issue

- [ ] **Step 1：执行生产构建**

```powershell
npm run build
```

Expected: `vite build` 成功，生成 `frontend/dist`。

- [ ] **Step 2：在 Chrome 验证桌面端**

检查：首页、课程详情、课程支付成功、会员支付成功、智能体会员解锁、个人中心、登录注册弹窗和主题切换。

- [ ] **Step 3：验证移动端**

在窄视口检查移动导航、卡片单列、结账布局和弹窗边界。

- [ ] **Step 4：验证持久化**

刷新页面后确认主题、登录、会员、已购课程和订单仍保留。

- [ ] **Step 5：修复验收问题并重新构建**

每次修复后重新运行 `npm run build`，直到无编译错误且核心流程可完成。

- [ ] **Step 6：提交验收修复**

```powershell
git add frontend
git commit -m "fix: polish NOVA AI storefront experience"
```
