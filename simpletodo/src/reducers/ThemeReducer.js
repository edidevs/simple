import { TOGGLE_DARK_MODE, TOGGLE_THEME_COLOR, SAVE_THEME_INFO } from "../actions/types";

const INITIAL_STATE = {
    darkMode: false,
    theme: 'red'
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return { ...state, darkMode: action.payload };
        case TOGGLE_THEME_COLOR:
            return { ...state, theme: action.payload };
        case SAVE_THEME_INFO:
            return { ...state, theme: action.theme, darkMode: action.darkMode };
        default:
            return state;
    };
}