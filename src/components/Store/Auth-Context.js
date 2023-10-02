import React from "react";
const AuthContext = React.createContext({
  Token: "",
  isLoggedIn: false,
  Login: (Token, email) => {},
  Logout: () => {},
  email: "",
});

export default AuthContext;