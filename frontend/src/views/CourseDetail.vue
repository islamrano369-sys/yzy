<template>
  <NotFound v-if="!course" />
  <div v-else>
    <section class="border-b border-[var(--line)] py-20">
      <div class="page-shell grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div><RouterLink to="/courses" class="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)]"><ArrowLeft :size="16" /> 返回课程</RouterLink><p class="kicker">{{ course.level }} · {{ course.duration }}</p><h1 class="text-[clamp(52px,7vw,92px)] font-black leading-[.93] tracking-[-.07em]">{{ course.title }}</h1><p class="section-copy mt-7">{{ course.description }}</p><div class="mt-9 flex flex-wrap gap-3"><button class="btn-primary" @click="buy">{{ hasCourse(course.slug) ? '已购买，进入个人中心' : `立即购买 ¥${course.price}` }} <ArrowRight :size="18" /></button><span class="btn-secondary line-through opacity-60">原价 ¥{{ course.originalPrice }}</span></div></div>
        <div class="rounded-[32px] p-8 text-[#17142f]" :class="course.accent === 'mint' ? 'bg-[var(--mint)]' : 'bg-[var(--coral)]'"><Code2 :size="40" /><p class="mt-24 text-sm font-black uppercase tracking-[.13em]">Course outcome</p><h2 class="mt-4 text-4xl font-black tracking-[-.055em]">完成课程后，独立交付可运行作品。</h2><div class="mt-10 grid gap-3 text-sm font-bold"><span v-for="item in course.outcomes" :key="item" class="flex items-center gap-2"><Check :size="17" />{{ item }}</span></div></div>
      </div>
    </section>
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p class="kicker">Curriculum</p><h2 class="section-title">课程大纲</h2><p class="section-copy mt-6">每个模块都以可验证的产出结束。</p></div><div class="divide-y divide-[var(--line)] border-y border-[var(--line)]"><article v-for="item in course.syllabus" :key="item[0]" class="grid gap-4 py-7 sm:grid-cols-[56px_1fr_1.5fr]"><strong class="text-[var(--brand)]">{{ item[0] }}</strong><h3 class="font-black">{{ item[1] }}</h3><p class="text-sm leading-7 text-[var(--muted)]">{{ item[2] }}</p></article></div></div>
    </section>
    <section class="section-space bg-[var(--bg-soft)]"><div class="page-shell"><p class="kicker">Build for real</p><h2 class="section-title mb-10">课程中的实战项目</h2><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><article v-for="(project, index) in course.projectsList" :key="project" class="surface-card p-6"><span class="text-sm font-black text-[var(--coral)]">0{{ index + 1 }}</span><h3 class="mt-16 text-xl font-black">{{ project }}</h3></article></div></div></section>
    <section class="section-space"><div class="page-shell grid gap-8 lg:grid-cols-2"><div><p class="kicker">Who it is for</p><h2 class="section-title">适合现在的你。</h2></div><ul class="grid gap-4"><li v-for="item in course.audience" :key="item" class="surface-card flex items-center gap-4 p-5 font-bold"><span class="grid size-9 place-items-center rounded-full bg-[var(--lavender)] text-[#17142f]"><Check :size="18" /></span>{{ item }}</li></ul></div></section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, Check, Code2 } from '@lucide/vue'
import NotFound from './NotFound.vue'
import { useStore } from '../composables/useStore'

const route = useRoute()
const router = useRouter()
const { user, openAuth, hasCourse, courses } = useStore()
const course = computed(() => courses.value.find((item) => item.slug === route.params.slug))
const buy = () => {
  if (hasCourse(course.value.slug)) return router.push('/profile')
  if (!user.value) return openAuth('login')
  router.push(`/checkout/course/${course.value.slug}`)
}
</script>
