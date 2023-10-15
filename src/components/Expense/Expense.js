import React from "react";
import { useState } from "react";

function Expense() {
  const [number, setnumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItenms] = useState([]);

  const expenseSubmitHandler = (e) => {
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
    console.log(item);
    setItenms((prev) => [...prev, item]);
  };
  return (
    <>
      <h2 className=" w-1/2 text-center font-bold m-auto p-5">
        Add Your Expense
      </h2>
      <form
        onSubmit={expenseSubmitHandler}
        className="flex border border-red-400 bg-slate-300 w-full m-auto p-5 justify-center"
      >
        <div className="m-3">
          <label className="rounded m-1 p-1 font-bold" htmlFor="amount">
            amount
          </label>
          <input
            type="number"
            placeholder="enter amount"
            onChange={(e) => {
              setnumber(e.target.value);
            }}
            className="rounded m-1 p-1"
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
            placeholder="Select Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="rounded m-1 p-1"
            value={category}
            required
          >
            <option>select</option>
            <option value="movie">movie</option>
            <option value="food">food</option>
            <option value="transport">transport</option>
          </select>
        </div>
        <button
          className="border p-1 m-2 w-28 bg-red-600 text-white rounded-lg"
          type="submit"
        >
          Add
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            {item.number} ruppes is spent on {item.description} Category is{" "}
            {item.category}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Expense;
