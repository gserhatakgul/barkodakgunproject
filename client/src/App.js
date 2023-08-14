import React, { Fragment, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Landing from "./components/giris";
import Barkodsorgulaekran from "./components/BarkodSorgula";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/authentication/dogrulama",
        {
          method: "POST",
          headers: { jwt_token: localStorage.token },
        }
      );

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/Barkodsorgulaekran" />
                ) : (
                  <Landing />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/Barkodsorgulaekran" />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/Barkodsorgulaekran" />
                ) : (
                  <Register setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/Barkodsorgulaekran"
              element={
                isAuthenticated ? (
                  <Barkodsorgulaekran setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
