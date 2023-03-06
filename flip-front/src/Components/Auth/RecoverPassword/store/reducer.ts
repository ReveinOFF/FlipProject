import { RecPasActionTypes, RecPasState } from "./types";

interface Action {
  type: string;
  payload?: any;
}

const initialState: RecPasState = {
  page: 1,
};

export type RecAction = Action;

export const recPasReducer = (
  state = initialState,
  action: Action
): RecPasState => {
  switch (action.type) {
    case RecPasActionTypes.PAGES:
      return {
        ...state,
        page: 2,
      };
    case RecPasActionTypes.DATA:
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};
