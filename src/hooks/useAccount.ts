import useStore from '@/store'
import ethers from '@/utils/ethersUtils'
import { Toast } from 'vant'
import { toUpperCase } from '@/utils/utils'
export const useAccount = () => {

  const { accountStore, reloadStore } = useStore()

  const getCurrentAccount = () => {
    return accountStore.account
  }

  // 链接
  const connectWallet = async () => {
    await ethers.connectWallet()
    reloadStore.reload()
  }


  // 取消链接
  const disConnectWallet = () => {
    accountStore.changeAccount('')
    accountStore.changeSign({
      signature: '',
      address: '',
      message: ''
    })
    reloadStore.reload()
  }

  // 签名
  const signData = async () => {
    const resp: any = await ethers.connectWallet()
    if (!resp.success) return
    const message = Math.random().toString(36).slice(-8)
    const signRes = await ethers.signData(message)
    if (!signRes.success) {
      accountStore.changeAccount('')
      return Toast(signRes.result)
    }
    const signnature = signRes.result

    const messageRes = await ethers.hashMessage(message)

    const messageHash = messageRes.result
    const params = {
      address: accountStore.account,
      message: messageHash,
      signature: signnature
    }
    accountStore.changeSign(params)
    reloadStore.reload()
  }

  // 监听钱包
  const listenWallet = () => {
    // 账号切换
    try {
      window.ethereum.on('accountsChanged', (account: Array<string>) => {
        disConnectWallet()
        location.reload()
      })
      // 断开链接
      window.ethereum.on('disconnect', () => {
        disConnectWallet()
        location.reload()
      })
    } catch (error) { }
  }

  // 是否签名
  const isSign = () => {
    return accountStore.account && (toUpperCase(accountStore.account) === toUpperCase(accountStore.sign.address))
  }

  return {
    getCurrentAccount,
    connectWallet,
    listenWallet,
    disConnectWallet,
    signData,
    isSign
  }
}