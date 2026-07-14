<template>
  <div class="app-layout">

    <Sidebar />

    <div class="main-wrapper">

      <Navbar />

      <main class="content">
        <RouterView />
      </main>

    </div>

  </div>
</template>

<script setup>
import { RouterView } from "vue-router";

import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 24px;
}
</style>