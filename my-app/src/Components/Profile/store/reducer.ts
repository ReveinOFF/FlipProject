import { ProfileActionTypes, ProfileState } from "./types"

interface UserAction {
    type: string,
    payload?: any
}

const initialState: ProfileState = {
    user: null
}

export const profileReducer = (state = initialState, action: UserAction) : ProfileState => {
    switch (action.type) {
        case ProfileActionTypes.USER:
            return {
                ...state,
                user: {...action.payload.user}
            }
        default:
            return state
    }
}