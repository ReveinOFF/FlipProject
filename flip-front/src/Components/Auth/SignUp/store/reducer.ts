import { RegState, SelectPhase } from "./types";

interface Action {
    type: string,
    payload?: any
}

const initialState: RegState = {
    phase: SelectPhase.phaseOne,
    succses: false
}

export type RegAction = Action;

export const regReducer = (state = initialState, action: Action) : RegState => {
    switch (action.type) {
        case "REG":
            return {
                ...state,
                data: {...state.data, ...action.payload.data},
                succses: action.payload.succses
            }
        case "REG-PHASE": 
            return {
                ...state,
                phase: action.payload.phase
            }
        default:
            return state
    }
}