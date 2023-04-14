import { ethers } from 'ethers'
import useStore from '@/store'
import { Toast } from 'vant'
import { config } from '@/config'
import { BigNumber } from '@ethersproject/bignumber'

const ethereum: any = window.ethereum

// 统一错误返回
const failResult = <T extends Error | string>(result: T): web3Result<T> => ({
  success: false,
  result
})// 统一成功返回
const successResult = <T>(result: T): web3Result<T> => ({ success: true, result })


const connectWallet = async () => {
  const { accountStore } = useStore()
  try {
    if (!window.ethereum) {
      alert('make sure you have metamask!')
      return false
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    accountStore.changeAccount(accounts[0])
    const ethChainId = await window.ethereum.request({ method: 'eth_chainId' })
    const ethChainNumberId = ethers.utils.hexlify(parseInt(config.ethChainNumberId))

    if (ethChainId !== ethChainNumberId) {
      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [config.chainConfig]
        })
        .then(() => {
          location.reload()
        })
    }

    return successResult(accounts[0])
  } catch (error) {
    accountStore.changeAccount('')
    return failResult(error)
  }
}

/**
 * 签名数据
 * @account 需要签名的账户
 * @data 需要签名的数据
 * @privatekey 私钥
 * @return 签名后的数据
 */
const signData = async (message: string) => {
  const { accountStore } = useStore()
  if (!accountStore.account) await connectWallet()
  try {
    const signature = await window.ethereum
      .request({ method: "personal_sign", params: [accountStore.account, message] },
      )
    return successResult(signature)
  } catch (error: any) {
    Toast(error)
    return failResult(error)
  }
}

/**
 * 计算给定消息的哈希
 * @message 要进行哈希计算的消息
 * @return 哈希过的消息
 */
const hashMessage = async (message: string) => {
  try {
    const resp = await ethers.utils.hashMessage(message)
    return successResult(resp)
  } catch (err) {
    console.error(err)
    return failResult(err)
  }
}



/**
 * @description: 大小写地址矫正
 * @param {*} address
 * @return {*}
 */
export function transLegalAddress(address: string) {
  const account = ethers.utils.getAddress(address);
  return account;
}

/**
 * 转账
 * @fromAddress 当前地址
 * @toAddress 目的地址
 * @value 数额
 */
const transfer = async (toAddress, value, options = {}) => {
  let transaction = {
    from: ethereum.selectedAddress,
    to: toAddress,
    value: ethers.utils.parseEther(value)._hex,
    "gas": "0x5208", // 21000
    // "gasPrice": "0x9184e72a000", // 10000000000000
    ...options
    // chainId: ethers.utils.parseEther('56')._hex
  }
  try {
    const resp = await ethereum.request({ method: 'eth_sendTransaction', params: [transaction] })
    // try {
    //    const resp1 =  await provider.waitForTransaction(resp)
    //    return successResult(resp1)
    // } catch (err) {
    //   return failResult(err)
    // }
    return successResult(resp)
  } catch (err) {
    return failResult(err)
  }
}

// add 10%
const calculateGasMargin = (value: BigNumber, margin = 1000): BigNumber => {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000))
}


export default {
  failResult,
  successResult,
  connectWallet,
  signData,
  hashMessage,
  transfer,
  calculateGasMargin
}