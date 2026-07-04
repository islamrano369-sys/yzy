<template>
  <RouterLink :to="`/agents/${agent.slug}`" class="group flex min-h-[250px] flex-col rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--brand)]">
    <div class="mb-8 flex items-start justify-between">
      <span class="rounded-full bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-extrabold text-[var(--brand)]">{{ agent.industry }}</span>
      <LockKeyhole :size="17" class="text-[var(--muted)]" />
    </div>
    <h3 class="mb-3 text-2xl font-extrabold tracking-[-0.04em]">{{ agent.name }}</h3>
    <p class="leading-7 text-[var(--muted)]">{{ agent.description }}</p>
    <div class="mt-auto flex items-center gap-2 pt-7 text-sm font-bold text-[var(--brand)]">查看并使用 <ArrowRight :size="16" class="transition group-hover:translate-x-1" /></div>
  </RouterLink>
</template>

<script setup>
import { ArrowRight, LockKeyhole } from '@lucide/vue'
defineProps({ agent: { type: Object, required: true } })
</script>
