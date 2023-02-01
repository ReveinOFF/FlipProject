import { RegState, SelectPhase } from "./types";

interface Action {
    type: string,
    payload?: any
}

const initialState: RegState = {
    phase: SelectPhase.phaseOne
}

export type RegAction = Action;

export const regReducer = (state = initialState, action: Action) : RegState => {
    switch (action.type) {
        case "REG":
            return {
                ...state,
                phase: action.payload.phase,
                data: {...action.payload.data}
            }
        default:
            return state
    }
}