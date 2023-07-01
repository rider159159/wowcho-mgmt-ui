import Cookies from 'js-cookie'

const TokenKey = 'wowcho-mgmt'

export function GET_TOKEN () {
  return Cookies.get(TokenKey)
}

// cookie 保存 7 天
const inSevenDays = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
export function SET_TOKEN(token:any) {
  return Cookies.set(TokenKey, token, {
    expires: inSevenDays
  })
}

export function REMOVE_TOKEN () {
  Cookies.remove(TokenKey)
}
