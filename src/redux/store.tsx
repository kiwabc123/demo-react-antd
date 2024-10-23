import { Middleware } from '@reduxjs/toolkit';

// Middleware to persist state to localStorage
const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('employees', JSON.stringify(state.employee.employees));
    return result;
};

import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
