// config/env.production.ts
// 正式环境配置
export default {
  env: 'production',
  baseUrl: 'https://ts.bljcoco.com/api',
  brokerUrl: 'https://old.metabills.finance', // 经纪人LP解锁入口
  provider: 'https://bsc-dataseed1.ninicoin.io', // bsc provider
  // 币安链ID
  ethChainNumberId: 56,
  // 币安链配置
  chainConfig: {
    chainId: '0x38',
    chainName: 'BSC Main',
    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    blockExplorerUrls: ['https://bscscan.com/']
  },
  metaAddress:'https://metabills.finance',

  // tokenAddress
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',

  // contract
  crowdfunding:'0x4817ff75934A7a552bECA331D4f5a6A3d9aB332f',
}