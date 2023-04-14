import { Sign } from "@/types/account";
import { defineStore } from "pinia";

const useAccountStore = defineStore('user', {
  // 开启数据持久化
  persist: true,
  state: () => {
    return {
      account: '',
      sign: {
        address: '',
        message: '',
        signature: ''
      }
    }
  },
  getters: {},
  actions: {
    changeAccount(account: string) {
      this.account = account

    },
    changeSign(sign: Sign) {
      this.sign = sign
    }
  }
})

export default useAccountStore