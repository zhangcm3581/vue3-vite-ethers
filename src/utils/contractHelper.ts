import { JsonRpcSigner } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { config } from '@/config'

// abi
import Erc20Abi from '@/abi/Erc20.json'
import { erc20Contract } from '@/contract/erc20Contract'

// provider
let provider
try {
  provider = new ethers.providers.Web3Provider(window.ethereum)
} catch (error) {
  provider = new ethers.providers.JsonRpcProvider(config.provider)
}

const signer: JsonRpcSigner = provider.getSigner()

export const getContract = (abi: any, address: string) => {
  const signerOrProvider = signer
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getErc20ContractInstance = (address: string) => {
  return getContract(Erc20Abi, address)
}

export const getUsdtContract = (address: string = config.usdt) => {
  return erc20Contract(address)
}
