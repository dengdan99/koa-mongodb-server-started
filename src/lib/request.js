const config = require('config')
const axios = require('axios')

const instance = axios.create({
  baseURL: config.get('api.host'),
  timeout: 1000
})

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
instance.interceptors.response.use((response) => {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

module.exports = instance
