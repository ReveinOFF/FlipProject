export interface UserLogin {
  Name: string;
  Password: string;
  RecaptchaToken?: string;
}

export interface SendToken {
  email: string;
  token: string;
}
