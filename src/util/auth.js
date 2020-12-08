
const TokenKey = 'omp-access-token'
const RefreshTokenKey = 'omp-refresh-token'
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return localStorage.setItem(RefreshTokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function removeRefreshToken() {
  return localStorage.removeItem(RefreshTokenKey)
}
