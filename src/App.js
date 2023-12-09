import "./App.css";
// import AuthContext from "./components/Store/Auth-Context";
import Signup from "./components/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Details from "./components/details/Details";
// import { useContext } from "react";
import Welcome from "./components/Welcome";
import ForgotPass from "./components/Login/ForgotPass";
import { useSelector } from "react-redux";
function App() {
  // const AuthCtx = useContext(AuthContext);
  const isAuth= useSelector((state)=> state.isAuthenticated)
  return (
    <>
      <Routes>
        {isAuth && <Route exact path="/welcome" element={<Welcome />} />}
        {!isAuth && (
          <Route
            exact
            path="/"
            element={
              <div className="App">
                <Signup />
              </div>
            }
          />
        )}
        <Route exact path="/Details" element={<Details/>}/>
        <Route exact path="/Forgot-Password" element={<ForgotPass/>}/>
      </Routes>
    </>
  );
}

export default App;
