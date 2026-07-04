<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text)]">
    <SiteHeader />
    <main>
      <router-view />
    </main>
    <SiteFooter />
    <AuthModal />
  </div>
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import AuthModal from './components/AuthModal.vue'
</script>
