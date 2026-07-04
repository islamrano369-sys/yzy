<template>
  <footer class="border-t border-[var(--line)] bg-[var(--bg-soft)] py-12">
    <div class="page-shell grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
      <div>
        <div class="mb-4 flex items-center gap-3">
          <span class="grid size-9 place-items-center rounded-xl bg-[var(--mint)] font-black text-[#17142f]">N</span>
          <span class="text-lg font-extrabold">NOVA AI</span>
        </div>
        <p class="max-w-sm text-sm leading-7 text-[var(--muted)]">让 AI 编程从概念变成可交付的产品能力。课程、智能体与持续成长体系，一处完成。</p>
      </div>
      <div>
        <h3 class="mb-4 text-sm font-bold">探索</h3>
        <div class="grid gap-3 text-sm text-[var(--muted)]">
          <RouterLink to="/courses">AI 编程课</RouterLink>
          <RouterLink to="/agents">AI 智能体</RouterLink>
          <RouterLink to="/membership">会员套餐</RouterLink>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-sm font-bold">服务说明</h3>
        <div class="grid gap-3 text-sm text-[var(--muted)]">
          <span>前端交互演示</span>
          <span>支付宝模拟支付</span>
          <span>© 2026 NOVA AI</span>
        </div>
      </div>
    </div>
  </footer>
</template>
