export enum ProfileActionTypes {
    USER = "PROFILE"
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

export interface ProfileState {
    user?: IUser
}