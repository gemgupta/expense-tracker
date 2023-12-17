import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/expense-slice";
import DownloadFile from "./DownloadFile";
function DarkThemeToggle() {
  const theme = useSelector((state) => state.expense.premiumActivated);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.expense.darkTheme);
  return (
    theme && (<>
      <label className="fixed end-0 inline-flex items-center me-5 cursor-pointer mt-1 ">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={(e) =>
            dispatch(expenseActions.themeReducer(e.target.checked))
          }
        />
        <div
          className="w-11 h-6 bg-blue-700 rounded-full peer peer-focus:ring-4  dark:bg-blue-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"
          style={{ backgroundColor: dark ? "blue" : "black" }}
        ></div>
        <span
          className="ms-3 text-sm font-medium "
          style={{ color: dark ? "white" : "black" }}
        >
          {dark ? "Disable" : "Enable"} Dark Mode
        </span>
      </label>
      <DownloadFile/>
      </>
    )
  );
}

export default DarkThemeToggle;
