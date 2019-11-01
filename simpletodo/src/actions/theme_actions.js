import { TOGGLE_DARK_MODE, TOGGLE_THEME_COLOR, SAVE_THEME_INFO } from './types';
import AsyncStorage from '@react-native-community/async-storage';

export const toggleDarkMode = (value) => async dispatch => {
    let stringValue = String(value);
    await AsyncStorage.setItem('dark', stringValue);
    dispatch({
        type: TOGGLE_DARK_MODE,
        payload: value
    });
};

export const toggleThemeColor = (value) => async dispatch => {
    await AsyncStorage.setItem('theme', value);
    dispatch({
        type: TOGGLE_THEME_COLOR,
        payload: value
    });
};

export const saveThemeInfo = () => async dispatch => {
    let theme = await AsyncStorage.getItem('theme');
    let darkMode = await AsyncStorage.getItem('dark');
    darkMode = darkMode === 'true' ? true : false;
    dispatch({
        type: SAVE_THEME_INFO,
        theme, darkMode
    });
};