export interface IUserInfo {
  account: string
  name: string | null
  username: string | null// 用戶名稱
  email: string
  image: string | null
  address: string | null
  birthday: null | number | string
  customizedUrl: null | string
  gender: -1 | 0 | 1 | 2 | 3 | 4 // 性別
  isAllowedNotifications: boolean
  isSubscribed: boolean // 訂閱電子報
  createdAt?: string
  updatedAt?: string
  website?: string | null // 個人網站,
  youtube?: string | null // YT 網址
  instagram: null | string
  facebook: null | string
}
