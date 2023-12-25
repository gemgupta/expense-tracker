import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PremiumButton from "./PremiumButton";
import { expenseActions } from "../Store/expense-slice";
import DarkThemeToggle from "./DarkThemeToggle";

function Expense() {
  const [number, setnumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editedNumber, seteditedNumber] = useState("");
  const [editeddescription, setediteddescription] = useState("");
  const [editedcategory, seteditedcategory] = useState("");
  const [editItemKey, setEditItemKey] = useState(null);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.expense.darkTheme);
  const data = useSelector((state) => state.expense.expenseData);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userModifiedEmail = email.replace(/[.@]/g, "");
      const response = await fetch(
        `https://expensetracker-69a6d-default-rtdb.firebaseio.com/${userModifiedEmail}.json`,
        {
          method: "GET",

          headers: { "Content-Type": "Application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong. GET DATA NOT SUCCESSFUL");
      } else {
        const data = await response.json();

        console.log(typeof data);
        const expenses = Object.keys(data).map((key) => ({
          id: key, // Store the Firebase key as 'id'
          ...data[key],
        }));
        dispatch(expenseActions.getExpense(expenses));
        console.log(data);
      }
    } catch (error) {
      alert(error.messages);
    }
  };

  const expenseSubmitHandler = async (e) => {
    e.preventDefault();

    setCategory("");
    setDescription("");
    setnumber("");
    const item = {
      number: number,
      description: description,
      category: category,
    };
    try {
      const userModifiedEmail = email.replace(/[.@]/g, "");
      const response = await fetch(
        `https://expensetracker-69a6d-default-rtdb.firebaseio.com/${userModifiedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "Application/json" },
        }
      );
      console.log("djs", response);
      if (!response.ok) {
        throw new Error("Something went wrong. POST DATA NOT SUCCESSFUL");
      } else {
        const data1 = await response.json();
        console.log(data1);
        fetchData();
      }
    } catch (error) {
      alert(error.messages);
    }
  };

  const deleteExpenseHandler = async (key) => {
    const userModifiedEmail = email.replace(/[.@]/g, "");
    try {
      const response = await fetch(
        `https://expensetracker-69a6d-default-rtdb.firebaseio.com/${userModifiedEmail}/${key}.json`,
        {
          method: "DELETE",

          headers: { "Content-Type": "Application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong. DELETE DATA NOT SUCCESSFUL");
      } else {
        const updatedItems = data.filter((item) => item.id !== key);
        dispatch(expenseActions.getExpense(updatedItems));
        console.log(updatedItems);
        fetchData();
      }
    } catch (error) {
      alert(error.messages);
    }
  };
  const editExpenseHandler = async (key) => {
    setModal(true);
    const userModifiedEmail = email.replace(/[.@]/g, "");
    try {
      const response = await fetch(
        `https://expensetracker-69a6d-default-rtdb.firebaseio.com/${userModifiedEmail}/${key}.json`,
        {
          method: "GET",

          headers: { "Content-Type": "Application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong. GET DATA NOT SUCCESSFUL");
      } else {
        const data = await response.json();
        seteditedNumber(data.number);
        setediteddescription(data.description);
        seteditedcategory(data.category);
        setEditItemKey(key);
      }
    } catch (error) {
      alert(error.messages);
    }
  };

  const putRequestHandler = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      number: editedNumber,
      description: editeddescription,
      category: editedcategory,
    };
    try {
      const userModifiedEmail = email.replace(/[.@]/g, "");
      const response = await fetch(
        `https://expensetracker-69a6d-default-rtdb.firebaseio.com/${userModifiedEmail}/${editItemKey}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedExpense),
          headers: { "Content-Type": "Application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong. POST DATA NOT SUCCESSFUL");
      } else {
        const updatedItems = data.map((item) =>
          item.id === editItemKey ? { ...item, ...updatedExpense } : item
        );
        dispatch(expenseActions.getExpense(updatedItems));
        setModal(false);
        setEditItemKey(null);
        seteditedcategory("");
        setediteddescription("");
        seteditedNumber("");
        fetchData();
      }
    } catch (error) {
      alert(error.messages);
    }
  };
  return (
    <div
      className=" bg-stone-200 h-screen"
      style={{ backgroundColor: dark ? "#3b3c36" : "#f3f3f3" }}
    >
      <DarkThemeToggle />
      {!modal ? (
        <h2
          className=" w-1/2 text-center font-bold m-auto p-5 text-black"
          style={{ color: dark ? "white" : "black" }}
        >
          Start adding your expenses
        </h2>
      ) : (
        <h2 className=" w-1/2 text-center font-bold m-auto p-5 text-black">
          Edit Your Expense
        </h2>
      )}
      {!modal && (
        <form
          onSubmit={expenseSubmitHandler}
          className=" block border  shadow-md shadow-white bg-slate-500 w-1/2 rounded-lg m-auto p-5"
        >
          <div className="block">
            <label className="rounded m-1 p-1 font-bold" htmlFor="amount">
              amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="enter amount"
              onChange={(e) => {
                setnumber(e.target.value);
              }}
              className="rounded m-1 p-1 w-36"
              value={number}
              required
            />
            <label className="rounded m-1 p-1 font-bold" htmlFor="description">
              description
            </label>
            <input
              type="text"
              id="description"
              placeholder="enter description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="rounded m-1 p-1 "
              required
            />
            <label className="rounded m-1 p-1 font-bold" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => {
                if (
                  e.target.value === "food" ||
                  e.target.value === "Movie" ||
                  e.target.value === "transport"
                )
                  setCategory(e.target.value);
                else {
                  alert("select a category");
                }
              }}
              className="rounded m-1 p-1"
              required
            >
              <option value="select">Select</option>
              <option value="food">food</option>
              <option value="Movie">Movie</option>
              <option value="transport">transport</option>
            </select>
          </div>
          <button
            className="border p-2 mt-2 m-auto block w-28 bg-red-600 text-white rounded-lg "
            type="submit"
          >
            Add
          </button>
        </form>
      )}
      <PremiumButton />
      {modal && (
        <form
          onSubmit={putRequestHandler}
          className=" block border  shadow-md shadow-white bg-slate-300 w-1/2 rounded-lg m-auto p-5"
        >
          <div className="block">
            <label className="rounded m-1 p-1 font-bold" htmlFor="amount">
              amount
            </label>
            <input
              name="amount"
              type="number"
              placeholder="enter amount"
              onChange={(e) => {
                seteditedNumber(e.target.value);
              }}
              className="rounded m-1 p-1 w-36"
              value={editedNumber}
              required
            />
            <label className="rounded m-1 p-1 font-bold" htmlFor="description">
              description
            </label>
            <input
              type="text"
              id="description"
              placeholder="enter description"
              onChange={(e) => {
                setediteddescription(e.target.value);
              }}
              value={editeddescription}
              className="rounded m-1 p-1 "
              required
            />
            <label className="rounded m-1 p-1 font-bold" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={editedcategory}
              onChange={(e) => {
                if (
                  e.target.value === "food" ||
                  e.target.value === "Movie" ||
                  e.target.value === "transport"
                )
                  seteditedcategory(e.target.value);
                else {
                  alert("select a category");
                }
              }}
              className="rounded m-1 p-1"
              required
            >
              <option value="select">Select</option>
              <option value="food">food</option>
              <option value="Movie">Movie</option>
              <option value="transport">transport</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              className="border p-2 mt-2 mr-2  w-34 bg-red-600 text-white rounded-lg "
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="border p-2 mt-2   w-28 bg-red-600 text-white rounded-lg "
              onClick={() => {
                setModal(false);
                setEditItemKey(null);
                seteditedcategory("");
                setediteddescription("");
                seteditedNumber("");
              }}
            >
              Back
            </button>
          </div>
        </form>
      )}
      {!modal && (
        <ul className=" border shadow-sm shadow-white  mt-5 bg-slate-500 w-1/2 rounded-lg m-auto p-5 text-center">
          {Object.keys(data).map((key) => {
            const item = data[key];

            return (
              <li
                key={key}
                className="border mt-1 bg-slate-300 w-auto rounded-lg m-auto p-5 text-center"
              >
                {item.number} ruppes is spent on {item.description}. Category is{" "}
                {item.category}
                <button
                  onClick={() => editExpenseHandler(item.id)}
                  className="p-1 border rounded-lg bg-gray-500 text-cyan-50  float-right w-16 m-auto "
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExpenseHandler(item.id)}
                  className="p-1 border rounded-lg bg-red-700 text-cyan-50 m-auto float-right w-16 "
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default Expense;
