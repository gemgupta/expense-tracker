import React from "react";
import { useState, useEffect } from "react";

function Expense() {
  const [number, setnumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItenms] = useState([]);

  const expenseSubmitHandler = async (e) => {
    e.preventDefault();

    setCategory("");
    setDescription("");
    setnumber("");
    const item = {
      key: Math.random(),
      number: number,
      description: description,
      category: category,
    };
    try {
      const response = await fetch(
        "https://expense-tracker-35a83-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "Application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong. POST DATA NOT SUCCESSFUL");
      } else {
        const data = await response.json();
        console.log(data);
        setItenms([...items, item]);
      }
    } catch (error) {
      alert(error.messages);
    }
    // console.log(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-35a83-default-rtdb.firebaseio.com/expense.json",
          {
            method: "GET",

            headers: { "Content-Type": "Application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong. POST DATA NOT SUCCESSFUL");
        } else {
          const data = await response.json();

          setItenms(Object.values(data));
        }
      } catch (error) {
        alert(error.messages);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" bg-black h-screen">
      <h2 className=" w-1/2 text-center font-bold m-auto p-5 text-white">
        Start adding your expenses
      </h2>
      <form
        onSubmit={expenseSubmitHandler}
        className=" block border  shadow-md shadow-white bg-slate-300 w-1/2 rounded-lg m-auto p-5"
      >
        <div className="block">
          <label className="rounded m-1 p-1 font-bold" htmlFor="amount">
            amount
          </label>
          <input
            type="number"
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
              if(e.target.value==='food' || e.target.value==='Movie' || e.target.value==='transport' )
              setCategory(e.target.value);
            else{
              alert('select a category')
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
      <ul className=" border shadow-sm shadow-white  mt-5 bg-slate-500 w-1/2 rounded-lg m-auto p-5 text-center">
        {Object.keys(items).map((key) => {
          const item = items[key];
          return (
            <li
              key={key} // You should use a unique key for each list item.
              className="border mt-1 bg-slate-300 w-auto rounded-lg m-auto p-5 text-center"
            >
              {item.number} ruppes is spent on {item.description}. Category is{" "}
              {item.category}.
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Expense;
