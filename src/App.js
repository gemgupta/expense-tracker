import "./App.css";
import AuthContext from "./components/Store/Auth-Context";
import Signup from "./components/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Details from "./components/details/Details";
import { useContext } from "react";
import Welcome from "./components/Welcome";
function App() {
  const AuthCtx = useContext(AuthContext);
  return (
    <>
      <Routes>
        {AuthCtx.isLoggedIn && <Route exact path="/" element={<Welcome />} />}
        {!AuthCtx.isLoggedIn && (
          <Route
            exact
            path="/login"
            element={
              <div className="App">
                <Signup />
              </div>
            }
          />
        )}
        <Route exact path="/Details" element={<Details/>}/>
      </Routes>
    </>
  );
}

export default App;
