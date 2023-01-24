export enum AuthActionTypes {
    LOGIN = "AUTH/LOGIN",
    LOGOUT = "AUTH/LOGOUT"
}

export interface IUser {
    id: string
    userImage: string
    name: string
    description: string
    dateOfBirth: Date
    isVerified: boolean
    isPrivateUser: boolean

    followers: number
    followings: number
    createdPostCount: number

    createdPost: string[]
}

export interface AuthState {
    user?: IUser,
    token?: string,
    isAuth: boolean
}