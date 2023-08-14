import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_email: email, user_pass: password, user_name: name };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
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
        console.log("");
      } else {
        setAuth(false);
        console.error("");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center vh-100 align-items-center">
        <div className="col-md-6">
          <h1 className="text-center">KAYIT OL</h1>
          <form onSubmit={onSubmitForm}>
            <div className="mb-3">
              <input
                type="text"
                name="email"
                value={email}
                onChange={onChange}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="form-control"
                placeholder="Name"
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              GÖNDER
            </button>
            <Link to="/login" className="btn btn-primary btn-block">
              GİRİŞ
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
