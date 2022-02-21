import request from '@/utils/request'

const api_name = `/api/order/orderInfo`

export default {
  saveOrders(scheduleId, patientId) {
    return request({
      url: `${api_name}/auth/submitOrder/${scheduleId}/${patientId}`,
      method: `post`
    })
  },
  getOrders(orderId) {
    return request({
      url: `${api_name}/auth/getOrders/${orderId}`,
      method: `get`
    })
  },
  
}
