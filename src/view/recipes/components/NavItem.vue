<template>
   <li>
    <a :href="href"
      :class="['block px-1 py-2 rounded-md', { 'bg-amber-100 text-amber-700': isActive }]"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script setup lang='ts'>
const props = defineProps<{
  href?: string,
  isActive?: Boolean,
}>()
</script>

<style scoped lang="scss">

</style>
