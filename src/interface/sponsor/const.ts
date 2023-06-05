import { type ISponsor } from './interface'
import { UserInfo,plan,proposal } from '@/interface'

export const Sponsor: ISponsor = {
  id: '',
  // 藍薪金流所需欄位
  ItemDesc: '',  //商品品名
  Amt: 0,  //訂單金額
  Email: '',  //付款人信箱 （非收件人
  TimeStamp: 0,    //時間戳記
  MerchantOrderNo: '',  //商店訂單編號
  // EncryptType: boolean   //加密模式 AES256方式加密參帶0, AES GCM方式加密帶1
  CVSCOM: 0,   //物流啟用 店到店物流啟用 1 = 啟用超商取貨不付款 2 = 啟用超商取貨付款 3 = 啟用超商取貨不付款及超商取貨付款 0 或者未有此參數，即代表不開啟
  CREDIT: 0,  //信用卡一次付清啟用 1=啟用 0=不啟用
  TradeSha: '',  //SHA256加密 給藍新必填欄位 參數名不可變動
  TradeInfo: '',  //AES加密 給藍新必填欄位 參數名不可變動
  MerchantID: '',  //商店代號 給藍新必填欄位 參數名不可變動
  Version: '',  //版本號 給藍新必填欄位 參數名不可變動
  RespondType: '', // 回傳格式，字串 or JSON
  // 藍新交易成功後新增回傳
  //============交易成功基本參數============
  IP: '',  //付款人交易IP
  TradeNo: 0, //藍新金流交易序號
  EscrowBank: '', //款項保管銀行 
  PaymentType: '', //支付方式，信用卡: CREDIT 、 店到店: CVSCOM
  RespondCode: '', //金融機構回應碼

  //============信用卡一次付清 CREDIT ===========
  Auth: '', //收單機構授權碼
  Card6No: '', //卡號前六碼
  Card4No: '', //卡號末四碼
  AuthBank: '', //收單金融機構
  PayTime: '', //支付完成時間 回傳格式為:2014-06-25 16:43:49, 超商取貨以空值回傳
  PaymentMethod: '', //交易類別

  //============物流店到店 CVSCOM ============
  StoreCode: '', //超商取貨門市編號
  StoreType: '', //超商類別名稱
  StoreName: '', //超商取貨門市名稱
  TradeType: '', //取件交易方式
  StoreAddr: '', //取貨人姓名
  CVSCOMName: '', //取貨人姓名
  CVSCOMPhone: '', //取貨人手機號碼
  LgsType: '', //物流型態 'B2C','C2C'
  LgsNo: '', //物流寄件單號(寄件代碼)

  // 渦潮自己資料庫需要欄位，新建時觸發
  buyerId: UserInfo,
  ownerId: UserInfo, // 購買會員 id
  planId: plan,  // 贊助方案 id,
  proposalId : proposal,  // 贊助方案 id,

  payStatus:  true, // 是否付款
  projectTitle: '', // 贊助專案名稱,
  // orderSpecification: ISpecification[] // 會員選擇贊助方案規格
  remark: '', // 備註
  option: [], // 方案規格
  address: '', // 購買人地址
}

export const SponsorList = [
  Sponsor
]
