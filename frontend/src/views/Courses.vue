<template>
  <div>
    <section class="border-b border-[var(--line)] bg-[var(--bg-soft)] py-24">
      <div class="page-shell"><p class="kicker">AI programming courses</p><h1 class="section-title max-w-4xl">不是多学一个工具，<br>而是建立完整交付能力。</h1><p class="section-copy mt-7">两门课程分别覆盖 AI 应用产品化与智能体工程。选择当前最需要的能力开始。</p></div>
    </section>
    <section class="section-space">
      <div class="page-shell grid gap-6 lg:grid-cols-2"><CourseCard v-for="course in courses" :key="course.slug" :course="course" /></div>
    </section>
    <section class="section-space bg-[var(--bg-soft)]">
      <div class="page-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p class="kicker">Choose your path</p><h2 class="section-title">从目标出发，选择正确路径。</h2></div>
        <div class="grid gap-4">
          <article class="surface-card p-7"><h3 class="text-xl font-black">想独立完成一个 AI 产品</h3><p class="mt-3 text-[var(--muted)]">选择「AI 应用全栈实战」，覆盖界面、服务端、模型、支付和上线。</p></article>
          <article class="surface-card p-7"><h3 class="text-xl font-black">想构建复杂自动化工作流</h3><p class="mt-3 text-[var(--muted)]">选择「AI 智能体工程课」，深入工具调用、记忆、评测与失败恢复。</p></article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import CourseCard from '../components/CourseCard.vue'
import { useStore } from '../composables/useStore'

const { courses } = useStore()
</script>
