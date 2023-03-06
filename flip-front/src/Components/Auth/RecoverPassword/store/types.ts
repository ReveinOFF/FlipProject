export enum RecPasActionTypes {
  PAGES = "CHANGE/PAGE",
  DATA = "REC/PAGE",
}

export interface RecPasState {
  email?: string;
  page: number;
}
