import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className=""> 
      <h1 className=" block text-xl">Welcome to expense tracker</h1>
      <div  className="flex justify-end p-3">
        Your profile is incomplete{" "}
        <Link className="underline text-blue-600" to="/Details">
          Click here to complete
        </Link>{" "}
      </div>
    </div>
  );
}

export default Welcome;
