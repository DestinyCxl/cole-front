import request from '~/utils/request'

export default {
  createNative(orderNo) {
    return request({
      // baseURL: 'http://localhost:8983',
      url: `/api/trade/weixin-pay/create-native/${orderNo}`,
      method: 'get'
    })
  }
}
