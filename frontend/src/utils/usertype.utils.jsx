export const getUsertype = () => {
  return localStorage.getItem('usertype')
}
export const setUsertype = (usertype) => {
  localStorage.setItem('usertype', usertype)
}
export const setToken = (token) => {
  localStorage.setItem('token', token)
}
export const getToken = () => {
  return localStorage.getItem('token')
}