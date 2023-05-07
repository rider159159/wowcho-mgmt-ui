export interface profile_interface {
  account: string,
  name: string,
  username:string ,
  email: string,
  image:string | null ,
  isAllowedNotifications: boolean,
  isSubscribed: boolean,
  customerUrl: string
  gender: number,
  birthday: number | null,
  address: string | null,
  website: string | null
  facebook: string | null,
  instagram: string | null,
  youtube: string | null
}