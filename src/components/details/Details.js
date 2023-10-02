import React from "react";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../Store/Auth-Context";
import { useNavigate } from "react-router-dom";

function Details() {
  const [name, setname] = useState("");
  const [photourl, setPhotourl] = useState("");

  const Authctx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCybdrpqrvY0IcG00qrSUGktX-0TbtpEok",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: Authctx.Token,
            displayName: name,
            photoUrl: photourl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("profile details updated successfully");
        navigate("/");
      } else {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error.message);
      }
    } catch (error) {
      alert(error);
    }

    setname("");
    setPhotourl("");
  };
  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCybdrpqrvY0IcG00qrSUGktX-0TbtpEok",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: Authctx.Token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setname(data.users[0].displayName);
          setPhotourl(data.users[0].photoUrl);
          console.log(data)
        } else {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error.message);
        }
      } catch (error) {
        alert(error);
      }
    }
    getUserDetails();
  }, []);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://www.giantbomb.com/a/uploads/scale_medium/0/118/544727-umbrellacorporation3.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Your Profile Details
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandler} method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name:
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setname(e.target.value)}
                value={name}
                placeholder="enter your full name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="photourl"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo URL
            </label>
            <div className="mt-2">
              <input
                id="photourl"
                name="photourl"
                type="url"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPhotourl(e.target.value)}
                value={photourl}
                placeholder="Profile Photo URL"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Details;
