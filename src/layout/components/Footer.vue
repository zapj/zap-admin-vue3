<template>
  <div class="footer">
    <div class="version-info">
      ZAP Admin v{{ version }} @ {{ new Date().getFullYear() }} Build Date: #{{ BUILD_TIME }} Built with ❤️ by <a href="https://github.com/zapj/zap-admin-vue3" target="_blank">Zap-Admin-Vue3</a>
    </div>
  </div>
</template>

<script setup lang="ts">

const version = import.meta.env.VITE_ZAP_ADMIN_VERSION
const BUILD_TIME = import.meta.env.VITE_BUILD_TIME
</script>

<style scoped>
.footer {
  padding: 15px 0;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.version-info {
  margin: 0;
}
</style>