export interface AddMessage {
  messageBoxId: string;
  message?: string;
  files?: any[];
}

export interface GetMessage {
  id: string;
  messageText: string;
  dateSender: string;
  isEdited: boolean;
  userId: string;
  files: string[];
}
