export interface UserLogin {
  Name: string;
  Password: string;
  RecaptchaToken?: string;
}

export interface SendToken {
  email: string;
  token: string;
}

export interface RecoveryPassword {
  password: string;
  confirmPassword: string;
}

export interface ConfirmPassword {
  email: string;
  newPassword: string;
  token: string;
}
