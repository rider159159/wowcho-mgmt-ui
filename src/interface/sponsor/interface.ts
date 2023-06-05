import { IProposal,IPlan, IUserInfo  } from '@/interface'

export interface ISponsor {
  id:string
  // 藍薪金流所需欄位
  ItemDesc: string  //商品品名
  Amt: number  //訂單金額
  Email: string  //付款人信箱 （非收件人
  TimeStamp: number    //時間戳記
  MerchantOrderNo?: string  //商店訂單編號
  // EncryptType: boolean   //加密模式 AES256方式加密參帶0, AES GCM方式加密帶1
  CVSCOM: number   //物流啟用 店到店物流啟用 1 = 啟用超商取貨不付款 2 = 啟用超商取貨付款 3 = 啟用超商取貨不付款及超商取貨付款 0 或者未有此參數，即代表不開啟
  CREDIT: number  //信用卡一次付清啟用 1=啟用 0=不啟用
  TradeSha?: string  //SHA256加密 給藍新必填欄位 參數名不可變動
  TradeInfo?: string  //AES加密 給藍新必填欄位 參數名不可變動
  MerchantID: string  //商店代號 給藍新必填欄位 參數名不可變動
  Version: string  //版本號 給藍新必填欄位 參數名不可變動
  RespondType: string // 回傳格式，字串 or JSON
  // 藍新交易成功後新增回傳
  //============交易成功基本參數============
  IP: string  //付款人交易IP
  TradeNo: number //藍新金流交易序號
  EscrowBank: string //款項保管銀行 
  PaymentType: string //支付方式，信用卡: CREDIT 、 店到店: CVSCOM
  RespondCode: string //金融機構回應碼

  //============信用卡一次付清 CREDIT ===========
  Auth: string //收單機構授權碼
  Card6No: string //卡號前六碼
  Card4No: string //卡號末四碼
  AuthBank: string //收單金融機構
  PayTime: string //支付完成時間 回傳格式為:2014-06-25 16:43:49, 超商取貨以空值回傳
  PaymentMethod: string //交易類別

  //============物流店到店 CVSCOM ============
  StoreCode: string //超商取貨門市編號
  StoreType: string //超商類別名稱
  StoreName: string //超商取貨門市名稱
  TradeType: string //取件交易方式
  StoreAddr: string //取貨人姓名
  CVSCOMName: string //取貨人姓名
  CVSCOMPhone: string //取貨人手機號碼
  LgsType: string //物流型態 'B2C','C2C'
  LgsNo: string //物流寄件單號(寄件代碼)

  // 渦潮自己資料庫需要欄位，新建時觸發
  buyerId: IUserInfo| string
  ownerId: IUserInfo| string // 購買會員 id
  planId: IPlan  // 贊助方案 id,
  proposalId : IProposal  // 贊助方案 id,

  payStatus: boolean, // 是否付款
  projectTitle: string // 贊助專案名稱,
  // orderSpecification: ISpecification[] // 會員選擇贊助方案規格
  remark: string, // 備註
  option: string [] // 方案規格
  address: string, // 購買人地址
  updatedAt:string,
}