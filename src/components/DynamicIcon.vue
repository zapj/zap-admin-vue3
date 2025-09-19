<template>
  <div>
    <Icon :icon="icon" />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>