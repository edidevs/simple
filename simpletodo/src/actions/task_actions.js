import {
    ADD_TASK,
    MARK_DONE,
    UNDO_DONE,
    DELETE_TASK,
    CLEAR_COMPLETED,
    REFRESH_TASKS,
    EDIT_TASK
} from './types';
import AsyncStorage from '@react-native-community/async-storage';

export const addTasks = (task, day, callback) => async dispatch => {
    let collection = {};
    collection.description = task;
    if (day === 'Today') {
        const today = new Date();
        collection.day = today.toLocaleDateString();
    } else {
        collection.day = day;
    }
    collection.completed = false;
    dispatch({
        type: ADD_TASK,
        payload: collection
    });
    callback();
};

export const editTask = (task, day, oldTask, callback) => async dispatch => {
    let collection = {};
    collection.description = task;
    if (day === 'Today') {
        const today = new Date();
        collection.day = today.toLocaleDateString();
    } else {
        collection.day = day;
    }
    collection.completed = false;
    console.log(collection)
    dispatch({
        type: EDIT_TASK,
        payload: collection,
        oldTask
    });
    callback();
};

export const refreshTasks = (taskArray) => {
    return {
        type: REFRESH_TASKS,
        payload: taskArray
    }
}

export const markDone = (task) => {
    return {
        type: MARK_DONE,
        payload: task
    };
};

export const undoDone = (task) => {
    return {
        type: UNDO_DONE,
        payload: task
    };
};

export const deleteTask = (task) => {
    return {
        type: DELETE_TASK,
        payload: task
    };
};

export const clearCompleted = () => async dispatch => {
    dispatch({
        type: CLEAR_COMPLETED,
    });
};

export const getTasksFromStorage = () => async dispatch => {
    
    // let arrayObject = await AsyncStorage.getItem('tasks');
    // if (arrayObject) {
    //     dispatch({
    //         type: REFRESH_TASKS,
    //         payload: JSON.parse(arrayObject)
    //     });

    // }
}