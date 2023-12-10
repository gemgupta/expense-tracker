import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseData: [],
 
};
export const expenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    getExpense: (state, action) => {
      state.expenseData= [...action.payload];
    },

  },
});

export default expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
