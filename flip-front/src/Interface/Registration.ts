export interface RegPhase1Res {
    Name: string,
    Phone: string,
    DateOfBirth: Date
}

export interface RegPhase2Res {
    UserImage: any,
    UserName: string,
    Email: string,
    Password: string,
    ConfirmPassword: string
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