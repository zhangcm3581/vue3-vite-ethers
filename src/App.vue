
<template>
  <router-view v-if="reloadStore.isRouterAlive"></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useStore from "./store"
import { useAccount } from './hooks/useAccount';
import currentLocale from './hooks/useLocale'
const { reloadStore } = useStore()
const { listenWallet, connectWallet } = useAccount()

console.log(currentLocale(), 'currentLocale')

onMounted(async () => {
  connectWallet()
  listenWallet()
})


</script>

<style lang="scss">
// 必须有内容。全局scss文件才可以正确引入
</style>
