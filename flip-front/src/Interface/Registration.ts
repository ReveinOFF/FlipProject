export interface RegPhase1Res {
    name: string,
    phone: string,
    dateBirth: Date
}

export interface RegPhase2Res {
    file: Blob,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export enum SelectPhase {
    phaseOne,
    phaseTwo,
    confrim
}

export interface PhaseProps {
    onStep: (phase: SelectPhase) => void
}

export interface RegisterModal {
    phase: SelectPhase
}