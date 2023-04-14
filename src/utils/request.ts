import axios, { AxiosRequestHeaders } from 'axios'
import { Toast } from 'vant'
import { config } from '@/config'


// import router from '../router'

axios.defaults.timeout = 8000

const request = (
  method:string,
  url:string,
  params:any,
  needToken:boolean = true,
  headerContentType:string = 'application/json'
) => {
  const headers:AxiosRequestHeaders = {
    'Content-type': headerContentType
  }
  if (needToken) {
  }
  return new Promise((resolve, reject) => {
    axios({
      method,
      headers,
      baseURL: config.baseUrl,
      url,
      timeout: 15000,
      params: method === 'GET' || method === 'DELETE' ? params : null, // 是即将与请求一起发送的 URL 参数
      data: method === 'POST' || method === 'PUT' ? params : null // 是作为请求主体被发送的数据
    })
      .then(res => {
        Toast.clear()
        if (res.data.code === 200) {
          res.data.success = true
          resolve(res.data)
        }
      }).catch((error) => {
        Toast.clear()
        let messageText = ''
        if (
          error.response &&
        error.response.data &&
        error.response.data.message
        ) {
          messageText = error.response.data.message
        } else {
        // messageText = error.response ? getErrorMessage(error.response.status) : 'Network exception'
          messageText = 'Network exception'
        }
        Toast.fail(messageText)
        // reject(error)
        resolve({
          success: false,
          records: [],
          result: {},
          total: 0,
          message: 'Network exception'
        })
      })
  })
}

export default request
