import router from '../router'
import { Toast } from 'vant'
export const handleToPage = (url: string) => {
  if (url) {
    // 跳转
    router.push(url)
  } else {
    router.replace('/')
  }
}
export const handleBack = () => {
  router.go(-1)
}

// 钱包地址格式化
export const formatAddress = (value: string, flag = '...', num = 3, laseNmu = 3) => {
  if (!value) return 0
  const startAddress = value.slice(0, num)
  const endAddress = value.slice(-laseNmu)
  const address = startAddress + flag + endAddress
  return address
}

// 货币四位小数
export const formatBalance = (value: string | number, num: number = 4) => {
  if (!value) return 0
  value = typeof (value) === 'string' ? value : value.toString()
  let regex = new RegExp(`^\\d+(?:\\.\\d{0,${num}})?`)
  value = Number(value.match(regex))
  return value
}

// 都转为大写
export const toUpperCase = (value: string) => {
  return value.toUpperCase()
}

// 都转为小写
export const toLowerCase = (value: string): string => {
  return value.toLowerCase()
}


export const formatNumber = (value: string | number): string => {
  const [integerPart, decimalPart = ''] = value.toString().split('.')
  const formattedIntegerPart = integerPart.replace(/\d(?=(\d{3})+$)/g, '$&,')
  return `${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ''}`
}



export const getMaxDate = (date1: Date) => {
  const nowDate = new Date().getTime()
  const date = new Date(date1).getTime()
  return nowDate > date
}

// 索引得到26字母 0对应A, 25对应Z
export const filterLetters = (i: number) => {
  if (i >= 0 && i <= 25) {
    return String.fromCharCode(65 + i);
  } else {
    return undefined
  }
}

export const handleCopy = (value: string) => {
  const text = document.createElement('textarea')
  text.value = value
  document.body.appendChild(text)
  text.select() // 选择对象
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    Toast('success')
  }
  // 执行浏览器复制命令
  document.body.removeChild(text)
}

// 获取图片
export const getImage = (name) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}

// 处理错误信息
export const getErrorByString = (error: string) => {
  const reg = new RegExp('execution reverted:\\s*(.*)', 'i');
  const regExp = /execution reverted: ([^"]*)/;
  const result = regExp.exec(reg.exec(error)[0]);
  if (result !== null) {
    const errorMessage = result[1];
    return errorMessage
  }
  return ''
}
