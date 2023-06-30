import { type IUserInfo } from './interface'

export const UserInfo: IUserInfo = {
  account: '',
  name: '',
  username: '',
  gender: 0,
  email: '',
  image: '',
  address: '',
  birthday: null,
  customizedUrl: '',
  isSubscribed: true,
  isAllowedNotifications: true,
  website: '', // 個人網站,
  youtube: '', // YT 網址
  instagram: '',
  facebook: '',
  memberRole: '', //是否是第三方資料
  oauthId: '', // 使用 oauthId 關聯另一個資料表。
  businessName: '',
  businessEmail: '',
  businessIntro: '',
  businessImage: ''
}
