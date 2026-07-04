<template>
  <div class="overflow-hidden">
    <section class="soft-grid relative border-b border-[var(--line)]">
      <div class="page-shell grid min-h-[720px] items-center gap-16 py-20 lg:grid-cols-[1.2fr_.8fr]">
        <div class="reveal">
          <p class="kicker">AI Learning Studio</p>
          <h1 class="max-w-4xl text-[clamp(54px,8vw,104px)] font-black leading-[.9] tracking-[-.075em]">编程不再是门槛，<span class="text-[var(--coral)]">创造</span>才是。</h1>
          <p class="section-copy mt-8">两门项目制课程、八个行业智能体和一套持续成长的会员体系，把 AI 能力变成真正可交付的产品。</p>
          <div class="mt-9 flex flex-wrap gap-3">
            <RouterLink to="/courses" class="btn-primary">查看课程 <ArrowRight :size="18" /></RouterLink>
            <RouterLink to="/agents" class="btn-secondary">体验智能体</RouterLink>
          </div>
        </div>
        <div class="relative hidden min-h-[520px] lg:block">
          <div class="absolute right-0 top-0 w-[86%] rounded-[36px] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow)]">
            <div class="mb-12 flex items-center justify-between"><span class="text-sm font-extrabold">NOVA / 课程进度</span><span class="rounded-full bg-[var(--mint)] px-3 py-1 text-xs font-black text-[#17142f]">正在学习</span></div>
            <h2 class="text-4xl font-black tracking-[-.05em]">AI 应用全栈实战</h2>
            <p class="mt-3 text-[var(--muted)]">模块 03 · 模型接入与流式交互</p>
            <div class="mt-10 h-2 overflow-hidden rounded-full bg-[var(--bg-soft)]"><div class="h-full w-[68%] rounded-full bg-[var(--coral)]"></div></div>
            <div class="mt-5 flex justify-between text-sm font-bold"><span>学习进度</span><span>68%</span></div>
          </div>
          <div class="absolute bottom-0 left-0 w-[72%] rounded-[30px] bg-[var(--lavender)] p-7 text-[#17142f] shadow-[var(--shadow)]">
            <Bot :size="36" />
            <p class="mt-12 text-sm font-black uppercase tracking-[.14em]">Agent workspace</p>
            <h3 class="mt-3 text-3xl font-black tracking-[-.05em]">把重复工作，交给智能体。</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-[var(--line)] bg-[var(--mint)] text-[#17142f]">
      <div class="page-shell grid grid-cols-2 divide-x divide-[#17142f]/20 lg:grid-cols-4">
        <div v-for="([value, label], index) in metrics" :key="label" class="px-5 py-10" :class="{ 'border-t border-[#17142f]/20 lg:border-t-0': index > 1 }">
          <div class="text-5xl font-black tracking-[-.06em]">{{ value }}</div><div class="mt-2 text-sm font-bold">{{ label }}</div>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <p class="kicker">Core courses</p>
        <div class="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 class="section-title">从第一行提示词，到可以交付的 AI 产品。</h2>
          <p class="section-copy lg:max-w-sm">不堆砌工具清单。每门课程都围绕真实产品和稳定工作流展开。</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-2"><CourseCard v-for="course in courses" :key="course.slug" :course="course" /></div>
      </div>
    </section>

    <section class="section-space bg-[var(--bg-soft)]">
      <div class="page-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <div><p class="kicker">Learning path</p><h2 class="section-title">四步完成一次真实交付。</h2><p class="section-copy mt-6">每个阶段都有明确产出，避免“看懂了却做不出来”。</p></div>
        <div class="grid gap-px overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          <article v-for="(item, index) in learningPath" :key="item.title" class="bg-[var(--surface)] p-7">
            <span class="text-sm font-black text-[var(--brand)]">0{{ index + 1 }}</span><h3 class="mt-10 text-2xl font-black">{{ item.title }}</h3><p class="mt-3 leading-7 text-[var(--muted)]">{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <div class="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p class="kicker">AI agents</p><h2 class="section-title">让智能体进入真实工作。</h2></div><RouterLink to="/agents" class="btn-secondary">全部智能体 <ArrowRight :size="17" /></RouterLink></div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><AgentCard v-for="agent in agents.slice(0, 4)" :key="agent.slug" :agent="agent" /></div>
      </div>
    </section>

    <section class="section-space bg-[#17142f] text-white">
      <div class="page-shell grid items-center gap-14 lg:grid-cols-2">
        <div><p class="kicker !text-[var(--mint)]">NOVA Membership</p><h2 class="section-title">持续使用，持续更新，持续变强。</h2><p class="mt-6 max-w-xl text-lg leading-8 text-white/65">解锁全部行业智能体、课程专属折扣和会员工作流。把一次尝试变成长期生产力。</p><RouterLink to="/membership" class="btn-primary mt-9">查看会员套餐 <ArrowRight :size="18" /></RouterLink></div>
        <div class="grid gap-4 sm:grid-cols-2"><div v-for="benefit in benefits" :key="benefit.title" class="rounded-[24px] border border-white/15 bg-white/5 p-6"><component :is="benefit.icon" :size="26" class="text-[var(--mint)]" /><h3 class="mt-8 text-xl font-black">{{ benefit.title }}</h3><p class="mt-3 text-sm leading-7 text-white/60">{{ benefit.copy }}</p></div></div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <p class="kicker">Student voices</p><h2 class="section-title mb-12">学习结果，来自真实的完成。</h2>
        <div class="grid gap-5 lg:grid-cols-3"><blockquote v-for="item in testimonials" :key="item.name" class="surface-card p-7"><Quote :size="24" class="text-[var(--coral)]" /><p class="my-8 text-lg font-semibold leading-8">“{{ item.quote }}”</p><footer><strong>{{ item.name }}</strong><span class="ml-2 text-sm text-[var(--muted)]">{{ item.role }}</span></footer></blockquote></div>
      </div>
    </section>

    <section class="section-space pt-0">
      <div class="page-shell rounded-[36px] bg-[var(--coral)] px-7 py-14 text-[#17142f] sm:px-12 lg:flex lg:items-end lg:justify-between">
        <div><p class="text-sm font-black uppercase tracking-[.14em]">Start building</p><h2 class="mt-5 max-w-3xl text-[clamp(42px,6vw,78px)] font-black leading-[.95] tracking-[-.065em]">下一次打开浏览器，就开始创造。</h2></div>
        <RouterLink to="/courses" class="mt-9 inline-flex size-24 shrink-0 items-center justify-center rounded-full bg-[#17142f] text-white lg:mt-0"><ArrowUpRight :size="34" /></RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, ArrowUpRight, Bot, BrainCircuit, Layers3, Quote, Sparkles, Workflow } from '@lucide/vue'
import AgentCard from '../components/AgentCard.vue'
import CourseCard from '../components/CourseCard.vue'
import { agents, courses, metrics, testimonials } from '../data/site'

const learningPath = [
  { title: '理解', copy: '明确问题、用户、模型能力与产品边界。' },
  { title: '构建', copy: '用组件、接口和工作流完成可运行版本。' },
  { title: '发布', copy: '接入身份、支付和部署，完成真实交付。' },
  { title: '迭代', copy: '基于数据和反馈优化效果、成本与体验。' },
]

const benefits = [
  { title: '全部智能体', copy: '覆盖电商、教育、内容、数据等真实场景。', icon: BrainCircuit },
  { title: '专属工作流', copy: '把高频任务保存为稳定、可复用的流程。', icon: Workflow },
  { title: '课程折扣', copy: '会员购买系统课程享受长期专属价格。', icon: Layers3 },
  { title: '持续更新', copy: '新智能体、新模板和新方法持续加入。', icon: Sparkles },
]
</script>
