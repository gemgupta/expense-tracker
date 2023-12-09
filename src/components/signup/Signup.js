import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../Store/Auth-Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [isSignup, setIsSignUP] = useState(true);
  const Authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const signupHAndler = () => {
    setIsSignUP((prevstate) => !prevstate);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isSignup) {
      if (password === confirmpass) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGVMeLpfWsIIKfXWR4st1g3Msv03WDBoc",
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error.message);
          } else {
            console.log("user has successfully signed up");
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert("password do not match");
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGVMeLpfWsIIKfXWR4st1g3Msv03WDBoc",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error.message);
        } else {
          const tokenData = await response.json();
          Authctx.Login(tokenData.idToken, tokenData.email);
          console.log("Login success");
          navigate("/welcome");
        }
      } catch (error) {
        alert(error);
      }
    }

    setemail("");
    setpassword("");
    setconfirmpass("");
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://www.giantbomb.com/a/uploads/scale_medium/0/118/544727-umbrellacorporation3.png"
          alt="Your Company"
        />
        {isSignup ? (
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
        ) : (
          <>
            {" "}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              New Here?
            </h2>
            <p>Sign up and start your journey</p>
          </>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandler} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
              />
            </div>
          </div>
          {!isSignup && (
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setconfirmpass(e.target.value)}
                  value={confirmpass}
                  placeholder="Re-enter your password"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
            {isSignup && (
              <Link className=" text-blue-600 " to="/Forgot-Password">
                Forgot Password?
              </Link>
            )}
            <p className="p-2" onClick={signupHAndler}>
              {isSignup
                ? "Do not have an account? click to Sign up"
                : "Already have an account! sign in"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
