import request from '@/utils/request'

// 获取用户等级条件
export const getDeptList = (params?) => {
  return request('GET', '/dept/list', params)
}

// 获取用户等级条件
export const queryTransfer = (params?) => {
  return request('POST', '/account/transfer', params)
}

