import request from '@/utils/request'


export default {
  createNative(orderId) {
    return request({
      url: `/api/order/alipay/createNative/${orderId}`,
      method: `get`
    })
  },
  queryPayStatus(orderId) {
    return request({
      url: `/api/order/alipay/queryPayStatus/${orderId}`,
      method: 'get'
    })
  },
  close(orderId) {
    return request({
      url: `/api/order/alipay/close/${orderId}`,
      method: 'get'
    })
  }
}
