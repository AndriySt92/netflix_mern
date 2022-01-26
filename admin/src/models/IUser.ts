export interface IUser{
    _id: string
    username: string
    email: string
    isAdmin: boolean
}

export interface LoginData {
    email: string
    password: string
}