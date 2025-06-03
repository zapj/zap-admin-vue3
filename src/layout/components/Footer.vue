<template>
  <footer class="footer">
    <div class="footer-content">
      <span>© {{ currentYear }} Admin System. All Rights Reserved.</span>
      <span class="divider">|</span>
      <span>Version 1.0.0</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  height: 30px;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 12px;
}

.footer-content {
  text-align: center;
}

.divider {
  margin: 0 10px;
  color: #dcdfe6;
}
</style>
