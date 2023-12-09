import "./App.css";
import AuthContext from "./components/Store/Auth-Context";
import Signup from "./components/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Details from "./components/details/Details";
import { useContext } from "react";
import Welcome from "./components/Welcome";
import ForgotPass from "./components/Login/ForgotPass";
function App() {
  const AuthCtx = useContext(AuthContext);
  return (
    <>
      <Routes>
        {AuthCtx.isLoggedIn && <Route exact path="/welcome" element={<Welcome />} />}
        {!AuthCtx.isLoggedIn && (
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
