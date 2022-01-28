export interface IUser{
    _id: string
    username: string
    email: string
    isAdmin: boolean
    fullname: string
    phone: string
    gender: string
    birthdate: string
    createdAt: Date
    updatedAt: Date
}

export interface LoginData {
    email: string
    password: string
}
export interface UpdateDate {
    _id: string
    email: string
    username: string
    fullname: string
    phone: string
  }