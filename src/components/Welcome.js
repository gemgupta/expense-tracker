import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "./Store/Auth-Context";
import { useContext } from "react";
function Welcome() {
  const Authctx = useContext(AuthContext);
  const token = Authctx.Token;
  const verifyUserHandler = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCybdrpqrvY0IcG00qrSUGktX-0TbtpEok`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <h1 className=" block text-xl">Welcome to expense tracker</h1>
      <div className="flex justify-end p-3">
        Your profile is incomplete{" "}
        <Link className="underline text-blue-600" to="/Details">
          Click here to complete
        </Link>{" "}
      </div>
      <h2 className="underline text-blue-600" onClick={verifyUserHandler}> Verify your email</h2>
    </div>
  );
}

export default Welcome;
