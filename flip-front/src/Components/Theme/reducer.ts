export interface ThemeAction {
    type: string,
    payload?: any
}

interface ThemeState {
    mode?: string
}

const initialState: ThemeState = {
    mode: "light"
}

export const themeReducer = (state = initialState, action: ThemeAction) : ThemeState => {
    switch (action.type) {
        case "Theme":
            return {
                ...state,
                mode: action.payload.mode
            }
        default: 
            return state
    }
}