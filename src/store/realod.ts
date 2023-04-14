import { defineStore } from "pinia";
import { nextTick } from 'vue'
const useReloadStore = defineStore('reload', {
  state: () => {
    return {
      isRouterAlive: true
    }
  },
  getters: {},
  actions: {
    reload() {
      this.isRouterAlive = false;
      nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
})

export default useReloadStore