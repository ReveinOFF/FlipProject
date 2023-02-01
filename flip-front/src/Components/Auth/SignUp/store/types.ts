export interface RegMain {
    name: string,
    phone: string,
    dateBirth: Date,
    file: Blob,
    userName: string,
    email: string,
    password: string
}

export enum SelectPhase {
    phaseOne,
    phaseTwo,
    confrim
}

export interface RegState {
    phase: SelectPhase,
    data?: RegMain
}