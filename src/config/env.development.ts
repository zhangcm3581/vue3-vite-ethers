// config/env.development.ts
// 本地环境配置
export default {
  env: 'development',
  baseUrl: 'http://127.0.0.1:8080',
  brokerUrl: 'https://web-ts-dapp-test.bljcoco.com/',
  provider: 'https://data-seed-prebsc-1-s1.binance.org:8545', // bsc provider
  // 币安测试链ID
  ethChainNumberId: 97,
  // 币安链配置
  chainConfig: {
    chainId: '0x61',
    chainName: 'Smart Chain - Testnet',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    blockExplorerUrls: ['https://testnet.bscscan.com']
  },

  metaAddress:'https://test.metabills.finance',
  // tokenAddress
  BNB: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',

  // contract
  crowdfunding:'0x77cC423B7b1Cd94B4cfFfc92d9D9bABF87563a08'
}