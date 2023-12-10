import React from "react";
import { Link } from "react-router-dom";
// import AuthContext from "./Store/Auth-Context";
// import { useContext } from "react";
import Expense from "./Expense/Expense";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth-slice";
import { useNavigate } from "react-router-dom";

function Welcome() {
  // const Authctx = useContext(AuthContext);
  // const token = Authctx.Token;
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifyUserHandler = async () => {
    try {
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCGVMeLpfWsIIKfXWR4st1g3Msv03WDBoc`,
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
  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };
  return (
    <>
      <div className=" bg-violet-700 flex p-2 sticky top-0 ">
        <h1 className="text-xl m-auto text-white">Expense Tracker</h1>

        <Link
          className=" m-1 p-2 border rounded-lg bg-red-700 text-cyan-50 "
          to="/Details"
        >
          User Profile
        </Link>
        <button
          onClick={verifyUserHandler}
          className="p-2 border rounded-lg bg-red-700 text-cyan-50 m-1 "
        >
          Email Verification
        </button>
        <button
          onClick={logoutHandler}
          className="p-2 border rounded-lg bg-red-700 text-cyan-50 m-1 "
        >
          Logout
        </button>
      </div>

      <Expense />
    </>
  );
}

export default Welcome;
