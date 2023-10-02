import React from "react";
import { useState } from "react";
import AuthContext from "./Auth-Context";

import { useNavigate } from "react-router";
function AuthProvider(props) {
  const localToken = localStorage.getItem("token");
  const localEmail = localStorage.getItem("email");

  const [Token, setToken] = useState(localToken);
  const [userEmail, setUserEmail] = useState(localEmail);
  const navigate = useNavigate();

  const userIsLoggedIn = !!Token;

  const LoginHandler = (Token, email) => {
    setToken(Token);
    localStorage.setItem("token", Token);
    localStorage.setItem("email", userEmail);

    setUserEmail(email);
  };
  const LogoutHandler = () => {
    setToken(null);
    navigate("/Login");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };
  const AuthContext1 = {
    Token: Token,
    Login: LoginHandler,
    Logout: LogoutHandler,
    isLoggedIn: userIsLoggedIn,
    email: userEmail,
  };
  return (
    <AuthContext.Provider value={AuthContext1}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;