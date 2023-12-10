import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseData: [],
  showButton: false,
};
export const expenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    getExpense: (state, action) => {
      state.expenseData = [...action.payload];
    },
    showpremiumButton: (state, action) => {
        
      if (action.payload > 10000) {
        state.showButton = true;
      } else {
        state.showButton = false;
      }
    },
  },
});

export default expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
