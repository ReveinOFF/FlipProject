export interface IUser {
    id: string
    userImage: string
    name: string
    userName: string
    description: string
    dateOfBirth: Date
    isVerified: boolean
    isPrivateUser: boolean

    followers: number
    followings: number
    createdPostCount: number

    // createdPost: any
}