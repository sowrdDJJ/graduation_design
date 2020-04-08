import { verificationToken } from '@/api/premission'

export function verification () {
  return new Promise((resolve, reject) => {
    verificationToken().then(result => {
      const {data} = result
      if (data) {
        resolve(true)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false)
      }
    })
  })
}
