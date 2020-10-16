import request from '~/utils/request'
export default {

  sendMessage(mobile) {
    return request({
      // baseURL: 'http://localhost:8984',
      url: `/api/sms/send/${mobile}`,
      method: 'get'
    })
  },

  register(member) {
    return request({
      // baseURL: 'http://localhost:8983',
      url: '/api/ucenter/member/register',
      method: 'post',
      data: member
    })
  }
}
