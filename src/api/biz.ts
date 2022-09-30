import http from './http'

export const getDemoData = (postData: any) => {
  return http.post('/api/demo', postData)
}
