export enum NotificationType {
  Follow,
  LikeHistory,
  LikeFliper,
  LikePost,
}

export interface GetNotification {
  id: string;
  type: NotificationType;
  dateCreate: Date;
  senderId: string;
  senderName: string;
  senderImage: string;
  isFollowed: boolean;
  likeUrl?: string;
}
