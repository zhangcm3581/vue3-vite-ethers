import { getErc20ContractInstance } from '@/utils/contractHelper'
import { formatBigNumber, getBalanceNumber, toWei } from '@/utils/formatBalance'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import etherUtils from "@/utils/ethersUtils"
import { toastMsg } from '@/utils/toast'

import { useAccount } from '@/hooks/useAccount'

export const erc20Contract = (address: any) => {

  const erc20Contract = getErc20ContractInstance(address)

  const account = useAccount().getCurrentAccount()



  // 账户余额
  const balanceOf = async () => {
    try {
      const resp = await erc20Contract.balanceOf(account)
      return etherUtils.successResult<string>(formatBigNumber(resp))
    } catch (error) {
      return etherUtils.failResult(error)
    }
  }

  // 授权额度
  // @spender 合约地址
  const allowance = async (spender: string) => {
    try {
      const resp = await erc20Contract.allowance(account, spender)
      return etherUtils.successResult(getBalanceNumber(new BigNumber(resp ? resp.toString() : 0)))
    } catch (error) {
      return etherUtils.failResult(error)
    }
  }

  // 授权
  // @spender 合约地址
  const approve = async (spender: string) => {
    try {
      const tx = await (await erc20Contract.approve(spender, ethers.constants.MaxUint256)).wait()
      return etherUtils.successResult(tx)
    } catch (error) {
      toastMsg(error)
      return etherUtils.failResult(error)
    }
  }

  // 转账
  // @spender 合约地址
  // @amount 数量
  const transfer = async (spender: string, amount: number) => {
    try {
      const tx = await (await erc20Contract.transfer(spender, toWei(amount), { gasLimit: 21000 })).wait()
      return etherUtils.successResult(tx)
    } catch (error: any) {
      toastMsg(error)
      return etherUtils.failResult(error)
    }
  }

  return {
    erc20Contract,
    balanceOf,
    allowance,
    approve,
    transfer
  }
}
