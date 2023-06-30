export interface IUserInfo {
  account: string // 帳號
  name: string // 真實姓名
  username: string // 用戶名稱
  email: string // 信箱
  image?: string // 用戶圖片網址
  isAllowedNotifications: boolean // 允許通知
  isSubscribed: boolean // 訂閱電子報
  customizedUrl: string // 客製化網址
  gender: number // 性別
  birthday?: number|null, // 生日
  address?: string // 地址
  website?: string // 個人網站
  facebook?: string // FB 網址
  instagram?: string // IG 網址
  youtube?: string // YT 網址
  tokenList?: Array<string> // 驗證
  memberRole?: string, //是否是第三方資料
  oauthId: string//第三方驗證資料關聯
  businessName: string,
  businessEmail: string,
  businessIntro: string,
  businessImage: string
}
