import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseData: [],
  showButton: false,
  premiumActivated: false,
  darkTheme: false,
};
export const expenseSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    getExpense: (state, action) => {
      state.expenseData = [...action.payload];
    },
    showpremiumButton: (state, action) => {
      if (action.payload > 10000 && state.premiumActivated === false) {
        state.showButton = true;
      } else {
        state.showButton = false;
      }
    },
    premiumActivate: (state) => {
      state.premiumActivated = true;
      state.showButton = false;
    },
    themeReducer: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export default expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
