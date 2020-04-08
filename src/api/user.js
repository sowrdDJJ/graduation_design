import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/getUserInformation',
    method: 'post',
    data
  })
}

export function emitUserData (data) {
  return request({
    url: '/postChangePirvateInformation',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/getUserInformation',
    method: 'get'
  })
}

export function getUserCommodityInfo (token, url) {
  return request({
    url,
    method: 'get'
  })
}

export function postUserCommodityInfo (token, data, url) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function postUserOrderInfo (token, url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function getUserOrderInfo (token, url, params) {
  // console.log(params)
  return request({
    url,
    method: 'get',
    params
  })
}
