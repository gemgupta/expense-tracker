import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import expenseReducer from './expense-slice'
export const store= configureStore({reducer: {auth:authReducer, expense: expenseReducer}})