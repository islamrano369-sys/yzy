<template>
  <RouterLink :to="`/courses/${course.slug}`" class="group surface-card flex min-h-[350px] flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
    <div class="flex min-h-40 items-end justify-between p-6" :class="course.accent === 'mint' ? 'bg-[var(--mint)] text-[#17142f]' : 'bg-[var(--coral)] text-[#17142f]'">
      <span class="max-w-[240px] text-3xl font-black leading-none tracking-[-0.055em]">{{ course.shortTitle }}</span>
      <span class="grid size-11 place-items-center rounded-full bg-[#17142f] text-white transition group-hover:rotate-45"><ArrowUpRight :size="20" /></span>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <div class="mb-4 flex flex-wrap gap-2 text-xs font-bold text-[var(--muted)]">
        <span>{{ course.level }}</span><span>·</span><span>{{ course.duration }}</span><span>·</span><span>{{ course.projects }}</span>
      </div>
      <p class="mb-7 leading-7 text-[var(--muted)]">{{ course.description }}</p>
      <div class="mt-auto flex items-end justify-between">
        <div><span class="text-sm text-[var(--muted)]">一次购买</span><div class="text-3xl font-black">¥{{ course.price }}</div></div>
        <span class="font-bold text-[var(--brand)]">查看详情</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { ArrowUpRight } from '@lucide/vue'
defineProps({ course: { type: Object, required: true } })
</script>
