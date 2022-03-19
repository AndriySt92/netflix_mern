export interface IUser{
    _id: string
    username: string
    email: string
    myList: Array<string>
}

export type LoginData = {
    email: string
    password: string
}
 
export interface RegisterData extends LoginData {
    username: string; 
 }
 