import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { user_email: email, user_pass: password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        console.log("GİRİŞ BAŞARILI");
        navigate("/Barkodsorgulaekran");
      } else {
        setAuth(false);
        console.error(parseRes.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center vh-100 align-items-center">
        <div className="col-md-6">
          <h1 className="text-center">GİRİŞ</h1>
          <form onSubmit={onSubmitForm}>
            <div className="mb-3">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              GÖNDER
            </button>
            <Link to="/register" className="btn btn-dark btn-block">
              KAYIT OL
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
