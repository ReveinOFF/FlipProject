export interface IUser {
  id: string;
  userImage: string;
  name: string;
  userName: string;
  description: string;
  dateOfBirth: Date;
  isVerified: boolean;
  isPrivateUser: boolean;

  followers: number;
  followings: number;

  createdPost: CreatedPost[];
}

export interface GetUsers {
  id: string;
  userImage: string;
  name: string;
  userName: string;
  isVerified: boolean;
}

export interface CreatedPost {
  id: string;
  file: string;
}

export interface FollowUser {
  UserId?: string;
  FollowId?: string;
}
