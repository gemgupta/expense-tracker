import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/expense-slice";
function PremiumButton() {
  const data = useSelector((state) => state.expense.expenseData);
  const dispatch = useDispatch();
  const totalAmount = data.reduce(
    (total, expesnse) => total + Number(expesnse.number),
    0
  );
  dispatch(expenseActions.showpremiumButton(totalAmount));
  const premium = useSelector((state) => state.expense.showButton);
  console.log(premium);
  return ( premium &&
    <button className="border w-1/2 block m-auto p-5  bg-red-600 text-white rounded-lg ">
      Buy Premium
    </button>
  );
}

export default PremiumButton;
