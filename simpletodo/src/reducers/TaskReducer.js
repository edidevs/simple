import {
    ADD_TASK,
    MARK_DONE,
    UNDO_DONE,
    DELETE_TASK,
    CLEAR_COMPLETED,
    REFRESH_TASKS,
    EDIT_TASK
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    taskArray: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TASK:
            const array = [action.payload, ...state.taskArray];
            
            return { ...state, taskArray: array };

        case EDIT_TASK:
            const editedTaskArray = state.taskArray.map(task => {
                return task.description === action.oldTask.description ? action.payload : task;
            });
            return { ...state, taskArray: editedTaskArray };

        case MARK_DONE:
            let filteredTasks = state.taskArray.filter(task => task.description !== action.payload.description);
            filteredTasks.push({
                description: action.payload.description,
                day: action.payload.day,
                completed: true
            });
            return { ...state, taskArray: filteredTasks };

        case UNDO_DONE:
            let filteredUndoTasks = state.taskArray.filter(task => task.description !== action.payload.description);
            filteredUndoTasks.unshift({
                description: action.payload.description,
                day: action.payload.day,
                completed: false
            });
            return { ...state, taskArray: filteredUndoTasks };

        case DELETE_TASK:
            const newArray = state.taskArray.filter(task => task.description !== action.payload.description);
            return { ...state, taskArray: newArray };

        case CLEAR_COMPLETED:
            const unfinishedTask = state.taskArray.filter(task => task.completed === false);
            return { ...state, taskArray: unfinishedTask };

        case REFRESH_TASKS:
            return { ...state, taskArray: action.payload };

        default:
            return state;
    }
};