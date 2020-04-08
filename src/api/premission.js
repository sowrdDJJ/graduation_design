import request from '@/utils/request'

export function verificationToken () {
  return request({
    url: '/getverificationToken',
    method: 'get'
  })
}
