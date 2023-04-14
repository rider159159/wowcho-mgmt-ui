import Cookies from 'js-cookie';

const TokenKey = 'wowcho';

export function GET_TOKEN() {
  return Cookies.get(TokenKey);
}

const inFifteenMinutes = new Date(new Date().getTime() + 480 * 60 * 1000);
export function SET_TOKEN(token:any) {
  return Cookies.set(TokenKey, token, {
    expires: inFifteenMinutes,
  });
}

export function REMOVE_TOKEN() {
  return Cookies.remove(TokenKey);
}
