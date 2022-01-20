export interface IUser{
    username: string
    email: string
}

export type LoginData = {
    email: string
    password: string
}
 
export interface RegisterData extends LoginData {
    username: string; 
 }
 