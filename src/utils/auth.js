
export function getToken() {
  return window.localStorage.getItem('speedy_view_token')
}

export function setToken(token) {
  window.localStorage.setItem('speedy_view_token', token)
}

export function removeToken() {
  window.localStorage.removeItem('speedy_view_token')
}
