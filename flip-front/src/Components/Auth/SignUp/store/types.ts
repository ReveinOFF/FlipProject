export interface RegMain {
    Name: string,
    Phone: string,
    DateOfBirth: Date,
    UserName: string,
    UserImage: any,
    Email: string,
    Password: string,
    RecaptchaToken: string
}

export enum SelectPhase {
    phaseOne,
    phaseTwo,
    confrim
}

export interface RegState {
    phase: SelectPhase,
    data?: RegMain,
    succses: boolean
}