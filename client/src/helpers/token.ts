export const getToken = () => {
  let token
  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user') as string).accessToken
    return `bearer ${token}`
  } else {
    token = ''
    return token
  }
 
}
